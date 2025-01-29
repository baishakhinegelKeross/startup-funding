'use client'

import React, { useState } from 'react';
import Link from 'next/link';

// Sample campaign data for demonstration
const campaigns = [
  {
    id: 1,
    title: 'Eco-Friendly Packaging Startup',
    imageUrl: 'https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=',
    progress: 60, // Progress in percentage
  },
  {
    id: 2,
    title: 'Tech Start-Up A',
    imageUrl: 'https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=',
    progress: 75,
  },
  {
    id: 3,
    title: 'Green Energy Initiative',
    imageUrl: 'https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=',
    progress: 40,
  },
];

const MyInvestments: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">My Investments</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="bg-white text-gray-800 p-4 rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition-all duration-300"
          >
            <img
              src={campaign.imageUrl}
              alt={campaign.title}
              className="w-full h-40 object-cover rounded-md"
            />
            <h2 className="text-xl text-gray-800 font-bold mt-4">{campaign.title}</h2>
            <div className="mt-2">
              <span className="text-gray-400">Progress: </span>
              <span className="font-semibold text-green-400">{campaign.progress}%</span>
            </div>
            {/* Link to the campaign's detailed page */}
            <Link href={`/my-investment/${campaign.id}`} className="mt-4 inline-block text-blue-500">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyInvestments;
