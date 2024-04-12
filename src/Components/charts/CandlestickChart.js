import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { cleanChartData } from '../../utilities/chartData'

am4core.useTheme(am4themes_animated);

const CandlestickChart = ({ data, id }) => {
  useEffect(() => {
    let chart = am4core.create(id, am4charts.XYChart);

    chart.data = data && cleanChartData(data['Time Series (5min)']);
    // chart.data = cleanChartData(data[`Time Series ${interval.symbol}`]);

    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd'T'HH:mm:ss.SSSX";


    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Value ($)";

    // Create series
    let series = chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = 'date';
    series.dataFields.valueY = '4. close';
    series.dataFields.openValueY = '1. open';
    series.dataFields.lowValueY = '3. low';
    series.dataFields.highValueY = '2. high';
    series.tooltipText = 'Open: {openValueY.value}\nLow: {lowValueY.value}\nHigh: {highValueY.value}\nClose: {valueY.value}';

    // Add cursor
    chart.cursor = new am4charts.XYCursor();

    // Add scrollbar
    chart.scrollbarX = new am4core.Scrollbar();

    // Clean up on unmount
    return () => {
      chart.dispose();
    };
  }, [data]); 

  return (
    <div id={id} style={{ width: '100%', height: '500px' }}></div>
  );
};

export default CandlestickChart;
