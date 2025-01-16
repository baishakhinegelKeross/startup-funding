"use client";

import React, { useEffect, useState } from 'react';
import CampaignCard from '@/components/CampaignCard/campaignCard';
import DonationModal from './DonationModal'; // Import the DonationModal
import { CreateCampaignModal } from './CreateCampaignModal';
import { Campaign } from '@/types';
import { Button } from '@/components/ui/button';

// You can define an interface for type safety if desired
// interface Campaign {
//   _id: string;
//   image?: string;
//   title: string;
//   status: string;
//   progress: number;
//   fundsRaised: number;
//   targetAmount: number;
//   investors: number;
//   daysRemaining: number;
// }



const MyCampaignPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignData, setCampaignData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDonate = (campaignId: string) => {
    setSelectedCampaignId(campaignId);
    setIsDonationModalOpen(true);
  };

  // Fetch campaign data when the component mounts
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('http://192.168.3.7:8080/api/fundraiser');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setCampaignData(result);
        console.log(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [campaigns]);

  const handleCreateCampaign = async (campaignData: Omit<Campaign, '_id' | 'amount_raised' | 'createdAt'>) => {
    const newCampaign: Campaign = {
      ...campaignData,
      amount_raised: 0,
      createdAt: new Date(),
    };

    console.log('Creating campaign:', newCampaign);

    try {
      const response = await fetch('http://192.168.3.7:8080/api/fundraiser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampaign),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Network response was not ok: ${errorData}`);
      }

      const result = await response.json();
      console.log('Campaign created successfully:', result);
      setCampaigns([...campaigns, result]);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setError(error.message);
    }
  };

  const handleCompleteDonation = async (amount: number, donorName: string, message: string) => {
    console.log('Processing donation:', { amount, donorName, message });

    // try {
    //   const response = await fetch('http://192.168.3.7:8080/api/fundraiser/campaign/contribution', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       fundraiserId: selectedCampaignId,
    //       amount,
    //       donorName,
    //       message
    //     })
    //   });

    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const result = await response.json();
    //   console.log('Donation successful:', result);
    // } catch (error) {
    //   console.error('Error processing donation:', error);
    //   setError(error.message);
    // }

    setSelectedCampaignId(null);
  };

  if (loading) {
    return (
      <div className="p-10 pt-20">
        <h2 className="text-xl md:text-4xl">Loading campaigns...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 pt-20">
        <h2 className="text-xl md:text-4xl text-red-500">
          Error fetching campaigns: {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="p-10 pt-20">
      <div className='flex justify-center gap-10 '>
        <h2 className="text-xl md:text-4xl">My Campaigns</h2>
        <Button
        variant={"profilebtn"}
          onClick={() => setIsModalOpen(true)}
          className="cta  text-white py-2 px-4 rounded"
        >
          Start a Campaign
        </Button>
      </div>


      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-7">
        {/* {campaignData.map((campaign: any, index: number) => (
          <CampaignCard key={campaign._id} campaign={campaign} index={index} />
        ))} */}

        {campaignData.map((campaign) => (
          <CampaignCard
            key={campaign._id}
            campaign={campaign}
            onDonate={handleDonate}
          />
        ))}
      </div>
      {isModalOpen && (
        <CreateCampaignModal
          onClose={() => setIsModalOpen(false)}
          onCreateCampaign={handleCreateCampaign}
        />
      )}
      {isDonationModalOpen && (
        <DonationModal
          campaignId={selectedCampaignId!}
          onClose={() => setIsDonationModalOpen(false)}
          onDonate={handleCompleteDonation} // Pass the handleDonationSubmit function
        />
      )}
    </div>
  );
};

export default MyCampaignPage;
