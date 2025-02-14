'use client';

import React, { useState } from 'react';
import { Calendar, Target, Users, ChevronRight } from 'lucide-react';
import { Campaign } from '@/types';
import Link from 'next/link';
import { Badge } from '../ui/badge';

import {getbadgeForCampaign} from '@/app/campaigns/page';

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (campaignId: string) => void;
  apiType?: string; // Add the apiType property
}

export default function CampaignCard({ campaign,apiType, onDonate }: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  console.log('apiType',apiType)

  const getBadgeText = () => {
    switch (apiType) {
      case 'trendingCampaigns':
    
        return 'Trending Now';
      case 'latestCampaigns':
        return 'New Campaign';
      case 'weeklyMoneyRaised':
        return 'Top Raised This Week';
      case 'willBeClosedCampaign':
        return `${campaign.daysLeft} days left`;
      default:
        return ''; // Default fallback
    }
  };



  if (!campaign.amount_raised) {
    campaign.amount_raised = 0;
  }
  if (campaign.current_amount) {
    campaign.amount_raised = campaign.current_amount;
   
  }

  
 // const getCampaignStatus = getbadgeForCampaign(campaign._id)
 // const daysLeft_badge=  getCampaignStatus?getCampaignStatus.badgeInfo : 'n/a'
  //console.log('daysLeft_badge',daysLeft_badge)
  const progress = (campaign.amount_raised / campaign.goal_amount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const path = `../quantmai/detailCampaign/${campaign._id}`;

  // Show the "Done" badge if at least 1% is raised
  const isDone = progress >= 1;

  return (
    <article
      className="relative h-[350px] rounded-xl shadow-xl overflow-hidden bg-[#161a35] transition-all duration-500 cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Static "Done" Badge - Visible if at least 1% funded */}
        <div className="absolute top-2 left-2">
          <Badge className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-md">
           {/* {`${daysLeft_badge} days left`} */}
           {getBadgeText()}
          </Badge>
        </div>
     

      <div
        className="w-full h-[260px] bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
        style={{
          backgroundImage: `url('${campaign.image_url}')`,
        }}
      />

      <div
        className={`absolute w-full p-6 transition-all duration-500 ease-[cubic-bezier(.17,.67,.5,1.03)] bg-[#161a35]/95 backdrop-blur-sm border-t border-white/10
          ${isHovered ? 'transform -translate-y-[260px] h-[310px]' : 'h-[90px]'}`}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="font-bold text-base tracking-wide text-white uppercase max-w-[80%]">
            {campaign.title}
          </h2>
          <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
            <Target className="w-4 h-4 mr-1" />
            Active
          </Badge>
        </div>

        <div className="flex justify-between items-center text-sm text-white/70 mb-3">
          <div className="flex items-center">
            <span className="text-emerald-400 font-semibold">${campaign.amount_raised.toLocaleString()}</span>
            <span className="ml-1">raised</span>
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{daysLeft} days left</span>
          </div>
        </div>

        <div className={`w-full bg-white/10 rounded-full h-2 mb-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div
            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className={`text-white/70 leading-relaxed mb-6 transition-all duration-500 line-clamp-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {campaign.story}
        </p>

        <div className={`absolute bottom-6 left-6 right-6 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Link 
            href={path} 
            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white rounded-lg font-medium transition-all group-hover:shadow-lg"
          >
            View Campaign
            <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
