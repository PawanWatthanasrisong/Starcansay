'use client'
import React, { useState} from 'react';
import { options } from '../api/auth/[...nextauth]/option';
import { redirect} from 'next/navigation';
import SignInSuccessToast from '@/components/ui/SignInSuccessToast';
import LineGraph from '@/components/graph/LineGraph';
import GraphReadBox from '@/components/box/GraphReadBox';
import { useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();
  const [pointData, setPointData] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  
  const handlePointData = (data: any) => {
    setPointData(data);
  }

  const handleGraphData = (data: any) => {
    setGraphData(data);
  }

  if (status === 'unauthenticated'){
    redirect('/');
  }

    return (
      <div className='min-h-screen flex flex-col items-center'>
          <div className='mt-20'>
            Hi {session?.user?.name}!!
          </div>
          <div className='mt-20 flex flex-col justify-center items-center w-full'>
            <img src='images/starcansaylogo-31.png' width='400px'/>
            <LineGraph onPointData={handlePointData} onGraphData={handleGraphData}/>
            <GraphReadBox handlePointData={pointData} handleGraphData={graphData}/>
          </div>
        
        <SignInSuccessToast />
      </div>
    )
  }
