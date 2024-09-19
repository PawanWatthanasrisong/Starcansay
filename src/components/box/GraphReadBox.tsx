'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import LifeStar from './helpers/LifeStarFunction';
import LuckStar from './helpers/LuckStarFunction';
import ChallengeStar from './helpers/ChallengeStarFunction';

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

  return (
    <div className='w-screen flex items-center justify-center mt-5'>
        <Card className='w-3/4'>
            <CardContent>
            <span className='font-bold'>ณ อายุ {xAxis} ปี</span>
            <span className='ml-5'>{handlePointData.activePayload.map((entry: any) => 
                    <span className='mr-5'>{entry.name}: {entry.value}</span>)}
            </span>
            <p id='lifestar-wording'>
                ดาวชีวิต: {LifeStar(graphData, xAxis)?.wording}
            </p>
            <p id='lifestar-description'>
                {LifeStar(graphData, xAxis)?.description}
            </p><br/>
            <p id='lifestar-wording'>
                ดาวโชค: {LuckStar(graphData, xAxis)?.wording}
            </p>
            <p id='lifestar-description'>
                {LuckStar(graphData, xAxis)?.description}
            </p><br/>
            <p id='lifestar-wording'>
                ดาวท้าทาย: {ChallengeStar(graphData, xAxis)?.wording}
            </p>
            <p id='lifestar-description'>
                {ChallengeStar(graphData, xAxis)?.description}
            </p>
            </CardContent>
        </Card>
    </div>
  )
}
