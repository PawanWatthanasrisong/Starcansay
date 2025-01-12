'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import LifeStar from './helpers/LifeStarFunction';
import LuckStar from './helpers/LuckStarFunction';
import ChallengeStar from './helpers/ChallengeStarFunction';
import { Car } from 'lucide-react';

interface GraphReadBoxProps {
    handlePointData: any
    handleGraphData: any
}


export default function GraphReadBox({ handlePointData, handleGraphData }: GraphReadBoxProps) {
    const xAxis =  handlePointData?.activeTooltipIndex ?? handlePointData ?? 'N/A';
    const activePayload = handlePointData?.activePayload ?? [];

    if (!handlePointData || !handleGraphData){
        return (
            <div className='w-full h-80 flex flex-col items-center justify-center mt-5 text-base sm:text-lg'>
                <Card className='w-full sm:w-3/4 h-full flex items-center justify-center'>
                    <CardContent>
                        <p>
                        Click เลือกอายุที่กราฟเลย!  
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const graphData = handleGraphData;

  return (
    <div className='w-full flex flex-col items-center font-thai justify-center mt-5 text-base sm:text-lg'>
        <Card className='w-full sm:w-3/4'>
            <CardContent className='mt-5'>
            <span className='font-bold'>ณ อายุ {xAxis} ปี</span>
            {/* <span className='ml-5'>
                {activePayload.map((entry: any, index: number) => 
                    <span key={index} className='mr-5'>
                        {entry.name}: {entry.value}
                    </span>)}
            </span> */}
            <br/>
            <br/>
            <p id='lifestar-wording' className='text-center'>
                <b>ดาวชีวิต: {LifeStar(graphData, xAxis)?.wording}</b>
            </p>
            <br/>
            <p id='lifestar-description'>
                {LifeStar(graphData, xAxis)?.description}
            </p>
            </CardContent>
        </Card>
        <div className='flex flex-col md:flex-row  w-full sm:w-3/4 mt-5'>
            <Card className='w-full md:w-1/2 md:mr-5'>
                <CardContent className='mt-5'>
                    <p id='lifestar-wording' className='text-center'>
                        <b>ดาวโชค: {LuckStar(graphData, xAxis)?.wording}</b>
                    </p>
                    <br/>
                    <p id='lifestar-description'>
                        {LuckStar(graphData, xAxis)?.description}
                    </p>
                </CardContent>
            </Card>
            <Card className='w-full md:w-1/2 mt-5 md:mt-0'>
                <CardContent className='mt-5'>
                    <p id='lifestar-wording' className='text-center'>
                        <b>ดาวท้าทาย: {ChallengeStar(graphData, xAxis)?.wording}</b>
                    </p>
                    <br/>
                    <p id='lifestar-description'>
                        {ChallengeStar(graphData, xAxis)?.description}
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}
