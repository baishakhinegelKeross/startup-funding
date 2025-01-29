import BarChart from "@/components/charts/barchart";
import LineChart from "@/components/charts/linechart";
import StackedBarChart from "@/components/charts/stackchart";
import PieChart from "@/components/charts/piechart";
import DonutChart from "@/components/charts/donutchart";
import GaugeChart from "@/components/charts/gaugechart";

export default function Investor() {
  const fundsRaised = [50000, 42000, 39000, 35000, 30000]; // Dummy data
  const campaigns = ["Campaign A", "Campaign B", "Campaign C", "Campaign D"];

  const lineTitle = "Investor Contributions Over Time";
  const xAxisData = [
    "Q1 2023",
    "Q2 2023",
    "Q3 2023",
    "Q4 2023",
    "Q1 2024",
    "Q2 2024",
    "Q3 2024",
    "Q4 2024",
  ];
  const yAxisName = "Contribution Amount";
  const seriesData = [
    5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000,
  ];

  const categories = [
    "Campaign Category A",
    "Campaign Category B",
    "Campaign Category C",
  ]; // Example Campaign Categories
  const socialseriesData = [
    { name: "Active Campaigns", data: [30, 50, 70], color: "#8061ff" }, // Number of Active Campaigns
    { name: "Completed Campaigns", data: [20, 40, 60, 80], color: "#a292ff" }, // Number of Completed Campaigns
  ];

  const pieChartData = {
    title: "Total Withdrawals Per Month",
    data: [
      { value: 5000, name: "January" },
      { value: 7000, name: "February" },
      { value: 6000, name: "March" },
      { value: 8000, name: "April" },
      { value: 7500, name: "May" },
      { value: 9000, name: "June" },
      { value: 8500, name: "July" },
      { value: 9500, name: "August" },
      { value: 10000, name: "September" },
      { value: 11000, name: "October" },
      { value: 12000, name: "November" },
      { value: 13000, name: "December" },
    ],
  };

  const data = [
    { value: 60, name: "Ignored" },
    { value: 40, name: "Responded" },
  ];

  const labels = ["Ignored", "Responded"];
  const colors = ["#8072ff", "#8061e6"];

  const gaugeTitle = "Time Remaining for Expiring Investment Opportunities";
  const fundingPercentage = 70; // Example percentage for urgency level
  const seriesName = "Urgency Level";
  const achievedName = "Time Remaining";
  const color = "#8061ff"; // Your specified color
  const min = 0;
  const max = 100;

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
          <BarChart
            title="Funds Raised by Campaign"
            labels={campaigns}
            data={fundsRaised}
            itemColor="#8061ff"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <LineChart
            title={lineTitle}
            xAxisData={xAxisData}
            seriesData={seriesData}
            seriesName="Quarterly Contribution"
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
          <DonutChart
            title="% of Notifications Ignored vs. Responded"
            labels={labels}
            data={data.map((item) => item.value)}
            colors={colors}
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <StackedBarChart
            title="Active vs. Completed Campaigns"
            labels={categories}
            data={socialseriesData}
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <GaugeChart
            title={gaugeTitle}
            percentage={fundingPercentage}
            seriesName={seriesName}
            achievedName={achievedName}
            color={color}
            min={min}
            max={max}
          />
        </div>
      </div>
    </div>
  );
}
