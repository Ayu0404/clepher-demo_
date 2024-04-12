import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Components/Header";
import {
  getNavigation,
  getUser,
  getUserNavigation,
} from "./dummyData";
import Body from "./Components/Body";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [navigation, setNavigation] = useState(getNavigation);
  const [userNavigation, setUserNavigation] = useState(getUserNavigation);
  const [user, setUser] = useState(getUser); 
  const [allData, setAllData] = useState({}); 
  const [stock, setStock] = useState( {
    "symbol": "AAPL",
    "name": "Apple"
  }); 
  const [interval, setIntervalValue] = useState({
    "symbol": "5min",
    "name": "5 minutes"
  });

  const URL = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.symbol}&interval=${interval.symbol}&apikey=${process.env.REACT_APP_AV_KEY}`

  useEffect(() => {
  axios.get(URL)
    .then(res => {
      setAllData(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      setIsLoading(false)
      console.error(err)
  });
  }, [stock, interval])

const updateInterval = (newValue) => setIntervalValue(newValue);
const updateTick = (newValue) => setStock(newValue);

console.log(allData);
console.log(URL);

  return (
    <>
      <Header
        navigation={navigation}
        userNavigation={userNavigation}
        user={user}
        stock={stock}
        updateTick={updateTick}
        interval={interval}
        updateInterval={updateInterval}
      />
      <Body 
        data={allData}
        interval={interval}
      />
    </>
  );
}

export default App;
