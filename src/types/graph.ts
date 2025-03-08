interface GraphData {
    xAxis: number[]
    series1: number[]
    series2: number[]
    series3: number[]
    slopeSeries1: { x: number; slope: number }[]
    slopeSeries2: { x: number; slope: number }[]
    slopeSeries3: { x: number; slope: number }[]
}

export default GraphData;