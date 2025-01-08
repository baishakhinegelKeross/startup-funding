'use client';

import React, { useState } from 'react';

const MyInvestmentPage: React.FC = () => {
  const [investment, setInvestment] = useState({
    campaignTitle: "Eco-Friendly Packaging Startup",
    campaignImage: "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
    investmentAmount: 500, // Amount invested by the user
    totalInvestment: 1200, // Total money raised in the campaign
    goalAmount: 5000, // Target goal for the campaign
    status: "approved", // Set status to 'approved' for testing
    updates: [
      {
        title: "Milestone Reached!",
        description: "We have successfully completed our first production run and have shipped out the first batch of our eco-friendly packaging to our early customers.",
        timestamp: "2025-01-01 10:00 AM",
      },
      {
        title: "New Partnership!",
        description: "We are excited to announce a partnership with a major retailer that will help expand our product distribution across the country.",
        timestamp: "2025-01-05 2:00 PM",
      },
    ], // Updates posted by the campaign founder
  });

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl bg-gray-800">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-6">My Investment in {investment.campaignTitle}</h1>
        
        {/* Campaign Image */}
        <div className="mb-4">
          <img
            src={investment.campaignImage}
            alt="Campaign"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 mt-6">
          {/* Investment Info */}
          <div className="flex justify-between text-lg text-gray-300">
            <div>
              <strong>Investment Amount:</strong> ${investment.investmentAmount}
            </div>
            <div>
              <strong>Total Investment Raised:</strong> ${investment.totalInvestment}
            </div>
            <div>
              <strong>Target Amount:</strong> ${investment.goalAmount}
            </div>
          </div>

          {/* Investment Progress */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white">Investment Progress</h2>
            <div className="bg-gray-600 h-2 rounded-full mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(investment.totalInvestment / investment.goalAmount) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{`${((investment.totalInvestment / investment.goalAmount) * 100).toFixed(1)}% funded`}</p>
          </div>

          {/* Investment Status */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white">Investment Status</h2>
            <p className="text-lg text-gray-300">{investment.status === "approved" ? "Your investment is approved." : "Your investment is pending approval."}</p>
          </div>
        </div>

        {/* Posted Updates */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Campaign Updates</h2>
          {investment.updates.length === 0 ? (
            <p className="text-gray-500">No updates yet.</p>
          ) : (
            investment.updates.map((update, index) => (
              <div key={index} className="bg-gray-700 p-4 rounded-lg shadow-md mt-4">
                <h3 className="text-xl text-gray-300">{update.title}</h3>
                <p className="text-lg text-gray-300">{update.description}</p>
                <p className="text-sm text-gray-500 mt-2">{update.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyInvestmentPage;
