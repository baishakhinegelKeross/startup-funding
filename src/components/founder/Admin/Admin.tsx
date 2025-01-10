"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const Admin = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);
  const stackedBarChartRef = useRef(null);

  useEffect(() => {
    // Line Chart
    const lineChartDom = lineChartRef.current;
    const lineChart = echarts.init(lineChartDom, "dark");
    const lineOption = {
      title: { text: 'Campaign Engagement Over Time' },
      xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
      yAxis: { type: 'value' },
      series: [{ data: [820, 932, 901, 934, 1290, 1330], type: 'line' }]
    };
    lineChart.setOption(lineOption);

    // Bar Chart
    const barChartDom = barChartRef.current;
    const barChart = echarts.init(barChartDom, "dark");
    const barOption = {
      title: { text: 'No of Campaigns per month' },
      xAxis: {
        type: "category",
        data: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        name: "Month",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130,120, 200, 150, 80, 70],
          type: "bar",
        },
      ]
    };
    barChart.setOption(barOption);

    // Pie Chart
    const pieChartDom = pieChartRef.current;
    const pieChart = echarts.init(pieChartDom, "dark");
    const pieOption = {
      title: {  text: "View Contribution by Source",
        left: "center",
        textStyle: { fontSize: 20 },

      },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [
        {
          name: "Contributions",
          type: "pie",
          radius: "50%",
          data: [
            { value: 50000, name: "Individual Investors" },
            { value: 30000, name: "Corporate Sponsors" },
            { value: 20000, name: "Events" },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],

    };
    pieChart.setOption(pieOption);

    // Stacked Bar Chart
const stackedBarChartDom = stackedBarChartRef.current;
const stackedBarChart = echarts.init(stackedBarChartDom, "dark");

const stackedBarOption = {
  title: {
    text: 'Campaign Analytics Dashboard',
    left: "left",
    textStyle: { fontSize: 20 },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
    top: "110%"
,  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
  
  },
  yAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  series: [
    {
      name: 'Direct',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [320, 302, 301, 334, 390, 330, 320]
    },
    {
      name: 'Mail Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Affiliate Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ad',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [150, 212, 201, 154, 190, 330, 410]
    },
    {
      name: 'Search Engine',
      type: 'bar',
      stack: 'total',
      label: {
        show: true
      },
      emphasis: {
        focus: 'series'
      },
      data: [820, 832, 901, 934, 1290, 1330, 1320]
    }
  ]
};

stackedBarChart.setOption(stackedBarOption);

    

    return () => {
      lineChart.dispose();
      barChart.dispose();
      pieChart.dispose();
      stackedBarChart.dispose();
    };
  }, []);

  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full lg:w-1/2 p-4">
        <div ref={lineChartRef} style={{ height: '400px' }}></div>
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <div ref={barChartRef} style={{ height: '400px' }}></div>
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <div ref={pieChartRef} style={{ height: '400px' }}></div>
      </div>
      <div className="w-full lg:w-1/2 p-4">
        <div ref={stackedBarChartRef} style={{ height: '400px' }}></div>
      </div>
    </div>
  );
};

export default Admin;
