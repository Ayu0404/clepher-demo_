import React from 'react'
import CandlestickChart from './charts/CandlestickChart';

export const Body = ({ data }) => {
  return (
    <CandlestickChart 
        data={data} 
        id={"chartDiv"} 
    />
  )
}

export default Body;
