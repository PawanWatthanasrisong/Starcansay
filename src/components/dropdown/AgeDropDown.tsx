import React, { useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
interface AgeDropDownProps{
  handlePointData: number,
  onPointData: (data:number) => void;
}

export default function AgeDropDown({ handlePointData, onPointData}: AgeDropDownProps) {
  const [age, setAge] = useState('25');

  useEffect(() => {
    handleAgeChange(handlePointData.toString());
  },[handlePointData])

  const handleAgeChange = (newAge: string) => {
    setAge(newAge);
    onPointData(Number.parseInt(newAge));
  }

  return (
    <div className='flex items-center'>
      <Select onValueChange={handleAgeChange} value={age}>
        <SelectTrigger className="w-fit bg-starcansayblue text-white font-bold font-starcansay text-xl gap-2">
            <SelectValue defaultValue={age}>{age} ปี</SelectValue>
        </SelectTrigger>
        <SelectContent className='bg-starcansayblue text-white font-bold font-starcansay text-xl'>
          {
              Array.from({ length: 99}, (_, i) => {
                  const age = i + 1;
                  return (
                      <SelectItem key={`age-${age}`} value={age.toString()}>
                          {age} ปี
                      </SelectItem>
                  );
              })
          }
        </SelectContent>
        </Select>
    </div>
  )
}
