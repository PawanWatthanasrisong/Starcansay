'use client'
import { Download, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React, { ReactElement, useRef } from 'react'
import LifeStar from '../box/helpers/LifeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';
import html2canvas from 'html2canvas';
import SummayCardForDownload from './SummayCardForDownload';

export default function SummaryCard({ handleGraphData } : any) {
  const imageRef = useRef(null);
  const xAxis = 34;
  const graphData = handleGraphData;
  console.log(graphData);

  const printDocument = (domElement: any) => {
    console.log(domElement);
    html2canvas(domElement).then((canvas) => {
      const image = canvas.toDataURL('jpg');
      const a = document.createElement('a');
      a.setAttribute('download', 'starcansay.png');
      a.setAttribute('href', image);
      a.click();
    });
  };

  return (
    <div>
        <Card className='flex flex-col w-full h-full rounded-3xl' ref={imageRef}>
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
              <button onClick={() => printDocument(<SummayCardForDownload handleGraphData={graphData}/>)}>
                <Download className='' />
              </button>
              <Share2 />
            </CardFooter>
        </Card>
    </div>
  )
}
