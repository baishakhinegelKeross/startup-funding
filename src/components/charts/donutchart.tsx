"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface DonutChartProps {
  title: string;
  labels: string[];
  data: number[];
  colors: string[];
}

const DonutChart = ({ title, labels, data, colors }: DonutChartProps) => {
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
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        series: [
          {
            name: title,
            type: "pie",
            radius: ["30%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: "center",
              formatter: "{b}: {d}%",
              emphasis: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: true,
            },
            itemStyle: {
              color: (params) => colors[params.dataIndex % colors.length],
            },
            data: labels.map((label, index) => ({
              value: data[index],
              name: label,
            })),
          },
        ],
      };

      chartInstance.setOption(option);

      // Cleanup on component unmount
      return () => {
        chartInstance.dispose();
      };
    }
  }, [title, labels, data, colors]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default DonutChart;
