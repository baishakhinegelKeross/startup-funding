"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart = ({ title, type = 'bar', labels, data, yAxisName = 'Amount', itemColor = '#0c0a33', formatter = '{c}' }) => {
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
          data: labels,
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            type: type,
            data: data,
            barWidth: '50%',
            itemStyle: {
              color: itemColor,
            },
          },
        ],
      };

      chartInstance.setOption(option);

      // Cleanup on component unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, [title, type, labels, data, yAxisName, itemColor, formatter]);

  return <div ref={chartRef} style={{ height: 400, width: '100%' }} />;
};

export default BarChart;
