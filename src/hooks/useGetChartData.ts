import { useState, useEffect } from 'react';
import type { ChartDataPoint } from '@/types/chart';
import type GraphData from '@/types/graph';

interface UseGetChartDataReturn {
  chartData: ChartDataPoint[];
  graphData: GraphData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGetChartData(userEmail?: string): UseGetChartDataReturn {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(userEmail ? `/api/users/${encodeURIComponent(userEmail)}/chartData` : '/api/profile');
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const result = await response.json();
        const data = userEmail ? result : result.chartData;
        
        if (!data) {
          throw new Error('No chart data available');
        }

        const formattedData = data.xAxis.map((x: number, index: number) => ({
          age: x,
          series1: data.series1[index],
          series2: data.series2[index],
          series3: data.series3[index],
        }));
        
        setChartData(formattedData);
        setGraphData(data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userEmail]);

  return { chartData, graphData, isLoading, error };
}