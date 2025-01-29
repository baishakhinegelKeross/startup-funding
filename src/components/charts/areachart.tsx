"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface AreaChartProps {
  title: string;
  xAxisData: (string | number)[];
  burnRateData: number[];
  runwayData: number[];
  burnRateName?: string;
  runwayName?: string;
}

const AreaChart = ({
  title,
  xAxisData,
  burnRateData,
  runwayData,
  burnRateName,
  runwayName,
}: AreaChartProps) => {
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
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          top: "10%",
          data: [burnRateName, runwayName],
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: burnRateName,
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: burnRateData,
            itemStyle: {
              color: "#ff4500",
            },
          },
          {
            name: runwayName,
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: runwayData,
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
  }, [title, xAxisData, burnRateData, runwayData, burnRateName, runwayName]);

  return <div ref={chartRef} style={{ height: 400, width: "100%" }} />;
};

export default AreaChart;
