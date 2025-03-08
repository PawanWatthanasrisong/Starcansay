'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React from 'react';
import { Skeleton } from '../ui/skeleton';

export default function SummaryCardPureSkeleton() {
  return (
    <div>
        <Card className='flex flex-col w-full h-full rounded-3xl'>
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <Skeleton className='w-36 h-10 mb-2' />
                    <Skeleton className='w-48 h-8 mb-2' />
                    <Skeleton className='w-72 h-20' />
                </CardTitle>
            </CardHeader>
            <CardContent className='mt-2 flex flex-grow flex-col justify-evenly items-center w-full text-xs px-4 py-0'>
              <Skeleton className='w-32 h-8 mb-2' />
              <Skeleton className='w-48 h-6 mb-2' />
              <div className='font-thai text-center'>
                <Skeleton className='w-40 h-6 mb-2' />
                <div className='bg-starcansaylightpink rounded-2xl border-8 border-starcansaylightpink text-starcansayblue text-[11px] font-medium mt-2 px-3 leading-[18px]'>
                  <Skeleton className='w-48 h-6' />
                </div>
              </div>
              <br/>
              <div className='grid grid-cols-2 gap-2'>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <Skeleton className='w-20 h-20' />
                  <div className='col-span-1 -ml-3 content-center'>
                    <Skeleton className='w-24 h-6 mb-1' />
                    <Skeleton className='w-20 h-5' />
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-2 col-span-1'>
                  <Skeleton className='w-20 h-20' />
                  <div className='col-span-1 -ml-3 content-center'>
                    <Skeleton className='w-24 h-6 mb-1' />
                    <Skeleton className='w-20 h-5' />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className='flex flex-col items-center pt-5 pb-3'>
              <hr className='border-starcansaypink border-1 w-full'/>
              <Skeleton className='w-64 h-5 mt-4' />
            </CardFooter>
        </Card>
    </div>
  )
}
