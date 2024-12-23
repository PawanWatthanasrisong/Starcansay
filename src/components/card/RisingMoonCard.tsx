'use client'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React, { ReactElement, useRef, useState } from 'react'
import LifeStar from '../box/helpers/LifeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';

import SummaryCardForDownload from './SummaryCardForDownload';

export default function SummaryCard({ handleGraphData } : any) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const xAxis = 34;
  const graphData = handleGraphData;
  const [showDownloadComponent, setShowDownloadComponent] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);


  return (
    <div>
        {showDownloadComponent && (
          <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
              <SummaryCardForDownload setCardRef={setCardRef} handleGraphData={graphData} />
          </div>
        )}
        <Card className='flex flex-col w-full h-full rounded-3xl' >
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <img src="/images/starcansaylogo-31.png" width={300}/>
                    <p className='text-xl md:text-lg'>
                      ดวงชีวิตของนะมามิ ในวัย 34 ปี
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-grow flex-col justify-evenly w-full text-xs'>
              <b>คำอธิบายชีวิต</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
                <p>
                { graphData? LifeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
              <b>คำอธิบายโชค</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
                <p>
                { graphData? LuckStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
              <b>คำอธิบายความท้าทาย</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
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
