'use client';

import React, { useEffect, useState } from "react";
import { Plus, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import CreateCampaignModalNew from "../campaigns/CreateCampaignModalNew";
import { Campaign } from "@/types";
import { useAuth } from "@/lib/auth-context";

interface CampaignCard {
  title: string;
  company: string;
  fundedPercentage: number;
  amount: string;   
  daysLeft: number;
  image_url: string;
  id: string;
  owner: string;
}

const handleCreateCampaign = async (
  campaignData: Omit<Campaign, "_id" | "amount_raised" | "createdAt">
) => {
  const newCampaign: Campaign = {
    ...campaignData,
    //amount_raised: 0,
    createdAt: new Date(),
  };

  console.log('Creating campaign:', newCampaign);

  
  
  try {
    const response = await fetch(
      //`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`,
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/Campaign`,
      {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCampaign),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Network response was not ok: ${errorData}`);
    }

    const result = await response.json();
    console.log("Campaign created successfully:", result);
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    setError(error.message);
  }
};

const CampaignCard: React.FC<{ campaign: CampaignCard }> = ({ campaign }) => {
  const { user } = useAuth();
  const userRole = user?.role;

  return (
    <div className="flex flex-col h-[400px] bg-[#161a35] rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
      <div className="relative h-48 overflow-hidden">
        <img
          src={campaign.image_url}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161a35] to-transparent opacity-50" />
      </div>

      <div className="flex flex-col flex-grow p-6">
        <div className="flex-grow">
          <h3 className="text-white text-xl font-semibold mb-2 line-clamp-2 hover:line-clamp-none transition-all duration-300">
            {campaign.title}
          </h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
            {campaign.story}
          </p>
        </div>

        <div className="space-y-4">
          

          {userRole && (userRole === "admin" || userRole === "fundraiser") && (
            <Link
              href={userRole === "admin" ? `/dashboard/${campaign._id}` : '../detailCampaign/679723880f75d7a5df4b0bb4'}
              className="flex items-center justify-center w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg font-medium transition-all group"
            >
              View Details
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const MyCampaignsNew: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignData, setCampaignData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const userRole = user?.role;

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCampaignData(result);
      } catch (error: any) {
        setError(error instanceof Error ? error.message : String(error));
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Campaigns</h1>
          {userRole === "fundraiser" && (
            <button
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-2.5 rounded-lg transition-all flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} />
              Create New
            </button>
          )}
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {campaignData
            .filter(campaign => campaign.status === 'pending')
            .map(campaign => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
              />
            ))}
        </div>
      </div>

      {isModalOpen && (
        <CreateCampaignModalNew
          onClose={() => setIsModalOpen(false)}
          onCreateCampaign={handleCreateCampaign}
          onBack={() => setIsModalOpen(false)}
          currentUser={user}
        />
      )}
    </>
  );
};

export default MyCampaignsNew;