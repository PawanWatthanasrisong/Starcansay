import { createClient } from '@supabase/supabase-js'
import { google } from 'googleapis'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: Request) {
  try {
    const { sheetEmail } = await req.json()

    // Initialize Google Sheets API
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // Fetch data from Google Sheet
    const graphRawData = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetEmail}!A:D`, // Use sheetId as sheet name
    })

    const userRawData = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: `${sheetEmail}!F:G`, // Use sheetId as sheet name
      })

    const userData = userRawData.data.values || [];
    const rows = graphRawData.data.values || [];

    if (!Array.isArray(rows) || rows.length === 0) {
      throw new Error('Invalid or empty data');
    }
    const cleanRows = cleanData(rows);
    const { xAxis, series1, series2, series3 } = processData(cleanRows);
    const smoothSeries3 = movingAverage(series3, 1);

    console.log([xAxis, series1, series2, series3, smoothSeries3]);

    if (!rows || rows.length === 0) {
      throw new Error('No data found in sheet')
    }

    // Process the data and update Supabase
    // This will depend on your data structure
    const processedData = processSheetData(rows)


    // // Update Supabase
    // const { error } = await supabase
    //   .from('user_data')
    //   .upsert(processedData)

    // if (error) throw error

    // // Update sheet status
    // await supabase
    //   .from('sheets')
    //   .update({ 
    //     status: 'success',
    //     last_updated: new Date().toISOString()
    //   })
    //   .eq('id', sheetId)

    // return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating sheet:', error)
    
    // Update sheet status to error
    // await supabase
    //   .from('sheets')
    //   .update({ 
    //     status: 'error',
    //     last_updated: new Date().toISOString()
    //   })
    //   .eq('id', sheetId)

    // return NextResponse.json(
    //   { error: 'Failed to update sheet data' },
    //   { status: 500 }
    // )
  }
}

function processSheetData(rows: any[]) {
  // Process the sheet data according to your needs
  // This is just an example
  const [headers, ...dataRows] = rows
  
  return dataRows.map(row => {
    const obj: any = {}
    headers.forEach((header: string, index: number) => {
      obj[header.toLowerCase()] = row[index]
    })
    return obj
  })
} 

function processData(data: Array<Array<string>>){
    const xAxis = data.map((row) => row[0]).slice(1,);
    const series1 = data.map((row) => row[1]).slice(1,);
    const series2 = data.map((row) => row[2]).slice(1,);
    const series3 = data.map((row) => row[3]).slice(1,);
    return { xAxis, series1, series2, series3}
}

function movingAverage(data: any, windowSize: number){
  const result = [];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - windowSize); j <= Math.min(data.length - 1, i + windowSize); j++) {
      if (data[j] !== null && data[j] !== undefined && !isNaN(data[j])) {
        sum += data[j];
        count++;
      }
    }
    result.push(count > 0 ? sum / count : null);
  }
  return result;
};

function cleanData(data: any[]): any[] {
    return data.map(item => {
      if (Array.isArray(item)) {
        return cleanData(item); // Recursively clean nested arrays
      }
      if (item === '#N/A') {
        return null;
      }
      const parsedNumber = parseFloat(item);
      return isNaN(parsedNumber) ? item : parsedNumber;
    });
}