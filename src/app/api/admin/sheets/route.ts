import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import { getCredentials } from '@/config/credentials';
export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: getCredentials(),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    const response = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    })

    const sheetsList = response.data.sheets?.map(sheet => ({
      id: sheet.properties?.sheetId,
      email: sheet.properties?.title,
      lastUpdated: new Date().toISOString(),
      status: 'pending' as const
    })) || []

    return NextResponse.json(sheetsList)
  } catch (error) {
    console.error('Error fetching sheets:', error)
    return NextResponse.json({ error: 'Failed to fetch sheets' }, { status: 500 })
  }
} 