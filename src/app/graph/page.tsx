'use client'
import GraphReadBox from '@/components/box/GraphReadBox';
import SummaryCard from '@/components/card/SummaryCard';
import AgeDropDown from '@/components/dropdown/AgeDropDown';
import LineGraph from '@/components/graph/LineGraph'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, {Component, Suspense, useState} from 'react';

export default function page() {
  const { data: session, status } = useSession();
  const [pointData, setPointData] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);

  const handlePointData = (data: any) => {
    console.log('Data from Point: ', data);
    setPointData(data);
  }

  const handleGraphData = (data: any) => {
    console.log('Data from graph: ', data);
    setGraphData(data);
    console.log(graphData);
  }

  if (status === 'unauthenticated'){
    redirect('/');
  }


  return (
    <div className='w-full'>
      
     
      <div className='flex flex-col h-fit bg-starcansayblue justify-center font-body md:flex-row w-full md:h-screen'>
        <div className='mt-28 flex flex-col text-white lg:mr-20 md:mr-10'>
          <p className='text-7xl text-center md:text-left'>ชีวิตนะมานิ <br/> ในวัย 34 ปี</p>
          <br/>
          <p className='text-2xl text-center md:text-left'>เกิดวันที่ 20 ก.ย. 2540 <br/>เวลาเกิด 13.00 <br/>สถานที่เกิด เชียงใหม่</p>
        </div>
        <div className='flex justify-center mx-5 mt-5 md:mt-28 mb-10 max-h-full aspect-[1080/1920]'>
          <SummaryCard handleGraphData={graphData}/>
        </div>
      </div>
      <div className='flex flex-col w-full font-body'>
        <div className='flex items-center mt-5 justify-between'>
          <div className='text-2xl md:ml-60'>
                <p>นี่คือกราฟชีวิตของคุณนะมามิ!</p>
          </div>
          <div className='md:mr-60'>
            <AgeDropDown handlePointData={pointData} onPointData={handlePointData}/>
          </div>
        </div>
          <div className='flex flex-col items-center mt-10 w-full'>
            <div className= 'w-full'>
                <LineGraph onPointData={handlePointData} onGraphData={handleGraphData}/>
            </div>
            <div className='mb-5 w-full'>
              <div className='mx-5'>
                <GraphReadBox handlePointData={pointData} handleGraphData={graphData}/>
              </div>
            </div>
            <div className='w-full md:w-3/4'>
              <p className='ml-5'>
                วิธีอ่านกราฟ
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}
