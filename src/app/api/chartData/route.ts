import type { NextApiRequest, NextApiResponse } from "next";
import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { NextResponse } from "next/server";

export  async function  GET(req: Request, res: NextApiResponse) {
    try{
        //file path
        const filePath = path.join(process.cwd(),'public','data','newGraph.xlsx');
        console.log(filePath);
        const fileBuffer = fs.readFileSync(filePath);

        // //Read the file
        const workbook = XLSX.read(fileBuffer,{ type: 'array'});
        const worksheet = workbook.Sheets[workbook.SheetNames[3]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {header : 1});

        const xAxis = jsonData.map((row: any) => row[0]).slice(1,);
        const series1 = jsonData.map((row: any) => row[1]).slice(1,);
        const series2 = jsonData.map((row: any) => row[2]).slice(1,);
        let series3 = jsonData.map((row: any) => row[3]).slice(1,);

        const movingAverage = (data: any, windowSize: number) => {
            const result = [];
            for (let i = 0; i < data.length; i++){
                let sum = 0;
                let count = 0;
                for (let j = Math.max(0, i - windowSize); j <= Math.min(data.length -1, i + windowSize); j++){
                    if (data[j] !== null && data[j] !== undefined && !isNaN(data[j])) {
                        sum += data[j];
                        count++;
                      }
                }
                result.push(count > 0 ? Math.round(sum * 100 / count)/100 : null);
            }
            return result;
        }
        
        series3 = movingAverage(series3, 1);


        return NextResponse.json({
            xAxis,
            series1,
            series2,
            series3
        })

    } catch(error){
        console.log(error);
    }

}