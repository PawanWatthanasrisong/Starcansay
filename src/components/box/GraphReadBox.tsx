'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import LifeStar from './helpers/LifeStarFunction';
import LuckStar from './helpers/LuckStarFunction';
import ChallengeStar from './helpers/ChallengeStarFunction';
import type GraphData from '@/types/graph';
import type { PointData } from '@/types/point';

interface GraphReadBoxProps {
    handlePointData: number
    handleGraphData: GraphData
}


export default function GraphReadBox({ handlePointData, handleGraphData }: GraphReadBoxProps) {
    const xAxis =  handlePointData ?? 'N/A';

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
        <Card className='w-full  border-4 rounded-3xl border-starcansayblue bg-starcansayblue-background text-starcansayblue relative'>
            <CardContent className='mt-5'>
                <div className='absolute top-3 left-2 right-2 flex justify-center md:justify-start'>
                    <div className='w-fit font-bold font-starcansay text-2xl rounded-lg px-2 py-2 bg-white'>
                        <span>ตอน อายุ {xAxis} ปี</span>
                    </div>
                </div>
                <h2 className='text-center font-starcansay text-5xl mb-4 mt-20  md:mt-0'>{`"${LifeStar(graphData, xAxis)?.title}"`}</h2>
                <p id='lifestar-wording' className='text-center font-ibm-plex-sans-thai text-3xl'>
                    <b>ดาวชีวิตกำลังอยู่ใน{LifeStar(graphData, xAxis)?.wording}</b>
                </p>
                <br/>
                <p id='lifestar-description'>
                    {LifeStar(graphData, xAxis)?.description}
                </p>
            </CardContent>
        </Card>
        <div className='flex flex-col md:flex-row w-full mt-3'>
            <Card className='w-full md:w-1/2 md:mr-3 border-4 border-starcansaygreen bg-starcansaygreen-background rounded-3xl text-starcansayblue'>
                <CardContent className='mt-5'>
                    <p id='lifestar-wording' className='text-center font-starcansay text-3xl'>
                        <b>{LuckStar(graphData, xAxis)?.wording}</b>
                    </p>
                    <br/>
                    <p id='lifestar-description'>
                        {LuckStar(graphData, xAxis)?.description}
                    </p>
                </CardContent>
            </Card>
            <Card className='w-full md:w-1/2 mt-5 md:mt-0 border-4 border-starcansayred bg-starcansayred-background rounded-3xl text-starcansayblue'>
                <CardContent className='mt-5'>
                    <p id='lifestar-wording' className='text-center font-starcansay text-3xl'>
                        <b>{ChallengeStar(graphData, xAxis)?.wording}</b>
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
