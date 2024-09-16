'use client'
import GraphReadBox from '@/components/box/GraphReadBox';
import LineGraph from '@/components/graph/LineGraph'
import React, {Component, useState} from 'react';

export default function page() {
  const [pointData, setPointData] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);

  const handlePointData = (data: any) => {
    console.log('Data from Point: ', data);
    setPointData(data);
  }

  const handleGraphData = (data: any) => {
    console.log('Data from graph: ', data);
    setGraphData(data);
  }

  return (
    <div className='mt-20 flex flex-col justify-center items-center w-full'>
        <img src='images/starcansaylogo-31.png' width='400px'/>
        <LineGraph onPointData={handlePointData} onGraphData={handleGraphData}/>

        <GraphReadBox handlePointData={pointData} handleGraphData={graphData}/>
        
    </div>
  )
}
