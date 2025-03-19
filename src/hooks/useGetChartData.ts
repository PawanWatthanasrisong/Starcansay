import { useState, useEffect } from 'react';
import type GraphData from '@/types/graph';

interface ChartDataPoint {
  age: number;
  series1: number;
  series2: number;
  series3: number;
}

interface UseGetChartDataReturn {
  chartData: ChartDataPoint[];
  graphData: GraphData | null;
  isLoading: boolean;
  error: Error | null;
}

export function useGetChartData(
  username: string | undefined
): UseGetChartDataReturn {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!username) return;

      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`/api/users/${encodeURIComponent(username)}/chartData`);
        if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

        const result = await response.json();
        const formattedData = result.xAxis.map((x: number, index: number) => ({
          age: x,
          series1: result.series1[index],
          series2: result.series2[index],
          series3: result.series3[index],
        }));
        
        setChartData(formattedData);
        setGraphData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setError(error instanceof Error ? error : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username]);

  return { chartData, graphData, isLoading, error };
}