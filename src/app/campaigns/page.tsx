"use client";

import React from 'react';
import CampaignCard from '@/components/CampaignCard/campaignCard';


class Campaign {
  id: number;
  image: string;
  title: string;
  status: string;
  progress: number;
  fundsRaised: number;
  targetAmount: number;
  investors: number;
  daysRemaining: number;

  constructor(
    id: number,
    image: string,
    title: string,
    status: string,
    progress: number,
    fundsRaised: number,
    targetAmount: number,
    investors: number,
    daysRemaining: number
  ) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.status = status;
    this.progress = progress;
    this.fundsRaised = fundsRaised;
    this.targetAmount = targetAmount;
    this.investors = investors;
    this.daysRemaining = daysRemaining;
  }
}

const MyCampaignPage: React.FC = () => {
  const campaignData: Campaign[] = [
    new Campaign(
      1,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "Eco-Friendly Packaging Startup",
      "Active",
      60,
      60000,
      100000,
      45,
      20
    ),
    new Campaign(
      2,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "AI-Based Health Diagnostics",
      "Active",
      40,
      40000,
      100000,
      30,
      25
    ),
    new Campaign(
      3,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "Sustainable Fashion Brand",
      "Completed",
      100,
      100000,
      100000,
      70,
      0
    ),
    new Campaign(
      4,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "Renewable Energy Solutions",
      "Active",
      70,
      70000,
      100000,
      50,
      10
    ),
    new Campaign(
      5,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "EdTech Platform for Remote Learning",
      "Active",
      80,
      80000,
      100000,
      60,
      15
    ),
    new Campaign(
      6,
      "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
      "Organic Skincare Products",
      "Active",
      50,
      50000,
      100000,
      35,
      18
    )
  ];


  return (
    <div className="p-10 pt-20">
      <h2 className="text-xl md:text-4xl">My Campaigns</h2>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-7">
        {campaignData.map((campaign, index) => (
          <CampaignCard key={campaign.id} campaign={campaign} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MyCampaignPage;
