'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '../ui/button';
import { FileX } from 'lucide-react';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import LifeStar from '../box/helpers/LifeStarFunction';


interface LineGraphProps {
  onPointData: (data:any) => void;
  onGraphData: (data:any) => void;
  handlePointData: any
}

export default function LineGraph ({ onPointData, onGraphData, handlePointData }: LineGraphProps) {

  const [chartData, setChartData] = useState<any[]>([]);
  const [activeSeries1, setActiveSeries1] = useState<boolean>(true);
  const [activeSeries2, setActiveSeries2] = useState<boolean>(true);
  const [activeSeries3, setActiveSeries3] = useState<boolean>(true);
  const [tooltipData, setTooltipData] = useState<any>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [graphData, setGraphData] = useState<string>('');
  const [graphHeight, setGraphHeight] = useState<number>(300);
  const [graphWidth, setGraphWidth] = useState<string>('90%');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleClick = (data: any) => {
      if(data.activeTooltipIndex){
        setTooltipData(data);
        setIsClicked(true);
        onPointData(data.activeTooltipIndex);
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

  const entrySwitch = (name: string, age: number) => {
    let result;
    switch (name) {
      case 'ดาวชีวิต' :
        result = LifeStar(graphData, age).wording;
        break;
      case 'ดาวโชค' :
        result = LuckStar(graphData, age).wording;
        break;
      case 'ดาวท้าทาย' :
        result = ChallengeStar(graphData, age).wording;
        break;
    }
    return result;  
  }


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
              {`${entry.name}: ${entrySwitch(entry.name, payload[0].payload.age)}`}
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
      setIsLoading(true);
      const response = await fetch('/api/chartData', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      //Format data for Recahrts
      const formattedData = result.xAxis.map((x:any, index: number) => ({
        age: x,
        series1: result.series1[index],
        series2: result.series2[index],
        series3: result.series3[index],
      }));
      setChartData(formattedData);
      setGraphData(result);
      onGraphData(result);
      setIsLoading(false);
    };
    fetchData();
  },[]);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);

  useEffect(() => {
    if (width >= 768){
      setGraphHeight(300);
      setGraphWidth('90%');
    } else {
      setGraphHeight(200);
      setGraphWidth('100%');
    }
  },[width])

  useEffect(() => {
    let pointData = {
      activeTooltipIndex: handlePointData
    }
    handleClick(pointData);
  },[handlePointData]);

  if (isLoading) {
    return  (
      <div className="flex justify-center items-center w-full">
        กำลังโหลดรอแปปนึงนะะ :D
      </div>
    );
  }

  return (
    <div>
      {chartData.length > 0 && (
        <div className='w-full flex flex-col justify-center items-center text-sm sm:text-lg'>
          <ResponsiveContainer width={graphWidth} height={graphHeight} className='mr-5'>
            <LineChart data={chartData} onMouseLeave={handleMouseLeave} onClick={handleClick} onMouseMove={handleMouseEnter}>
              <CartesianGrid strokeDasharray="4 4" />
              <XAxis type='number' dataKey='age' name='อายุ' tickMargin={10} tickCount={11} domain={[0,100]} unit='ปี'/>
              <YAxis type='number' tickMargin={10} domain={[-100,100]} hide={true} />
              <Tooltip content={<CustomTooltip payload={tooltipData} />} active={isActive}/>
              <Legend />
              <ReferenceLine y="0" stroke="black" opacity='50%'/>
              <ReferenceLine x={tooltipData? tooltipData.activeTooltipIndex : -1} stroke="red" opacity='100%'/>
              <Line 
                type="monotone" 
                dataKey="series1" 
                stroke="#8884d8" 
                strokeWidth='2px' 
                name='ดาวชีวิต' 
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
                name='ดาวโชค' 
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
                name='ดาวท้าทาย' 
                dot={false} 
                hide={!activeSeries3} 
                isAnimationActive={false} 
                legendType='none'
                />
            </LineChart>
          </ResponsiveContainer>
          <div className='mt-5'>
            <Button className={`w-fit hover:bg-violet-400 ${activeSeries1 ? 'bg-purple-500': 'bg-gray-400'}  text-xs sm:text-sm `} onClick={() => setActiveSeries1(!activeSeries1)}>
              <svg className="w-2 h-2 sm:w-4 sm:h-4 mr-1" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" />
              </svg>
                ดาวชีวิต
            </Button>
            <Button className={`w-fit hover:bg-green-400 ${activeSeries2 ? 'bg-green-500': 'bg-gray-400'} mx-5 sm:mx-10 text-xs sm:text-sm`} onClick={() => setActiveSeries2(!activeSeries2)}>
              <svg className="w-2 h-2 sm:w-4 sm:h-4 mr-1" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" />
              </svg>
                ดาวโชค
            </Button>
            <Button className={`w-fit hover:bg-red-400 ${activeSeries3 ? 'bg-red-500': 'bg-gray-400'} text-xs sm:text-sm`} onClick={() => setActiveSeries3(!activeSeries3)}>
              <svg className="w-2 h-2 sm:w-4 sm:h-4 mr-1" fill="white" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" />
              </svg>
                ดาวท้าทาย
            </Button>
          </div>
        </div>
      )}
    </div>
  )
};
