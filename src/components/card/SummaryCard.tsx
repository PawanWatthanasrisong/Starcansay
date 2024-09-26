'use client'
import { Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import React from 'react'

export default function SummaryCard() {
  return (
    <div>
        <Card className='w-fit h-full'>
            <CardHeader>
                <CardTitle className='text-center flex flex-col items-center'>
                    <img src="/images/starcansaylogo-31.png" width={300}/>
                    ดวงชีวิตของนะมามิ ในวัย 34 ปี
                </CardTitle>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter className='flex justify-center'>
              <Download />
            </CardFooter>
        </Card>
    </div>
  )
}
