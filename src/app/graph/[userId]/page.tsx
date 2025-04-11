'use client'
import { useState, useRef, useEffect } from 'react'
import { useUserData } from '@/hooks/useUserData'
import { useParams } from 'next/navigation'
import type GraphData from '@/types/graph'
import LineGraph from '@/components/graph/LineGraph'
import GraphReadBox from '@/components/box/GraphReadBox'
import SummaryCard from '@/components/card/summary-card'
import ShareButtons from '@/components/graph/ShareButtons'
import AgeDropDown from '@/components/dropdown/AgeDropDown'
import SummaryCardPureSkeleton from '@/components/card/summary-card-pure-skeleton'
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link'
import Image from 'next/image'
import { checkAdmin } from '@/lib/auth'
export default function UserGraphPage() {
  const params = useParams()
  const userId = decodeURIComponent(params.userId as string)
  const [pointData, setPointData] = useState<number>(25)
  const [graphData, setGraphData] = useState<GraphData | null>(null)
  const [isGraphLoading, setIsGraphLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { userData, isUserDataLoading } = useUserData(userId)
  
  const summaryCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true)
      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        redirect('/graph');
      }
      setIsLoading(false)
    };
    
    checkAdminStatus();
  }, []);

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
      {/* Admin controls */}
      <div className="w-full flex justify-between items-center p-4 bg-starcansayblue text-white">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Admin View: User Graph for {userId}</h1>
        </div>
        <Link href="/dashboard/admin">
          <Button 
            className="bg-white text-starcansayblue hover:bg-gray-100"
          >
            Back to Admin Dashboard
          </Button>
        </Link>
      </div>
      
      {/* User info section (blue background) */}
      <div className='flex flex-col h-fit bg-starcansayblue justify-center items-center font-body md:flex-row md:items-start w-full md:min-h-screen'>
        <div className='mt-20 md:mt-28 flex flex-col text-white lg:mr-20 md:mr-10 items-center md:items-start'>
          <Image src="/images/sticker-starcansay-web-29-3.png" alt="starcansay sticker" width='253' height='179' className='md:-ml-11'/>
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
          <p className='md:ml-5 text-starcansayblue'>
            <span className='text-5xl font-starcansay'>
              กราฟ 100 ปี ของผู้ใช้ {userId}
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
              onLoadingChange={handleGraphLoadingChange}
              userEmail={userId}
            />
            {!isGraphLoading && (
              <div className='absolute top-4 right-[15%]'>
                <AgeDropDown handlePointData={pointData || 25} onPointData={handlePointData}/>
              </div>
            )}
          </div>

          {/* Graph ReadBox */}
          <div className='mb-5 w-full mx-5'>
            <GraphReadBox handlePointData={pointData || 25} handleGraphData={graphData as GraphData} />
          </div>
        </section>
      </main>
    </div>
  )
} 