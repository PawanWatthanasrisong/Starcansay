'use client'
import { useCallback, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import LifeStar from '../box/helpers/LifeStarFunction';
import type { CategoricalChartState } from 'recharts/types/chart/types';
import type GraphData from '@/types/graph';
import { useGetChartData } from '@/hooks/useGetChartData';

interface LineGraphProps {
  onPointData: (data: number) => void;
  onGraphData: (data: GraphData) => void;
  handlePointData: number;
  username: string;
  onLoadingChange?: (isLoading: boolean) => void;
}

interface payLoad {
  age: number;
  series1: number;
  series2: number;
  series3: number;
}

interface activePayload {
  name: string;
  dataKey: string;
  payload: payLoad;
  color: string;
}

interface TooltipData {
  activeTooltipIndex: number;
  activePayload: activePayload[];
}

export default function LineGraph({ onPointData, onGraphData, handlePointData, username, onLoadingChange }: LineGraphProps) {
  const { chartData, graphData, isLoading } = useGetChartData(username);
  const [tooltipData, setTooltipData] = useState<TooltipData | null>(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [graphHeight, setGraphHeight] = useState<number>(400);
  const [graphWidth, setGraphWidth] = useState<string>('100%');

  useEffect(() => {
    if (graphData) {
      onGraphData(graphData);
    }
  }, [graphData, onGraphData]);

  useEffect(() => {
    if (onLoadingChange) {
      onLoadingChange(isLoading);
    }
  }, [isLoading, onLoadingChange]);

  const handleClick = (data: CategoricalChartState) => {
    if (data.activeTooltipIndex !== undefined && data.activePayload) { // Check for undefined and ensure activePayload is defined
      const parsedData: TooltipData = {
        activeTooltipIndex: data.activeTooltipIndex,
        activePayload: data.activePayload.map(({ name, dataKey, payload, color }) => ({ name, dataKey, payload, color })), // Filtered properties
      }
      setTooltipData(parsedData);
      setIsClicked(true);
      onPointData(data.activeTooltipIndex);
    }
  }

  useEffect(() => {
    const pointData = {
      activeTooltipIndex: handlePointData,
      activePayload: []
    }
    setTooltipData(pointData);
    setIsClicked(true);
  }, [handlePointData]);

  const handleMouseLeave = () => {
    setIsActive(false);
    if (!isClicked) {  // Reset only if not clicked
      setTooltipData(null);
    }
  };

  const handleMouseEnter = (data: { activeTooltipIndex: number | undefined }) => { // Specify the type
    setIsActive(true);
    if (!isClicked) {  // Only update data if not clicked
      setTooltipData({ activeTooltipIndex: data.activeTooltipIndex ?? -1, activePayload: [] });
    }
  };

  const entrySwitch = (name: string, age: number) => {
    let result: string | undefined; // Specify the type
    if (!graphData) return '';
    
    switch (name) {
      case 'ดาวชีวิต':
        result = LifeStar(graphData, age).wording;
        break;
      case 'ดาวโชค':
        result = LuckStar(graphData, age).wording;
        break;
      case 'ดาวท้าทาย':
        result = ChallengeStar(graphData, age).wording;
        break;
    }
    return result;  
  }

  const CustomTooltip = ({ payload }: { payload: activePayload[] }) => { // Specify the type
    if (payload.length !== 0) {
      return (
        <div className="customized-tooltip-content bg-white border-[1px] rounded-sm border-zinc-400 shadow-lg">
          <div className='m-3'>
            <p className="total">ณ อายุ {payload[0].payload.age} ปี</p>
            <ul className="list">
              {payload.map((entry, index) => (
                <li key={`item-${entry.name}-${index}`} style={{ color: entry.color }}> {/* Changed key to avoid using index */}
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
    setWidth(window.innerWidth);
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (width >= 768) {
      setGraphHeight(400);
      setGraphWidth('100%');
    } else {
      setGraphHeight(200);
      setGraphWidth('100%');
    }
  }, [width]);

  if (isLoading) {
    return (
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
              onClick={(event) => handleClick(event)}
              onMouseMove={(event) => handleMouseEnter({ activeTooltipIndex: event.activeTooltipIndex })}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis 
                dataKey='age'
                name='อายุ'
                stroke="#4E6AB3"
                axisLine={{ strokeWidth: 2 }}
                tickLine={{ strokeWidth: 2 }}
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
              <Tooltip content={<CustomTooltip payload={tooltipData?.activePayload ?? []} />} active={isActive} cursor={{ stroke: '#F4AACA', strokeWidth: 4 }} />
              <CartesianGrid strokeDasharray="0 0" className='bg-white' horizontal={false} horizontalPoints={[0, 150]} stroke='white' strokeWidth={2} />
              <ReferenceLine x={tooltipData?.activeTooltipIndex ?? -1} stroke="#F4AACA" strokeWidth={4} opacity='100%' />
              <Line 
                type="monotone" 
                dataKey="series1" 
                stroke="#4E6AB3" 
                strokeWidth='4px' 
                name='ดาวชีวิต' 
                dot={false} 
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
