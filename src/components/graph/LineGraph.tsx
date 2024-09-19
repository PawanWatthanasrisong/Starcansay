'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '../ui/button';
import { FileX } from 'lucide-react';

interface LineGraphProps {
  onPointData: (data:any) => void;
  onGraphData: (data:any) => void;
}

export default function LineGraph ({ onPointData, onGraphData }: LineGraphProps) {

  const [chartData, setChartData] = useState<any[]>([]);
  const [activeSeries1, setActiveSeries1] = useState<boolean>(true);
  const [activeSeries2, setActiveSeries2] = useState<boolean>(true);
  const [activeSeries3, setActiveSeries3] = useState<boolean>(true);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = (data: any) => {
      if(data.activeTooltipIndex){
        setTooltipData(data);
        setIsClicked(true);
        onPointData(data);
      }
  }

  const handleMouseLeave = () => {
    setIsActive(false);
    if (!isClicked) {  // Reset only if not clicked
      setTooltipData(null);
    }
  };

  const handleMouseEnter = (data: any) => {
    setIsActive(true);
    if (!isClicked) {  // Only update data if not clicked
      setTooltipData(data);
    }
  };

  // Reset click behavior to allow hovering again
  const resetClick = () => {
    setIsClicked(false);  // Allow hovering again
  };


// Custom Tooltip component
const CustomTooltip = ({ payload }: { payload: any }) => {
  if (payload.length !== 0) {
    return (
      <div className="customized-tooltip-content bg-white border-[1px] rounded-sm border-zinc-400 shadow-lg">
        <div className='m-3'>
        <p className="total">ณ อายุ {payload[0].payload.age} ปี</p>
        <ul className="list">
          {payload.map((entry:any, index:any) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </li>
          ))}
        </ul>
        </div>
      </div>
    );
  }

  return null;
};

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/chartData');
      const result = await response.json();
      //Format data for Recahrts
      const formattedData = result.xAxis.map((x:any, index: number) => ({
        age: x,
        series1: result.series1[index],
        series2: result.series2[index],
        series3: result.series3[index],
      }));
      setChartData(formattedData);
      onGraphData(result);
      console.log(result);
    };

    fetchData();

    
  },[]);


  return (
    <div>
      {chartData.length > 0 && (
        <div className='w-screen flex flex-col justify-center items-center '>
          <ResponsiveContainer width='70%' height={300} >
            <LineChart data={chartData} onMouseLeave={handleMouseLeave} onClick={handleClick} onMouseMove={handleMouseEnter}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis type='number' dataKey='age' name='อายุ' tickMargin={10} tickCount={11} domain={[0,100]} unit='ปี'/>
              <YAxis type='number' tickMargin={10} domain={[-100,100]} />
              <Tooltip content={<CustomTooltip payload={tooltipData} />} active={isActive}/>
              <Legend />
              <ReferenceLine y="0" stroke="black" opacity='50%'/>
              <ReferenceLine x={tooltipData? tooltipData.activeTooltipIndex : -1} stroke="red" opacity='100%'/>
              <Line 
                type="monotone" 
                dataKey="series1" 
                stroke="#8884d8" 
                strokeWidth='2px' 
                name='ชีวิต เต็มที่' 
                dot={false} 
                hide={!activeSeries1} 
                isAnimationActive={false} 
                legendType='none'
                />
              <Line 
                type="monotone" 
                dataKey="series2" 
                stroke="#82ca9d" 
                strokeWidth='2px' 
                name='โชคลาภ สำเร็จ' 
                dot={false} 
                hide={!activeSeries2} 
                isAnimationActive={false} 
                legendType='none'
                />
              <Line 
                type="monotone" 
                dataKey="series3" 
                stroke="#ca828b" 
                strokeWidth='2px' 
                name='เข้มข้น ท้าทาย' 
                dot={false} 
                hide={!activeSeries3} 
                isAnimationActive={false} 
                legendType='none'
                />
            </LineChart>
          </ResponsiveContainer>
          <div className='mt-5'>
            <Button className={`hover:bg-violet-400 ${activeSeries1 ? 'bg-purple-500': 'bg-gray-400'} `} onClick={() => setActiveSeries1(!activeSeries1)}>
            <svg className="w-4 h-4 mr-2" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="6" />
            </svg>
              ชีวิต เต็มที่
            </Button>
            <Button className={`hover:bg-green-400 ${activeSeries2 ? 'bg-green-500': 'bg-gray-400'} mx-10`} onClick={() => setActiveSeries2(!activeSeries2)}>
            <svg className="w-4 h-4 mr-2" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="6" />
            </svg>
              โชคลาภ สำเร็จ
            </Button>
            <Button className={`hover:bg-red-400 ${activeSeries3 ? 'bg-red-500': 'bg-gray-400'}`} onClick={() => setActiveSeries3(!activeSeries3)}>
            <svg className="w-4 h-4 mr-2" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="6" />
            </svg>
              เข้มข้น ท้าทาย
            </Button>
          </div>
        </div>
      )}
    </div>
  )
};
