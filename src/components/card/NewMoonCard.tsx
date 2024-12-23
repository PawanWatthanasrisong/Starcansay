'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React, { ReactElement, useRef, useState } from 'react'
import LifeStar from '../box/helpers/LifeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';

import SummaryCardForDownload from './SummaryCardForDownload';

export default function NewMoonCard({ handleGraphData } : any) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const xAxis = 44;
  const graphData = handleGraphData;
  const [showDownloadComponent, setShowDownloadComponent] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);


  return (
    <div>
        <Card className='flex flex-col w-full h-full rounded-3xl' >
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <img src="/images/starcansaylogo-31.png" width={144}/>
                    <p className='font-starcansay text-starcansaypink text-[32px] md:text-lg'>
                      นะมามิ
                    </p>
                    <img src="https://storage.cloud.google.com/starcansay/img/star%20caractor%20-37.png" width={295}/>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-grow flex-col justify-evenly items-center w-full text-xs'>
              <p className='font-starcansay text-starcansaypink text-[32px]'>
                "กำลัง New Moon"
              </p>
              <br/>
              <p className='font-ibm-plex-sans-thai text-starcansayblue text-[18px] font-bold'>
                ดาวชีวิตกำลังอยู่ในช่วงเริ่มต้นไปสู่มุ่งหน้า
              </p>
              <br/>
              <div className='font-thai text-center'>
                <p className='text-starcansayblue text-[11px] font-medium'>
                { graphData? LifeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
                <div className='bg-starcansaypink rounded-2xl border-8 border-starcansaypink text-starcansayblue text-[11px] font-medium mt-2'>
                  <p>
                  { graphData? LifeStar(graphData, xAxis)?.subDescription : 'กำลังโหลดรอแปปนึงนะะ :D'}
                  </p>
                </div>
              </div>
              <br/>
              <div className='font-thai'>
                <p>
                { graphData? LuckStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
              <div className='font-thai'>
                <p>
                { graphData? ChallengeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
            </CardContent>
            <CardFooter className='flex justify-evenly'>
            </CardFooter>
        </Card>
    </div>
  )
}
