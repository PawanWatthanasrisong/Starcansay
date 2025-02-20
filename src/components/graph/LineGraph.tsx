'use client'
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '../ui/button';
import { FileX, Grid } from 'lucide-react';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import LifeStar from '../box/helpers/LifeStarFunction';


interface LineGraphProps {
  onPointData: (data:number) => void;
  onGraphData: (data:number[]) => void;
  handlePointData: number
  username: string
  onLoadingChange?: (isLoading: boolean) => void
}

export default function LineGraph ({ onPointData, onGraphData, handlePointData, username, onLoadingChange }: LineGraphProps) {
  const [chartData, setChartData] = useState<number[]>([]);
  const [activeSeries1, setActiveSeries1] = useState<boolean>(true);
  const [activeSeries2, setActiveSeries2] = useState<boolean>(true); 
  const [activeSeries3, setActiveSeries3] = useState<boolean>(true);
  const [tooltipData, setTooltipData] = useState<{ activeTooltipIndex: number } | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [graphData, setGraphData] = useState<string>('');
  const [graphHeight, setGraphHeight] = useState<number>(400);
  const [graphWidth, setGraphWidth] = useState<string>('100%');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  const handleClick = (data: { activeTooltipIndex: number }) => {
      if(data.activeTooltipIndex){
        setTooltipData(data);
        setIsClicked(true);
        onPointData(data.activeTooltipIndex);
      }
  }

  useEffect(() => {
    const pointData = {
      activeTooltipIndex: handlePointData
    }
    setTooltipData(pointData);
    setIsClicked(true);
  },[handlePointData]);


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
      if (!username) {
        return;
      }
      const response = await fetch(`/api/users/${encodeURIComponent(username)}/chartData`, {
        method: 'GET',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      // Format data for Recharts
      const formattedData = result.xAxis.map((x: number, index: number) => ({
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
  }, [username]);

  useEffect(() => {
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    
  }, []);

  useEffect(() => {
    if (width >= 768){
      setGraphHeight(400);
      setGraphWidth('100%');
    } else {
      setGraphHeight(200);
      setGraphWidth('100%');
    }
  },[width])

  if (isLoading) {
    return  (
      <div className="flex justify-center items-center w-full">
        กำลังโหลดรอแปปนึงนะะ :D
      </div>
    );
  }

  return (
    <div className='flex items-center justify-center'>
      {chartData.length > 0 && (
        <div className='w-full sm:w-3/4 text-sm sm:text-lg'>
          <ResponsiveContainer width={graphWidth} height={graphHeight} className='w-full flex justify-center items-center bg-starcansayred-background rounded-3xl border-4 border-starcansayblue'>
            <LineChart 
              data={chartData}
              width={1100}
              height={graphHeight} 
              onMouseLeave={handleMouseLeave} 
              onClick={handleClick} 
              onMouseMove={handleMouseEnter}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                dataKey='age'
                name='อายุ'
                unit='ปี'
                stroke="#4E6AB3"
                axisLine={{strokeWidth: 2}}
                tickLine={{strokeWidth: 2}}
                tick={{ fontSize: 20, fontWeight: 'bold' }}
                tickMargin={10}
                interval={4}
                className='font-starcansay'
              />
              <YAxis hide={true} />
              <Legend 
                verticalAlign='top'
                height={50}
                iconType="square" 
                iconSize={20}
                formatter={(value) => <span style={{ color: '#4E6AB3' }} className='mr-10'>{value}</span>}
                align='left'
              />
              <Tooltip content={<CustomTooltip payload={tooltipData} />} active={isActive} cursor={{ stroke: '#F4AACA', strokeWidth: 4 }}/>
              <CartesianGrid strokeDasharray="0 0" className='bg-white' horizontal={false} horizontalPoints={[0,150]} stroke='white' strokeWidth={2} />
              <ReferenceLine x={tooltipData?.activeTooltipIndex ?? -1} stroke="#F4AACA" strokeWidth={4} opacity='100%'/>
              <Line 
                type="monotone" 
                dataKey="series1" 
                stroke="#4E6AB3" 
                strokeWidth='4px' 
                name='ดาวชีวิต' 
                dot={false} 
                hide={!activeSeries1} 
                isAnimationActive={false} 
                legendType='plainline'
                />
              <Line 
                type="monotone" 
                dataKey="series2" 
                stroke="#89C18F" 
                strokeWidth='4px' 
                name='ดาวโชค' 
                dot={false} 
                hide={!activeSeries2} 
                isAnimationActive={false} 
                legendType='none'
                />
              <Line 
                type="monotone" 
                dataKey="series3" 
                stroke="#E46C6C" 
                strokeWidth='4px' 
                name='ดาวท้าทาย' 
                dot={false} 
                hide={!activeSeries3} 
                isAnimationActive={false} 
                legendType='none'
                />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
};
