import React from 'react';
import { Calendar, Target, Users } from 'lucide-react';
import { Campaign } from '@/types';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
  onDonate: (campaignId: string) => void;
}

export default function CampaignCard({ campaign, onDonate }: CampaignCardProps) {
  if(!campaign.amount_raised){
    campaign.amount_raised = 0;
  }
  if(campaign.current_amount){
    console.log(campaign.current_amount);
    campaign.amount_raised = campaign.current_amount;
  }
  
  const progress = (campaign.amount_raised / campaign.goal_amount) * 100;
  const daysLeft = Math.ceil((new Date(campaign.end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  //console.log(campaign);

  const path = `../detailCampaign/${campaign._id}`;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <img
        src={campaign.image_url}
        alt={campaign.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{campaign.story}</p>
        
        <div className="space-y-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-500" />
              <span className="font-medium">
                ${campaign.amount_raised.toLocaleString()} raised of ${campaign.goal_amount.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <span className="font-medium">{daysLeft} days left</span>
            </div>
          </div>
          
          {/* <button
            onClick={() => onDonate(campaign._id)}
            className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            Invest
          </button> */}

          <Link href={path} className="block text-center w-full py-3 px-4 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors">
            Invest
          </Link>

        </div>
      </div>
    </div>
  );
}