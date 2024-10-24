import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Download, Share2 } from 'lucide-react'
import LifeStar from '../box/helpers/LifeStarFunction'
import LuckStar from '../box/helpers/LuckStarFunction'
import ChallengeStar from '../box/helpers/ChallengeStarFunction'

export default function SummayCardForDownload({ handleGraphData } : any) {
    const graphData = handleGraphData;
    const xAxis = 34;
  return (
    <div>
        <Card className='flex flex-col w-full h-full rounded-3xl'>
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <img src="/images/starcansaylogo-31.png" width={300}/>
                    <p className='text-xl md:text-lg'>
                      ดวงชีวิตของนะมามิ ในวัย 34 ปี
                    </p>
                </CardTitle>
            </CardHeader>
            <CardContent className='flex flex-grow flex-col justify-evenly w-full text-xs'>
              <b>คำอธิบายชีวิต</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
                <p>
                { graphData? LifeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
              <b>คำอธิบายโชค</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
                <p>
                { graphData? LuckStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
              <b>คำอธิบายความท้าทาย</b>
              <div className='bg-starcansaypink rounded-lg border-8 border-starcansaypink'>
                <p>
                { graphData? ChallengeStar(graphData, xAxis)?.description : 'กำลังโหลดรอแปปนึงนะะ :D'}
                </p>
              </div>
            </CardContent>
        </Card>
    </div>
  )
}
