"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface GaugeChartProps {
  title: string;
  percentage: number;
  seriesName?: string;
  achievedName?: string;
  min?: number;
  max?: number;
  color?: string;
}

const GaugeChart = ({
  title,
  percentage,
  seriesName,
  achievedName,
  min,
  max,
  color,
}: GaugeChartProps) => {
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
          formatter: `{a} <br/>{b} : {c}%`,
        },
        series: [
          {
            name: seriesName,
            type: "gauge",
            min: min,
            max: max,
            detail: {
              formatter: "{value}%",
              fontSize: 16,
              color: "#333",
            },
            axisLine: {
              lineStyle: {
                color: [
                  [0.5, "#ff4500"],
                  [0.75, "#ffed00"],
                  [1, color],
                ],
                width: 20,
              },
            },
            data: [{ value: percentage, name: achievedName }],
            splitLine: {
              length: 20,
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
  }, [title, percentage, seriesName, achievedName, min, max, color]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default GaugeChart;
