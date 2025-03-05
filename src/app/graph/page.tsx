'use client'
import { useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUserData } from '@/hooks/useUserData'
import type { GraphData } from '@/types/user'
import LineGraph from '@/components/graph/LineGraph'
import GraphReadBox from '@/components/box/GraphReadBox'
import SummaryCard from '@/components/card/summary-card'
import ShareButtons from '@/components/graph/ShareButtons'
import AgeDropDown from '@/components/dropdown/AgeDropDown'
import { Loader2 } from 'lucide-react'

export default function Page() {
  const { session } = useAuth()
  const { userData, isUserDataLoading } = useUserData(session?.user?.id)
  
  const [pointData, setPointData] = useState<number>(25)
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [isGraphLoading, setIsGraphLoading] = useState(false)
  
  const summaryCardRef = useRef<HTMLDivElement>(null)

  const handlePointData = (data: number) => {
    setPointData(data)
  }

  const handleGraphData = (data: GraphData) => {
    setGraphData(data)
  }

  const handleGraphLoadingChange = (isLoading: boolean) => {
    setIsGraphLoading(isLoading)
  }

  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row items-center justify-center h-full bg-starcansayblue'>
        <div className='flex flex-col items-center justify-center mx-5 mt-5 md:mt-28 mb-10 max-h-full aspect-[1080/1920]'>
          {isUserDataLoading || isGraphLoading ? (
            <div className="flex items-center justify-center h-[500px] w-full">
              <Loader2 className="h-8 w-8 animate-spin text-white" />
            </div>
          ) : (
            <div ref={summaryCardRef}>
              <SummaryCard 
                handleGraphData={graphData as GraphData} 
                userData={userData || {
                  name: "",
                  validBirthDate: "",
                  validBirthTime: "",
                  birthplace: "",
                  age: 0
                }} 
              />
            </div>
          )}
          <ShareButtons 
            summaryCardRef={summaryCardRef}
            isDataLoading={isUserDataLoading || isGraphLoading}
            hasData={!!graphData && !!userData}
          />
        </div>
        <div className='flex flex-col'>
          <div className='w-full sm:w-[593.2px] md:max-w-[1023px] lg:min-w-[1023px] bg-white rounded-2xl p-3 m-3'>
            <div className='flex items-center justify-center relative'>
              <div className='flex items-center justify-center w-full'>
                <AgeDropDown handlePointData={pointData} onPointData={handlePointData} />
              </div>
              <div className="flex justify-center w-3/5">
                <h1 className='text-starcansaypink font-thai font-semibold text-3xl'>กราฟชีวิต</h1>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <LineGraph 
                onPointData={handlePointData} 
                onGraphData={handleGraphData} 
                handlePointData={pointData} 
                username={session?.user?.id || ''}
                onLoadingChange={handleGraphLoadingChange}
              />
            </div>
          </div>
          <div>
            <GraphReadBox handlePointData={pointData} handleGraphData={graphData} />
          </div>
        </div>
      </div>
    </div>
  )
}
