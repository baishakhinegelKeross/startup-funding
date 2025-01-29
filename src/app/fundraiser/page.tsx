import BarChart from "@/components/charts/barchart";
import GaugeChart from "@/components/charts/gaugechart";
import LineChart from "@/components/charts/linechart";
import AreaChart from "@/components/charts/areachart";
import PieChart from "@/components/charts/piechart";
import StackedBarChart from "@/components/charts/stackchart";

export default function Fundraiser() {
  const gaugeTitle = "Funding Goal Achievement";
  const fundingPercentage = 70; // Example percentage
  const seriesName = "Total Funding Progress";
  const achievedName = "Percentage Achieved";

  const lineTitle = "Funding Trends Over Time";
  const xAxisData = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const seriesData = [
    5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000,
    16000,
  ]; // Example data
  const yAxisName = "Funding Amount (in USD)";

  const areaTitle = "Burn Rate vs Runway";
  const burnRateData = [
    5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000,
    16000,
  ]; // Example burn rate data
  const runwayData = [
    320000, 300000, 280000, 260000, 240000, 220000, 200000, 180000, 160000,
    140000, 120000, 100000,
  ]; // Example runway data
  const burnRateName = "Burn Rate";
  const runwayName = "Runway";

  const pieChartData = {
    title: "Campaign Overview Dashboard",
    data: [
      { value: 12000, name: "Raised" },
      { value: 8000, name: "Remaining" },
    ],
  };

  const donationMethods = ["Credit Card", "Bank Transfer", "Other"];
  const donationAmounts = [1500, 800, 300];

  const categories = ["Facebook", "Twitter", "Instagram", "LinkedIn"]; // Social Media Platforms
  const socialseriesData = [
    { name: "Shares & Engagement", data: [120, 80, 150, 60], color: "#8061ff" }, // Total Shares & Engagement
    {
      name: "Platform Performance",
      data: [200, 150, 220, 100],
      color: "#a292ff",
    }, // Platform Performance
    {
      name: "Donations from Social Media",
      data: [1000, 800, 1200, 450],
      color: "#5844cc",
    }, // Donations from Social Media
  ];

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, margin: "10px" }}>
          <LineChart
            title={lineTitle}
            xAxisData={xAxisData}
            seriesData={seriesData}
            seriesName="Monthly Funding"
            yAxisName={yAxisName}
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <PieChart
            title={pieChartData.title}
            data={pieChartData.data}
            itemColor="#8061ff"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <StackedBarChart
            title="Social Media Impact"
            labels={categories}
            data={socialseriesData}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: 1, margin: "10px" }}>
          <GaugeChart
            title={gaugeTitle}
            percentage={fundingPercentage}
            seriesName={seriesName}
            achievedName={achievedName}
            color="#8061ff"
            min={0}
            max={100}
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <BarChart
            title="Donations by Payment Method"
            labels={donationMethods}
            data={donationAmounts}
            itemColor="#8061ff"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <AreaChart
            title={areaTitle}
            xAxisData={xAxisData}
            burnRateData={burnRateData}
            runwayData={runwayData}
            burnRateName={burnRateName}
            runwayName={runwayName}
          />
        </div>
      </div>
    </div>
  );
}
