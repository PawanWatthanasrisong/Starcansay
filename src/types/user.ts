export interface UserData {
  name: string
  validBirthDate: string
  validBirthTime: string
  birthplace: string
  age: number
}

export interface GraphData {
  xAxis: number[]
  series1: number[]
  series2: number[]
  series3: number[]
  slopeSeries1: { x: number; slope: number }[]
  slopeSeries2: { x: number; slope: number }[]
  slopeSeries3: { x: number; slope: number }[]
} 