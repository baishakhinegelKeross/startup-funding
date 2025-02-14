'use client';

import React, { useEffect, useState, useRef } from 'react';
import CampaignCard from '@/components/CampaignCard/campaignCard';
import DonationModal from './DonationModal';
import CreateCampaignModalNew from './CreateCampaignModalNew';
import { Campaign } from '@/types';
import { Clock, ChevronLeft, ChevronRight, TrendingUp, Timer } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
const MyCampaignPage: React.FC = () => {
  // --- Latest Campaigns State ---
  const [campaignData, setCampaignData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 4;

  // --- Hot Campaigns State ---
  const [hotCampaignData, setHotCampaignData] = useState<Campaign[]>([]);
  const [hotLoading, setHotLoading] = useState(true);
  const [hotError, setHotError] = useState<string | null>(null);
  const [hotPage, setHotPage] = useState(1);

  // --- Most Raised This Week Campaigns State ---
  const [mostRaisedCampaignData, setMostRaisedCampaignData] = useState<Campaign[]>([]);
  const [mostRaisedLoading, setMostRaisedLoading] = useState(true);
  const [mostRaisedError, setMostRaisedError] = useState<string | null>(null);
  const [mostRaisedPage, setMostRaisedPage] = useState(1);

  // --- Closing Soon Campaigns State ---
  const [closingSoonCampaignData, setClosingSoonCampaignData] = useState<Campaign[]>([]);
  const [closingSoonLoading, setClosingSoonLoading] = useState(true);
  const [closingSoonError, setClosingSoonError] = useState<string | null>(null);
  const [closingSoonPage, setClosingSoonPage] = useState(1);

  // --- Recommended Campaigns State ---
  const [recommendedCampaignData, setRecommendedCampaignData] = useState<Campaign[]>([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [recommendedError, setRecommendedError] = useState<string | null>(null);
  const [recommendedPage, setRecommendedPage] = useState(1);
  const { user } = useAuth(); // checking whether user is logged in or not 
  // --- Modal & Donation State (shared) ---
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Refs for Carousel Containers ---
  const scrollRef = useRef<HTMLDivElement>(null); // For Latest Campaigns
  const hotScrollRef = useRef<HTMLDivElement>(null); // For Hot Campaigns
  const mostRaisedScrollRef = useRef<HTMLDivElement>(null); // For Most Raised This Week
  const closingSoonScrollRef = useRef<HTMLDivElement>(null); // For Closing Soon
  const recommendedScrollRef = useRef<HTMLDivElement>(null); // For Recommended Campaigns

  // --- Fetch Latest Campaigns ---
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/campaigns/fresh?page=${page}&limit=${limit}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching campaigns: ${errorText}`);
        }
        const result = await response.json();
        setCampaignData(result.latestCampaigns || []);
      } catch (err: any) {
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [page, limit]);

  // Reset Latest Campaigns carousel scroll when new data loads
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, [campaignData]);

  // --- Fetch Hot Campaigns ---
  useEffect(() => {
    const fetchHotCampaigns = async () => {
      setHotLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/campaigns/hot?page=${hotPage}&limit=${limit}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching hot campaigns: ${errorText}`);
        }
        const result = await response.json();
        setHotCampaignData(result.hotCampaigns || []);
      } catch (err: any) {
        setHotError(err.message || String(err));
      } finally {
        setHotLoading(false);
      }
    };

    fetchHotCampaigns();
  }, [hotPage, limit]);

  // Reset Hot Campaigns carousel scroll when new data loads
  useEffect(() => {
    if (hotScrollRef.current) {
      hotScrollRef.current.scrollLeft = 0;
    }
  }, [hotCampaignData]);

  // --- Fetch Most Raised This Week Campaigns ---
  useEffect(() => {
    const fetchMostRaisedCampaigns = async () => {
      setMostRaisedLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/transactions/weeklyMoneyRaised?page=${mostRaisedPage}&limit=${limit}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching most raised campaigns: ${errorText}`);
        }
        const result = await response.json();
        setMostRaisedCampaignData(result.raisedMostMoneyLastWeek || []);
      } catch (err: any) {
        setMostRaisedError(err.message || String(err));
      } finally {
        setMostRaisedLoading(false);
      }
    };

    fetchMostRaisedCampaigns();
  }, [mostRaisedPage, limit]);

  // Reset Most Raised carousel scroll when new data loads
  useEffect(() => {
    if (mostRaisedScrollRef.current) {
      mostRaisedScrollRef.current.scrollLeft = 0;
    }
  }, [mostRaisedCampaignData]);

  // --- Fetch Closing Soon Campaigns ---
  useEffect(() => {
    const fetchClosingSoonCampaigns = async () => {
      setClosingSoonLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/campaigns/closing?page=${closingSoonPage}&limit=${limit}`,
          { method: 'GET' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching closing soon campaigns: ${errorText}`);
        }
        const result = await response.json();
        console.log('result', result);
        setClosingSoonCampaignData(result.willBeClosedCampaigns || []);
      } catch (err: any) {
        setClosingSoonError(err.message || String(err));
      } finally {
        setClosingSoonLoading(false);
      }
    };

    fetchClosingSoonCampaigns();
  }, [closingSoonPage, limit]);

  // Reset Closing Soon carousel scroll when new data loads
  useEffect(() => {
    if (closingSoonScrollRef.current) {
      closingSoonScrollRef.current.scrollLeft = 0;
    }
  }, [closingSoonCampaignData]);

  // --- Fetch Recommended Campaigns ---
  useEffect(() => {
    const fetchRecommendedCampaigns = async () => {
      setRecommendedLoading(true);
      try {

        const response = await fetch(

          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/campaigns/recomendations?page=${recommendedPage}&limit=4`,
          { method: 'GET', credentials: 'include' }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Error fetching recommended campaigns: ${errorText}`);
        }
        const result = await response.json();
        console.log('result', result),
          setRecommendedCampaignData(result.recommendedCampaigns || []);
      } catch (err: any) {
        setRecommendedError(err.message || String(err));
      } finally {
        setRecommendedLoading(false);
      }
    };

    fetchRecommendedCampaigns();
  }, [recommendedPage]);

  // Reset Recommended Campaigns carousel scroll when new data loads
  useEffect(() => {
    if (recommendedScrollRef.current) {
      recommendedScrollRef.current.scrollLeft = 0;
    }
  }, [recommendedCampaignData]);

  // --- Carousel Scroll Handlers ---
  const handleChevronLeft = () => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollLeft > 0) {
        scrollRef.current.scrollBy({
          left: -scrollRef.current.clientWidth,
          behavior: 'smooth',
        });
      } else if (page > 1) {
        setPage((prev) => Math.max(1, prev - 1));
      }
    }
  };

  const handleChevronRight = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      if (scrollLeft < scrollWidth - clientWidth - 5) {
        scrollRef.current.scrollBy({
          left: clientWidth,
          behavior: 'smooth',
        });
      } else {
        setPage((prev) => prev + 1);
      }
    }
  };

  // --- Carousel Scroll Handlers for Recommended Campaigns ---
  const handleRecommendedChevronLeft = () => {
    if (recommendedScrollRef.current) {
      if (recommendedScrollRef.current.scrollLeft > 0) {
        recommendedScrollRef.current.scrollBy({
          left: -recommendedScrollRef.current.clientWidth,
          behavior: 'smooth',
        });
      } else if (recommendedPage > 1) {
        setRecommendedPage((prev) => Math.max(1, prev - 1));
      }
    }
  };

  const handleRecommendedChevronRight = () => {
    if (recommendedScrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = recommendedScrollRef.current;
      if (scrollLeft < scrollWidth - clientWidth - 5) {
        recommendedScrollRef.current.scrollBy({
          left: clientWidth,
          behavior: 'smooth',
        });
      } else {
        setRecommendedPage((prev) => prev + 1);
      }
    }
  };

  // --- Render Loading / Error States ---
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-2xl">Loading campaigns...</h2>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Error fetching campaigns: {error}</h2>
      </div>
    );
  }

  const handleCreateCampaign = async (campaignData: Omit<Campaign, '_id' | 'amount_raised' | 'createdAt'>): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/campaigns`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaignData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error creating campaign: ${errorText}`);
      }

      const newCampaign = await response.json();
      setCampaignData((prevCampaigns) => [newCampaign, ...prevCampaigns]);
      setIsModalOpen(false);
    } catch (err: any) {
      console.error('Failed to create campaign:', err.message || err);
      setError(err.message || String(err));
    }
  };

  function handleCompleteDonation(amount: number, donorName: string, message: string): void {
    throw new Error('Function not implemented.');
  }

  function handleDonate(campaignId: string): void {
    throw new Error('Function not implemented.');
  }

  function handleMostRaisedChevronLeft(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  function handleMostRaisedChevronRight(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  function handleClosingSoonChevronLeft(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  function handleClosingSoonChevronRight(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 sm:px-6 lg:px-8 mt-8">


      {/* --- Recommended Campaigns Section --- */}
      { user && user?.role === 'investor' ? <section className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Recommended Campaigns</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleRecommendedChevronLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleRecommendedChevronRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        {recommendedLoading ? (
          <div className="p-4">
            <h3 className="text-xl">Loading Recommended Campaigns...</h3>
          </div>
        ) : recommendedError ? (
          <div className="p-4">
            <h3 className="text-xl text-red-500">Error fetching recommended campaigns: {recommendedError}</h3>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div
              ref={recommendedScrollRef}
              className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
            >
              {recommendedCampaignData.map((campaign) => (
                console.log('campaign', campaign.recommendedCampaigns),
                <div key={campaign.recommendedCampaigns._id} className="flex-none w-[calc(25%-18px)] min-w-[300px]">
                  <CampaignCard campaign={campaign.recommendedCampaigns} apiType="recommendedCampaigns" onDonate={handleDonate} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section> : null}

      {/* --- Hot (Trending) Campaigns Section --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-semibold">Trending Campaigns</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleChevronLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleChevronRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        {hotLoading ? (
          <div className="p-4">
            <h3 className="text-xl">Loading Trending Campaigns...</h3>
          </div>
        ) : hotError ? (
          <div className="p-4">
            <h3 className="text-xl text-red-500">Error fetching trending campaigns: {hotError}</h3>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div ref={hotScrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar">
              {hotCampaignData.map((campaign) => (
                <div key={campaign._id} className="flex-none w-[calc(25%-18px)] min-w-[300px]">
                  <CampaignCard campaign={campaign} apiType={"trendingCampaigns"} onDonate={handleDonate} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* --- Most Raised This Week Section --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold">Most Raised This Week</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleMostRaisedChevronLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleMostRaisedChevronRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        {mostRaisedLoading ? (
          <div className="p-4">
            <h3 className="text-xl">Loading Most Raised Campaigns...</h3>
          </div>
        ) : mostRaisedError ? (
          <div className="p-4">
            <h3 className="text-xl text-red-500">Error fetching campaigns: {mostRaisedError}</h3>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div ref={mostRaisedScrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar">
              {mostRaisedCampaignData.map((campaign) => (
                <div key={campaign._id} className="flex-none w-[calc(25%-18px)] min-w-[300px]">
                  <CampaignCard campaign={campaign} apiType={"weeklyMoneyRaised"} onDonate={handleDonate} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* --- Most Recent (New) Campaigns Section --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-semibold">New Campaigns</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleChevronLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleChevronRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="relative overflow-hidden">
          <div ref={scrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar">
            {campaignData
              .filter((campaign) => campaign.status === 'active')
              .map((campaign) => (
                <div key={campaign._id} className="flex-none w-[calc(25%-18px)] min-w-[300px]">

                  {/* <CampaignCard campaign={campaign} onDonate={handleDonate} /> */}
                  <CampaignCard campaign={campaign} apiType={"latestCampaigns"} onDonate={handleDonate} />
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* --- Closing Soon Section --- */}
      <section className="mb-12">
        <div className="flex items-center justify-between border-b border-gray-700 pb-2 mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-semibold">Closing Soon</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleClosingSoonChevronLeft}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load previous page"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleClosingSoonChevronRight}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-shadow duration-300 shadow-md"
              aria-label="Scroll or load next page"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        {closingSoonLoading ? (
          <div className="p-4">
            <h3 className="text-xl">Loading Closing Soon Campaigns...</h3>
          </div>
        ) : closingSoonError ? (
          <div className="p-4">
            <h3 className="text-xl text-red-500">Error fetching campaigns: {closingSoonError}</h3>
          </div>
        ) : (
          <div className="relative overflow-hidden">
            <div ref={closingSoonScrollRef} className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar">
              {closingSoonCampaignData.map((campaign) => (
                <div key={campaign._id} className="flex-none w-[calc(25%-18px)] min-w-[300px]">
                  <CampaignCard campaign={campaign} apiType={"willBeClosedCampaign"} onDonate={handleDonate} />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>




      {/* --- Modals --- */}
      {isModalOpen && (
        <CreateCampaignModalNew
          onClose={() => setIsModalOpen(false)}
          onCreateCampaign={handleCreateCampaign}
        />
      )}
      {isDonationModalOpen && selectedCampaignId && (
        <DonationModal
          campaignId={selectedCampaignId}
          onClose={() => setIsDonationModalOpen(false)}
          onDonate={handleCompleteDonation}
        />
      )}

      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};
export const getbadgeForCampaign = (campaignId: string, apiType: string, campaignData: any[]) => {
  // Check for specific campaign data based on the apiType
  let badgeInfo = null;

  // For trending campaigns
  if (apiType === 'trendingCampaigns') {
    badgeInfo = campaignData
      .filter(campaign => campaign.type === 'trending' && campaign._id === campaignId)
      .map(campaign => ({
        campaignId: campaign._id,
        badge: 'Trending Now', // Badge text for trending campaigns
      }))[0];
  }

  // For latest campaigns
  if (apiType === 'latestCampaigns') {
    badgeInfo = campaignData
      .filter(campaign => campaign.type === 'latest' && campaign._id === campaignId)
      .map(campaign => ({
        campaignId: campaign._id,
        badge: 'New Campaign', // Badge text for latest campaigns
      }))[0];
  }

  // For campaigns with most money raised last week
  if (apiType === 'raisedMostMoneyLastWeek') {
    badgeInfo = campaignData
      .filter(campaign => campaign.type === 'raisedMostMoney' && campaign._id === campaignId)
      .map(campaign => ({
        campaignId: campaign._id,
        badge: 'Top Raised This Week', // Badge text for raised most money campaigns
      }))[0];
  }

  // For campaigns that will close soon
  if (apiType === 'willBeClosedCampaign') {
    badgeInfo = campaignData
      .filter(campaign => campaign.type === 'willBeClosed' && campaign._id === campaignId)
      .map(campaign => ({
        campaignId: campaign._id,
        badge: 'Closing Soon', // Badge text for closing soon campaigns
      }))[0];
  }

  // Return the badge info or null if not found
  return badgeInfo;
};



export default MyCampaignPage;
