"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface StackedBarChartProps {
  title: string;
  labels: (string | number)[];
  data: { name: string; data: number[]; color?: string }[];
}

const StackedBarChart = ({ title, labels, data }: StackedBarChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const seriesData = data.map((item) => ({
        name: item.name,
        type: "bar",
        stack: "total",
        data: item.data,
        itemStyle: {
          color: item.color,
        },
      }));

      const option = {
        title: {
          text: title,
          left: "center",
          textStyle: {
            fontSize: 18,
            fontWeight: "bold",
            color: "#fff",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          data: labels,
          axisLabel: {
            interval: 0,
            rotate: 30,
          },
        },
        yAxis: {
          type: "value",
        },
        series: seriesData,
      };

      chartInstance.setOption(option);

      // Cleanup on component unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, [title, labels, data]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default StackedBarChart;
