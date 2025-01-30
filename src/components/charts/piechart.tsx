"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface PieChartProps {
  title: string;
  data: { value: number; name: string }[];
  itemColor?: string;
}

const PieChart = ({
  title,

  data,
  itemColor,
}: PieChartProps) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
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
          trigger: "item",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0)",
              },
            },
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
  }, []);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default PieChart;
