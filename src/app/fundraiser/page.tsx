import BarChart from "@/components/charts/barchart";
import GaugeChart from "@/components/charts/gaugechart";
import LineChart from "@/components/charts/linechart";
import AreaChart from "@/components/charts/areachart";


export default function Fundraiser() {
  const barTitle = "Top 5 Fundraisers";
  const fundraisers = ['Fundraiser A', 'Fundraiser B', 'Fundraiser C', 'Fundraiser D', 'Fundraiser E'];
  const fundsRaised = [50000, 42000, 39000, 35000, 30000]; // Dummy data

  const gaugeTitle = "Funding Goal Achievement";
  const fundingPercentage = 70; // Example percentage
  const seriesName = "Total Funding Progress";
  const achievedName = "Percentage Achieved";

  const lineTitle = "Funding Trends Over Time";
  const xAxisData = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const seriesData = [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]; // Example data
  const yAxisName = "Funding Amount (in USD)";

  const areaTitle = "Burn Rate vs Runway";
  const burnRateData = [5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000]; // Example burn rate data
  const runwayData = [320000, 300000, 280000, 260000, 240000, 220000, 200000, 180000, 160000, 140000, 120000, 100000]; // Example runway data
  const burnRateName = "Burn Rate";
  const runwayName = "Runway";

  const monthlyFundraisersTitle = "Number of Fundraisers per Month";
  const yAxisData = ['Fundraisers']; // Single row for fundraisers
  const heatmapData = [5, 10, 8, 15, 20, 25, 30, 18, 22, 17, 12, 14].map((value, index) => [index, 0, value]); // Example data

  return (
    <div>
      <h3>Dashboard</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, margin: '10px' }}>
          <BarChart 
            title={barTitle} 
            type="bar" 
            labels={fundraisers} 
            data={fundsRaised} 
            yAxisName="Funds Raised (in USD)" 
            itemColor="#8061ff" 
            formatter="${c}"
          />
        </div>
        <div style={{ flex: 1, margin: '10px' }}>
          <LineChart 
            title={lineTitle} 
            xAxisData={xAxisData} 
            seriesData={seriesData} 
            seriesName="Monthly Funding"
            yAxisName={yAxisName}
          />
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', marginTop: '20px' }}>
        <div style={{ flex: 1, margin: '10px' }}>
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
        <div style={{ flex: 1, margin: '10px' }}>
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








