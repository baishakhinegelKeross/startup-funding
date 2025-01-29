"use client";

import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
  owner:string;
}

const handleCreateCampaign = async (
  campaignData: Omit<Campaign, "_id" | "amount_raised" | "createdAt">
) => {
  const newCampaign: Campaign = {
    //_id: crypto.randomUUID(),
    ...campaignData,
    amount_raised: 0,
    createdAt: new Date(),
  };
  
  
  console.log("Creating campaign:", newCampaign);

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`,
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
    //setCampaigns([...campaigns, result]);
  } catch (error: any) {
    console.error("Error creating campaign:", error);
    setError(error.message);
  }
};



const sampleCampaigns: CampaignCard[] = [
  {
    title: "Next-Gen Software for the Modern Professional",
    company: "MedTech Ventures",
    fundedPercentage: 45,
    amount: "€2.1M",
    id:"679723880f75d7a5df4b0bb4",
    daysLeft: 28,
    imageUrl:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Green Energy Solution",
    company: "EcoTech Solutions",
    fundedPercentage: 65,
    amount: "€1.8M",
    daysLeft: 15,
    id:"679723880f75d7a5df4b0bb4",
    imageUrl:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "AI Learning Platform",
    company: "EduTech Inc",
    fundedPercentage: 80,
    amount: "€3.5M",
    daysLeft: 10,
    id:"679723880f75d7a5df4b0bb4",
    imageUrl:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  },
  {
    title: "Smart City Project",
    company: "Urban Innovations",
    fundedPercentage: 30,
    amount: "€5.0M",
    daysLeft: 45,
    id:"679723880f75d7a5df4b0bb4",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80",
  },
];
//let path = `../detailCampaign/679723880f75d7a5df4b0bb4`;


const CampaignCard: React.FC<{ campaign: CampaignCard }> = ({ campaign }) => {
const { user } = useAuth();
debugger;
const userRole = user?.role;
const [campaigns, setCampaigns] = useState<Campaign[]>([]);

//path = 'http://192.168.3.164:3000/dashboard/100'; 

// if(userRole == "user"){
//   path = '../detailCampaign/679723880f75d7a5df4b0bb4';
// }
//let path2 = '../detailCampaign/679723880f75d7a5df4b0bb4';


  return (
    <div className="bg-[#1a1b23] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48">
        <img
          src={campaign.image_url}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-white text-xl font-semibold mb-2">
          {campaign.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">{campaign.story}</p>

    {userRole == "admin" ?
      <div className="flex justify-between items-center">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
          <Link href={`/dashboard/${campaign._id}`}>
            View Details
          </Link>
        </button>
      </div>
      : userRole == "fundraiser" ? <div className="flex justify-between items-center">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
        <Link href='../detailCampaign/679723880f75d7a5df4b0bb4'>
          View Details
        </Link>
      </button>
    </div> : null
}
      </div>
    </div>
  );
};

const MyCampaignsNew: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignData, setCampaignData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
debugger;
const userRole = user?.role;

// Fetch campaign data when the component mounts
useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      debugger;
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setCampaignData(result);
      console.log(result);
    } catch (error: any) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(String(error));
      }
    } finally {
      
    }
  };

  fetchCampaigns();
}, []);
  return (
    <>
  
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Campaigns</h1>
        {userRole == "fundraiser" && 
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} />
          Create New
        </button>
}
      </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {campaignData
          .filter(campaign => campaign.status === 'pending') // Filter campaigns with status 'approved'
          .map(campaign => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
            />
          ))
        }
          
        </div>
      </div>

      {isModalOpen && (
        <CreateCampaignModalNew
          onClose={() => setIsModalOpen(false)}
          onCreateCampaign={handleCreateCampaign}
          onBack={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default MyCampaignsNew;
