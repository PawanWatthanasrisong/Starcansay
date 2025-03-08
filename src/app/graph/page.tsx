'use client'
import { useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useUserData } from '@/hooks/useUserData'
import type GraphData from '@/types/graph'
import LineGraph from '@/components/graph/LineGraph'
import GraphReadBox from '@/components/box/GraphReadBox'
import SummaryCard from '@/components/card/summary-card'
import ShareButtons from '@/components/graph/ShareButtons'
import AgeDropDown from '@/components/dropdown/AgeDropDown'
import { Loader2 } from 'lucide-react'
import SummaryCardPureSkeleton from '@/components/card/summary-card-pure-skeleton'

export default function Page() {
  const { session } = useAuth()
  const { userData, isUserDataLoading } = useUserData(session?.user?.email)
  
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
      <div className='flex flex-col h-fit bg-starcansayblue justify-center items-center font-body md:flex-row md:items-start w-full md:min-h-screen'>
        <div className='mt-20 md:mt-28 flex flex-col text-white lg:mr-20 md:mr-10 items-center md:items-start'>
          <img src="https://storage.cloud.google.com/starcansay/img/sticker%20starcansay%20web-29%203.png" alt="starcansay sticker" width='253' height='179' className='md:-ml-11'/>
          {userData?.name && userData?.age ? (
            <p className='text-7xl -ml-2 mt-5 font-starcansay text-starcansaypink text-center md:text-left'>ชีวิต {userData.name} <br/> ในวัย {userData.age} ปี</p>
          ) : (
            <p className='text-7xl -ml-2 mt-5 font-starcansay text-starcansaypink text-center md:text-left'>กำลังโหลดข้อมูล...</p>
          )}
          <br/>
          <p className='text-2xl text-center md:text-left font-thai'>
            {userData?.validBirthDate ? `เกิดวันที่ ${userData.validBirthDate}` : 'กำลังโหลดข้อมูล...'} <br/>
            {userData?.validBirthTime ? `เวลาเกิด ${userData.validBirthTime}` : 'กำลังโหลดข้อมูล...'} <br/>
            {userData?.birthplace ? `สถานที่เกิด ${userData.birthplace}` : 'กำลังโหลดข้อมูล...'}
          </p>
        </div>
        <div className='flex flex-col justify-center mx-5 mt-5 md:mt-20 mb-10 max-h-full w-[387px]'>
            <div ref={summaryCardRef}>
              {isUserDataLoading || isGraphLoading ? (
                <SummaryCardPureSkeleton />
              ) : (
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
              )}
            </div>
          <ShareButtons 
            summaryCardRef={summaryCardRef}
            isDataLoading={isUserDataLoading || isGraphLoading}
            hasData={!!graphData && !!userData}
          />
        </div>
      </div>
      {/* Main Content */}
      <main className='flex flex-col items-center font-body'>
        {/* Header with Title and Dropdown */}
        <div className='flex items-center mt-10 justify-center md:justify-between w-3/4'>
          <p className='md:ml-5  text-starcansayblue'>
            <span className='text-5xl font-starcansay'>
              นี่คือกราฟ 100 ปี ของคุณ !
            </span>
            <br/>
            <span className='text-2xl font-thai'>
              สามารถขยับเพื่อดูว่าแต่ละช่วงเป็นยังไงได้เลย
            </span>
          </p>
        </div>

        {/* Graph and ReadBox Section */}
          <section className='flex flex-col items-center mt-10 w-full'>
            <div className='relative w-full'>
              <LineGraph 
                onPointData={handlePointData} 
                onGraphData={handleGraphData} 
                handlePointData={pointData || 25}
                username={session?.user?.email || ''}
                onLoadingChange={handleGraphLoadingChange}
              />
              {!isGraphLoading && (
                <div className='absolute top-4 right-[15%]'>
                  <AgeDropDown handlePointData={pointData || 25} onPointData={handlePointData}/>
                </div>
              )}
            </div>

            {/* Graph ReadBox */}
            <div className='mb-5 w-full mx-5'>
              <GraphReadBox handlePointData={pointData || '25'} handleGraphData={graphData as GraphData} />
            </div>
          </section>
      </main>
    </div>
  )
}
