import React, { useState } from 'react';
import { Calendar, Target, Users, ChevronRight } from 'lucide-react';
import { Campaign } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/button';


interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (campaignId: string) => void;
}

export default function CampaignCard({ campaign, onDonate }: CampaignCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (!campaign.amount_raised) {
    campaign.amount_raised = 0;
  }
  if (campaign.current_amount) {
    campaign.amount_raised = campaign.current_amount;
  }

  const progress = (campaign.amount_raised / campaign.goal_amount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  const path = `../detailCampaign/${campaign._id}`;

  return (
    <article
      className="relative  h-[350px] rounded-[3px] shadow-md overflow-hidden bg-indigo-50 transition-transform duration-500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-[260px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${campaign.image_url}')`
        }}
      />

      <div
        className={`absolute w-full bg-indigo-50 p-6 transition-all duration-500 ease-[cubic-bezier(.17,.67,.5,1.03)] ${isHovered ? 'transform -translate-y-[260px]' : ''
          }`}
      >
        <div className="flex justify-between items-center mb-2.5">
          <h2 className="font-black text-base tracking-[3px] text-[#152536] uppercase mb-7">
            {campaign.title}
          </h2>
          <Target className="w-6 h-6 text-[#152536]" />
        </div>

        <div className="flex justify-between text-sm uppercase text-[#152536]/70 mb-2.5">
          <span>${campaign.amount_raised.toLocaleString()} raised</span>
          <span>{daysLeft} days left</span>
        </div>

        <div className={`w-full bg-gray-200 rounded-full h-2 mb-4 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          <div
            className="bg-[#4e958b] h-2 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <p className={`font-serif leading-8 text-[0.95rem] text-[#152536]/70 mb-16 transition-opacity duration-500 line-clamp-3 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          {campaign.story}
        </p>

        <div className={`absolute bottom-0 left-0 w-full p-5 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
          
          <Link href={path} className="block text-center w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            View
          </Link>
          
          {/*<Button
            variant={"profilebtn"}
            onClick={() => onDonate(campaign._id)}
            className="flex items-center  text-sm uppercase tracking-wider mb-2 "
          >
            Invest Now
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>*/}

        </div>
      </div>
    </article>
  );
}