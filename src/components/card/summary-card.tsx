'use client'
import React from 'react'
import SummaryCardPure from "./summary-card-pure"
import type GraphData from '@/types/graph';
import LifeStar from '../box/helpers/LifeStarFunction';
import LuckStar from '../box/helpers/LuckStarFunction';
import ChallengeStar from '../box/helpers/ChallengeStarFunction';

interface SummaryCardProps {
  handleGraphData: GraphData | null;
  userData: {
    name: string;
    validBirthDate: string;
    validBirthTime: string;
    birthplace: string;
    age: number;
  }
}

export default function SummaryCard({ handleGraphData, userData }: SummaryCardProps) {
  const xAxis = userData.age; // Default to 0 if age is null
  const graphData = handleGraphData;

  if (!graphData) {
    return null;
  }

  const lifeStar = {
    title: LifeStar(graphData, xAxis).title,
    img_url: LifeStar(graphData, xAxis).img_url,
    shortDescription: LifeStar(graphData, xAxis).shortDescription,
    wording: LifeStar(graphData, xAxis).wording,
    subDescription: LifeStar(graphData, xAxis).subDescription
  }

  const luckStar = {
    subWording: LuckStar(graphData, xAxis).subWording
  }

  const challengeStar = {
    subWording: ChallengeStar(graphData, xAxis).subWording
  }

  const status = {
    name: lifeStar.title,
    title: lifeStar.title,
    description: `ดาวชีวิตกำลังอยู่ใน${lifeStar.wording}`
  }

  return (
    <SummaryCardPure 
      name={userData.name} 
      status={status} 
      lifeStar={lifeStar} 
      luckStar={luckStar} 
      challengeStar={challengeStar}
    />
  )
}
