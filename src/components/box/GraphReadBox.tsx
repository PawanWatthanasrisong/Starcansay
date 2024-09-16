'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

interface GraphReadBoxProps {
    handlePointData: any
    handleGraphData: any
}


export default function GraphReadBox({ handlePointData, handleGraphData }: GraphReadBoxProps) {
    if(!handlePointData){
        return null;
    }

    const graphData = handleGraphData;
    const xAxis = handlePointData.activeTooltipIndex;
    const series1 = handlePointData.activePayload[0];
    const series2 = handlePointData.activePayload[1];
    const series3 = handlePointData.activePayload[2];
    console.log(graphData[xAxis]);

    const lifeStar = (data: number) => {
        if (data >= 0 && data <= 80){
            console.log('hi')
            return 'มุ่งหน้า -> เต็มที่';
        }
    }

  return (
    <div className='w-screen flex items-center justify-center mt-5'>
        <Card className='w-3/4'>
            <CardContent>
            <span className='font-bold'>ณ อายุ {xAxis} ปี</span>
            <span className='ml-5'>{handlePointData.activePayload.map((entry: any) => 
                    <span className='mr-5'>{entry.name}: {entry.value}</span>)}
            </span>
            <p>
                ดาวชีวิต: {lifeStar(series1.value)}
            </p>
            </CardContent>
        </Card>
    </div>
  )
}
