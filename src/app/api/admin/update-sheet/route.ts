import { createClient } from '@supabase/supabase-js';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { getStructuredData, getCleanData, getMovingAverage, getSlope } from './utils/calculateData';
import { randomUUID } from 'crypto';

interface ProcessedData {
  xAxis: (number | null)[];
  series1: (number | null)[];
  series2: (number | null)[];
  series3: (number | null)[];
  slopeSeries1: { x: number; slope: number | null }[];
  slopeSeries2: { x: number; slope: number | null }[];
  slopeSeries3: { x: number; slope: number | null }[];
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export async function POST(req: Request) {
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
        range: `${sheetEmail}!A:D`,
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
    const processedData = {
      ...structuredData,
      slopeSeries1: getSlope(structuredData.series1),
      slopeSeries2: getSlope(structuredData.series2),
      series3: getMovingAverage(structuredData.series3, 1),
      slopeSeries3: getSlope(getMovingAverage(structuredData.series3, 1)),
    }
    const result = await updateToSupabase(processedData, sheetEmail, useData.name, useData.birthDate, useData.birthPlace)
    return NextResponse.json({result}, { status: 200 });
}

const convertSerialToDate = (serial: number) => {
  const milliseconds = (serial - 25569) * 86400 * 1000; // Convert to milliseconds
  return new Date(milliseconds); // Create a new Date object
};

async function updateToSupabase(processedData: ProcessedData, sheetEmail: string, name: string, birthDate: string, birthPlace: string) {
  const { data, error } = await supabase
    .from('User')
    .upsert({
      id: randomUUID(),
      email: sheetEmail,
      data: processedData,
      name: name,
      birthdate: birthDate,
      birthplace: birthPlace,
      updatedAt: new Date().toISOString()
    })
    .select();

  if (error) throw error;
  return data;
}
