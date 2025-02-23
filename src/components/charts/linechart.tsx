"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface LineChartProps {
  title: string;
  xAxisData: (string | number)[];
  seriesData: number[];
  seriesName?: string;
  yAxisName?: string;
}

const LineChart = ({
  title,
  xAxisData,
  seriesData,
  seriesName,
  yAxisName,
}: LineChartProps) => {
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
          trigger: "axis",
        },
        xAxis: {
          type: "category",
          data: xAxisData,
        },
        yAxis: {
          type: "value",
          name: yAxisName,
        },
        series: [
          {
            name: seriesName,
            type: "line",
            data: seriesData,
            itemStyle: {
              color: "#8061ff",
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
  }, [title, xAxisData, seriesData, seriesName, yAxisName]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default LineChart;
