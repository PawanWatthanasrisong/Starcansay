'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React from 'react'

interface SummaryCardPureProps {
  name: string;
  status: {
    name?: string;
    title?: string;
    description?: string;
  }
  lifeStar: {
    shortDescription?: string;
    subDescription?: string;
    wording?: string;
    img_url?: string;
  };
  luckStar: {
    subWording?: string;
  };
  challengeStar: {
    subWording?: string;
  };
}

export default function SummaryCardPure({ name, status, lifeStar, luckStar, challengeStar } : SummaryCardPureProps) {
  return (
    <div>
        <Card className='flex flex-col w-full h-full rounded-3xl' >
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <img src="https://storage.googleapis.com/starcansay/img/starcansaylogo-31%203.png" width={144} alt="starcansay logo"/>
                    <p className='font-starcansay text-starcansaypink text-[40px] lg:text-[32px]'>
                      {name}
                    </p>
                    <img src={lifeStar.img_url} width={295} alt="starcansay caractor"/>
                </CardTitle>
            </CardHeader>
            <CardContent className='mt-2 flex flex-grow flex-col justify-evenly items-center w-full text-xs px-4 py-0'>
              <p className='font-starcansay text-starcansaypink text-[32px]'>
                {status.title}
              </p>
              <br/>
              <p className='mt-2 font-ibm-plex-sans-thai text-starcansayblue text-[18px] font-bold'>
                {status.description}
              </p>
              <br/>
              <div className='font-thai text-center'>
                <p className='text-starcansayblue text-[11px] font-medium px-6 leading-[18px]'>
                {lifeStar.shortDescription}
                </p>
                <div className='bg-starcansaylightpink rounded-2xl border-8 border-starcansaylightpink text-starcansayblue text-[11px] font-medium mt-2 px-3 leading-[18px]'>
                  <p>
                  {lifeStar.subDescription}
                  </p>
                </div>
              </div>
              <br/>
              <div className='grid grid-cols-2 gap-2'>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <img src="https://storage.googleapis.com/starcansay/img/star%20caractor%20-43.png" width={85.6} className='col-span-1' alt="starcansay sticker"/>
                  <div className='col-span-1 -ml-3 content-center'>
                    <p className='text-starcansayblue font-ibm-plex-sans-thai text-[12px] font-bold'>ดาวโชค</p>
                    <p className='text-starcansayblue font-thai text-[10px] font-medium leading-[13px]'>
                    {luckStar.subWording}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <img src="https://storage.googleapis.com/starcansay/img/star%20caractor%20-41.png" width={85.6} className='col-span-1' alt="starcansay sticker"/>
                  <div className='col-span-1 -ml-3 content-center'>
                    <p className='text-starcansayblue font-ibm-plex-sans-thai text-[12px] font-bold'>ดาวท้าทาย</p>
                    <p className='text-starcansayblue font-thai text-[10px] font-medium align-middle leading-[13px]'>
                    {challengeStar.subWording}
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
