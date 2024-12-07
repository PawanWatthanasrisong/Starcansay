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
    console.log(handlePointData);
    handleAgeChange(handlePointData);
  },[handlePointData])

  const handleAgeChange = (newAge: string) => {
    setAge(newAge);
    onPointData(newAge);
  }

  return (
    <div className='flex items-center'>
      <Select onValueChange={handleAgeChange} value={age}>
        <SelectTrigger className="w-fit">
            <SelectValue placeholder="25" />
        </SelectTrigger>
        <SelectContent>
          {
              Array.from({ length: 99}, (_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} ปี
                  </SelectItem>
              ))
          }
        </SelectContent>
        </Select>
    </div>
  )
}
