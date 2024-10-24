import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface AgeDropDownProps{
  handlePointData: string,
  onPointData: (data:any) => void;
}

export default function AgeDropDown({ handlePointData, onPointData}: AgeDropDownProps) {
  const [age, setAge] = useState('25');

  useEffect(() => {
    setAge(handlePointData);
  },[handlePointData])

  return (
    <div className='flex items-center'>
        <div>
            ณ อายุ {handlePointData}
        </div>
      <Select onValueChange={setAge}>
        <SelectTrigger className="w-fit">
            <SelectValue placeholder="25" />
        </SelectTrigger>
        <SelectContent>
        {
            Array.from({ length: 101}, (_, i) => (
                <SelectItem key={i} value={i.toString()}>
                    {i}
                </SelectItem>
            ))
        }
        </SelectContent>
        </Select>
        <div>
            ปี
        </div>
    </div>
  )
}
