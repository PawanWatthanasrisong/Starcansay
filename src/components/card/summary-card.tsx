'use client'
import React, { useRef, useState } from 'react'
import SummaryCardPure from './summary-card-pure';
export default function NewMoonCard({ handleGraphData } : any) {
  const imageRef = useRef<HTMLDivElement | null>(null);
  const xAxis = 44;
  const graphData = handleGraphData;
  const [showDownloadComponent, setShowDownloadComponent] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);

  return (
    <SummaryCardPure name="นะมามิ" status={{name: "กำลัง New Moon", title: "กำลัง New Moon", description: "ดาวชีวิตกำลังอยู่ในช่วงเริ่มต้นไปสู่มุ่งหน้า"}} lifeStar={{shortDescription: "กำลังโหลดรอแปปนึงนะะ :D", subDescription: "กำลังโหลดรอแปปนึงนะะ :D"}} luckStar={{subWording: "กำลังโหลดรอแปปนึงนะะ :D"}} challengeStar={{subWording: "กำลังโหลดรอแปปนึงนะะ :D"}}/>
  )
}
