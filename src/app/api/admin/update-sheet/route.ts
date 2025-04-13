import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getStructuredData, getCleanData, getMovingAverage, getSlope, getSmartMovingAverage } from './utils/calculateData';
import { randomUUID } from 'crypto';
import prisma from '@/lib/prisma';

interface ProcessedData {
  xAxis: (number | null)[];
  series1: (number | null)[];
  series2: (number | null)[];
  series3: (number | null)[];
  slopeSeries1: { x: number; slope: number | null }[];
  slopeSeries2: { x: number; slope: number | null }[];
  slopeSeries3: { x: number; slope: number | null }[];
}

export async function POST(req: Request) {
  try {
    const { sheetEmail } = await req.json();

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Fetch data from Google Sheet
    const [graphRawData, userRawData] = await Promise.all([
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetEmail}!A2:D`,
      }),
      sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetEmail}!F:G`,
        valueRenderOption: 'UNFORMATTED_VALUE',
      }),
    ]);

    const graphRows = graphRawData.data.values || [];
    const userRows = userRawData.data.values || [];


    if (!Array.isArray(graphRows) || graphRows.length === 0 || !Array.isArray(userRows) || userRows.length === 0) {
      throw new Error('Invalid or empty data');
    }

    userRows[2][1] = convertSerialToDate(userRows[2][1]);

    const useData = {
      name: userRows[0][1],
      birthPlace: userRows[1][1],
      birthDate: userRows[2][1],
    }

    const cleanGraphRows = getCleanData(graphRows);

    const structuredData = await getStructuredData(cleanGraphRows);

    // Apply smart moving average based on series characteristics
    const smoothedSeries1 = getSmartMovingAverage(structuredData.series1, 3);
    const smoothedSeries2 = getSmartMovingAverage(structuredData.series2, 3);
    const smoothedSeries3 = getSmartMovingAverage(structuredData.series3, 3, true);

    const processedData = {
      xAxis: structuredData.xAxis,
      series1: smoothedSeries1,
      series2: smoothedSeries2,
      series3: smoothedSeries3,
      slopeSeries1: getSlope(smoothedSeries1),
      slopeSeries2: getSlope(smoothedSeries2),
      slopeSeries3: getSlope(smoothedSeries3),
    }

    const result = await updateToSupabase(processedData, sheetEmail, useData.name, useData.birthDate, useData.birthPlace)

    return NextResponse.json({result}, { status: 200 });
  } catch (error) {
    console.error('Error processing sheet data:', error);
    return NextResponse.json({ error: 'Failed to process sheet data' }, { status: 500 });
  }
}

const convertSerialToDate = (serial: number) => {
  const milliseconds = (serial - 25569) * 86400 * 1000; // Convert to milliseconds
  return new Date(milliseconds); // Create a new Date object
};

async function updateToSupabase(processedData: ProcessedData, sheetEmail: string, name: string, birthDate: string, birthPlace: string) {
  try {
    const { data } = await prisma.user.upsert({
      where: { email: sheetEmail },
      update: {
        data: JSON.stringify(processedData),
        name: name,
        birthdate: birthDate,
        birthplace: birthPlace,
        updatedAt: new Date().toISOString()
      },
      create: {
        id: randomUUID(),
        email: sheetEmail,
        data: JSON.stringify(processedData),
        name: name,
        birthdate: birthDate,
        birthplace: birthPlace,
      }
    });

    return data;
  } catch (error) {
    console.error('Error updating database:', error);
    throw error;
  }
}
