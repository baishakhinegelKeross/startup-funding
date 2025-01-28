
import React from 'react';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface CampaignCard {
  title: string;
  company: string;
  fundedPercentage: number;
  amount: string;
  daysLeft: number;
  imageUrl: string;
}

const sampleCampaigns: CampaignCard[] = [
  {
    title: "Smart Health Monitor",
    company: "MedTech Ventures",
    fundedPercentage: 45,
    amount: "€2.1M",
    daysLeft: 28,
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Green Energy Solution",
    company: "EcoTech Solutions",
    fundedPercentage: 65,
    amount: "€1.8M",
    daysLeft: 15,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "AI Learning Platform",
    company: "EduTech Inc",
    fundedPercentage: 80,
    amount: "€3.5M",
    daysLeft: 10,
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
  },
  {
    title: "Smart City Project",
    company: "Urban Innovations",
    fundedPercentage: 30,
    amount: "€5.0M",
    daysLeft: 45,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
  }
];

const CampaignCard: React.FC<{ campaign: CampaignCard }> = ({ campaign }) => {
  return (
    <div className="bg-[#1a1b23] rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative h-48">
        <img 
          src={campaign.imageUrl} 
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-white text-xl font-semibold mb-2">{campaign.title}</h3>
        <p className="text-gray-400 text-sm mb-4">by {campaign.company}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>{campaign.fundedPercentage}% funded</span>
            <span>{campaign.amount}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 rounded-full h-2" 
              style={{ width: `${campaign.fundedPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">{campaign.daysLeft} days left</span>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
            <Link href={'http://192.168.3.164:3000/dashboard/100'}>View Details</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

const MyCampaignsNew: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Campaigns</h1>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors flex items-center gap-2">
          <Plus size={20} />
          Create New
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sampleCampaigns.map((campaign, index) => (
          <CampaignCard key={index} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default MyCampaignsNew;