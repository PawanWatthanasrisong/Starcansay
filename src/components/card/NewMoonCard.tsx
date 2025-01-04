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
                    <img src="/images/starcansaylogo-31.png?authuser=1" width={144}/>
                    <p className='font-starcansay text-starcansaypink text-[40px] lg:text-[32px]'>
                      นะมามิ
                    </p>
                    <img src="https://storage.cloud.google.com/starcansay/img/star%20caractor%20-37.png" width={295}/>
                </CardTitle>
            </CardHeader>
            <CardContent className='mt-2 flex flex-grow flex-col justify-evenly items-center w-full text-xs px-4 py-0'>
              <p className='font-starcansay text-starcansaypink text-[32px]'>
                "กำลัง New Moon"
              </p>
              <br/>
              <p className='mt-2 font-ibm-plex-sans-thai text-starcansayblue text-[18px] font-bold'>
                ดาวชีวิตกำลังอยู่ในช่วงเริ่มต้นไปสู่มุ่งหน้า
              </p>
              <br/>
              <div className='font-thai text-center'>
                <p className='text-starcansayblue text-[11px] font-medium px-6 leading-[18px]'>
                { graphData? LifeStar(graphData, xAxis)?.shortDescription : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
                <div className='bg-starcansaylightpink rounded-2xl border-8 border-starcansaylightpink text-starcansayblue text-[11px] font-medium mt-2 px-3 leading-[18px]'>
                  <p>
                  { graphData? LifeStar(graphData, xAxis)?.subDescription : 'กำลังโหลดรอแปปนึงนะะ :D'}
                  </p>
                </div>
              </div>
              <br/>
              <div className='grid grid-cols-2 gap-2'>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <img src="https://storage.cloud.google.com/starcansay/img/sticker%20starcansay%20web-29%203.png" width={85.6} className='col-span-1'/>
                  <div className='col-span-1 -ml-3 content-center'>
                    <p className='text-starcansayblue font-ibm-plex-sans-thai text-[12px] font-bold'>ดาวโชค</p>
                    <p className='text-starcansayblue font-thai text-[10px] font-medium leading-[13px]'>
                  { graphData? LuckStar(graphData, xAxis)?.subWording : 'กำลังโหลดรอแปปนึงนะะ :D'}
                  </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <img src="https://storage.cloud.google.com/starcansay/img/sticker%20starcansay%20web-29%203.png" width={85.6} className='col-span-1'/>
                  <div className='col-span-1 -ml-3 content-center'>
                    <p className='text-starcansayblue font-ibm-plex-sans-thai text-[12px] font-bold'>ดาวท้าทาย</p>
                    <p className='text-starcansayblue font-thai text-[10px] font-medium align-middle leading-[13px]'>
                    { graphData? ChallengeStar(graphData, xAxis)?.subWording : 'กำลังโหลดรอแปปนึงนะะ :D'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col items-center pt-5 pb-3'>
              <hr className='border-starcansaypink border-1 w-full'/>
              <p className='mt-4 text-starcansayblue font-thai text-[10px] font-medium text-center'>
                <span>ดูแต่ละช่วงชีวิตของตัวเองได้ถึง 100 ปี สนใจสอบถามได้ที่</span>
                <br/>
                <span>Line@ : @Starcansay / IG : Starcansay</span>
              </p>
            </CardFooter>
        </Card>
    </div>
  )
}
