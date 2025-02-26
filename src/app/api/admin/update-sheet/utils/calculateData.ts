interface StructuredData {
    xAxis: (number | null)[];
    series1: (number | null)[];
    series2: (number | null)[];
    series3: (number | null)[];
}

async function getStructuredData(rows: Array<Array<string | number>>): Promise<StructuredData> {
    const xAxis = [];
    const series1 = [];
    const series2 = [];
    const series3 = [];
    let i = 0;
    while( i < rows.length ){
      xAxis.push(Number.isNaN(rows[i][0]) ? null : Number(rows[i][0]));
      series1.push(Number.isNaN(rows[i][1]) ? null : Number(rows[i][1]));
      series2.push(Number.isNaN(rows[i][2]) ? null : Number(rows[i][2]));
      series3.push(Number.isNaN(rows[i][3]) ? null : Number(rows[i][3] ));
      i++;
    }
    return {
      xAxis,
      series1,
      series2,
      series3
    }
  }

function getCleanData(data: any): any {
    return data.map((item: any) => {
      if (Array.isArray(item)) {
        return getCleanData(item);
      }
      if (item === '#N/A') {
        return null;
      }
      const parsedNumber = Number.parseFloat(item);
      return Number.isNaN(parsedNumber) ? item : parsedNumber;
    });
  }

  
function getMovingAverage(data: (number | null)[], windowSize: number) {
    const result: (number | null)[] = [];
    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        let count = 0;
        for (let j = Math.max(0, i - windowSize); j <= Math.min(data.length - 1, i + windowSize); j++) {
            const value = data[j];
            if (value !== null && value !== undefined && !Number.isNaN(value)) {
                sum += value;
                count++;
            }
        }
        result.push(count > 0 ? Math.round((sum / count) * 100) / 100 : null);
    }
    return result;
}



const getSlope = (data: (number | null)[]) => {
    const firstDerivative = [];
    for(let i = 0; i < data.length; i++){
        let j = i;
        let k = i;
        let slope: number | null = null;
        let dy: number | null = null;
        do {
            while ((j + 1 < data.length && (data[j + 1] !== null && data[j + 1] !== undefined) && slope === 0)){
                j++;
                dy = (data[j] !== null && data[k] !== null) ? data[j] - data[k] : null;
                slope = dy;
            }

            if ((k - 1 > 0 && data[k] !== null) && (slope === 0 || slope === null)){
                k--;
            }
            dy = (data[j] !== null && data[k] !== null) ? data[j] - data[k] : null;
            slope = dy;
        } while(slope === 0);
        
        firstDerivative.push({ x: i, slope });
    }
    return firstDerivative;
}

export { getStructuredData, getCleanData, getMovingAverage, getSlope };
