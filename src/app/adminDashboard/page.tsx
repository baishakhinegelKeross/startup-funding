import BarChart from "@/components/charts/barchart";
import LineChart from "@/components/charts/linechart";
import BubbleChart from "@/components/charts/bubblechart";
import PieChart from "@/components/charts/piechart";
import StackedBarChart from "@/components/charts/stackchart";

export default function AdminDashboard() {
  const barTitle = "Top 5 Fundraisers";
  const fundraisers = [
    "Fundraiser A",
    "Fundraiser B",
    "Fundraiser C",
    "Fundraiser D",
    "Fundraiser E",
  ];
  const fundsRaised = [50000, 42000, 39000, 35000, 30000]; // Dummy data

  const barTitleForInv = "Top 5 Investors";
  const investorData = [
    "Investor A",
    "Investor B",
    "Investor C",
    "Investor D",
    "Investor E",
  ];
  const fundsRaisedForInv = [50000, 42000, 39000, 35000, 30000]; // Dummy data

  const title = "User Activity Over Time";
  const xAxisData = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const seriesData = [100, 200, 180, 240, 220, 260]; // Example data representing monthly active users
  const yAxisName = "Number of Users";
  const seriesName = "Active Users";

  const data = [
    { value: [1, 1000, 20] }, // [duration, revenue, bubble size]
    { value: [2, 2000, 30] },
    { value: [3, 1500, 25] },
    { value: [4, 3000, 40] },
    { value: [5, 2500, 35] },
  ];
  const bubbleLabels = [
    "Campaign 1",
    "Campaign 2",
    "Campaign 3",
    "Campaign 4",
    "Campaign 5",
  ];

  const pieChartData = {
    title: "Dispute Types",
    data: [
      { name: "Chargebacks", value: 45 },
      { name: "Scams", value: 25 },
      { name: "Misrepresentation", value: 30 },
    ],
  };

  const categories = ["Category 1", "Category 2", "Category 3"];
  const stackSeriesData = [
    { name: "Category 1", data: [10, 20, 30], color: "#8061ff" }, // Primary Color
    { name: "Category 2", data: [15, 25, 35], color: "#a292ff" }, // Lighter Shade
    { name: "Category 3", data: [20, 15, 25], color: "#5844cc" }, // Darker Shade
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
          <BarChart
            title={barTitle}
            type="bar"
            labels={fundraisers}
            data={fundsRaised}
            itemColor="#8061ff"
            formatter="${c}"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <LineChart
            title={title}
            xAxisData={xAxisData}
            seriesData={seriesData}
            seriesName={seriesName}
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
          <BubbleChart
            title="Campaign Performance"
            labels={bubbleLabels}
            data={data}
            itemColor="#5470C6"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <BarChart
            title={barTitleForInv}
            type="bar"
            labels={investorData}
            data={fundsRaisedForInv}
            itemColor="#8061ff"
            formatter="${c}"
          />
        </div>
        <div style={{ flex: 1, margin: "10px" }}>
          <StackedBarChart
            title="Violation Categories"
            labels={categories}
            data={stackSeriesData}
          />
        </div>
        s
      </div>
    </div>
  );
}
