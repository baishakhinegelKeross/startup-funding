// src/components/charts/LineChart.js
"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const LineChart = ({ title, xAxisData, seriesData, seriesName = 'Funding Amount', yAxisName = 'Funding Amount (in USD)' }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const option = {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: xAxisData,
        },
        yAxis: {
          type: 'value',
          
        },
        series: [
          {
            name: seriesName,
            type: 'line',
            data: seriesData,
          },
        ],
      };

      chartInstance.setOption(option);

      // Cleanup on component unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, [title, xAxisData, seriesData, seriesName, yAxisName]);

  return <div ref={chartRef} style={{ height: 400, width: '100%' }} />;
};

export default LineChart;
