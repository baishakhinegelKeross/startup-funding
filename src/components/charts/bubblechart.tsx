"use client";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface BubbleChartProps {
  title: string;
  labels: (string | number)[];
  data: { value: [number, number, number] }[]; // Assuming data format [x, y, size]
  itemColor?: string;
}

const BubbleChart = ({ title, labels, data, itemColor }: BubbleChartProps) => {
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
        series: [
          {
            type: "scatter",
            data: data,
            symbolSize: function (val: any[]) {
              return val[2];
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
  }, [title, labels, data, itemColor]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default BubbleChart;
