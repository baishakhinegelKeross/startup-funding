'use client';

import React, { useState } from 'react';

const CampaignDetailsPage: React.FC = () => {
  const [campaign, setCampaign] = useState({
    campaignTitle: "Porro omnis molestia",
    campaignImage: "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
    totalInvestors: 15,
    totalInvestment: 1200, // Total money raised
    goalAmount: 5000, // Target goal for the campaign
    status: "approved", // Set status to 'approved' for testing
  });

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updates, setUpdates] = useState<any[]>([]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  };

  const handleDescChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateDesc(e.target.value);
  };

  const handlePostUpdate = () => {
    if (updateTitle.trim() && updateDesc.trim()) {
      const newUpdate = {
        title: updateTitle,
        description: updateDesc,
        timestamp: new Date().toLocaleString(),
      };
      setUpdates([newUpdate, ...updates]);
      setUpdateTitle('');
      setUpdateDesc('');
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-2xl bg-gray-800">
        <h1 className="text-3xl font-extrabold text-indigo-400 mb-6">{campaign.campaignTitle}</h1>
        <div className="mb-4">
          <img
            src={campaign.campaignImage}
            alt="Campaign"
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6 mt-6">
          {/* Investors Info */}
          <div className="flex justify-between text-lg text-gray-300">
            <div>
              <strong>Total Investors:</strong> {campaign.totalInvestors}
            </div>
            <div>
              <strong>Total Investment:</strong> ${campaign.totalInvestment}
            </div>
            <div>
              <strong>Target Amount:</strong> ${campaign.goalAmount}
            </div>
          </div>

          {/* Investment Progress */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-white">Investment Progress</h2>
            <div className="bg-gray-600 h-2 rounded-full mt-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{
                  width: `${(campaign.totalInvestment / campaign.goalAmount) * 100}%`,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{`${((campaign.totalInvestment / campaign.goalAmount) * 100).toFixed(1)}% funded`}</p>
          </div>
        </div>

        {/* Post Progress Update */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-white">Post Progress Update</h2>
          <div>
            <input
              type="text"
              value={updateTitle}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg mt-4 bg-gray-700 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Update Title"
            />
          </div>
          <div>
            <input
              type="text"
              value={updateDesc}
              onChange={handleDescChange}
              className="w-full px-4 py-2 border border-gray-600 rounded-lg mt-4 bg-gray-700 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Write your update description..."
            />
          </div>
          <button
            onClick={handlePostUpdate}
            className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          >
            Post Update
          </button>
        </div>

        {/* Posted Updates */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Posted Updates</h2>
          {updates.length === 0 ? (
            <p className="text-gray-500">No updates yet.</p>
          ) : (
            updates.map((update, index) => (
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

export default CampaignDetailsPage;
