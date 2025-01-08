import React, { useState } from 'react';
import { FilePenLine, Trash2 } from 'lucide-react';
import Link from 'next/link';

// Campaign Class
class Campaign {
  image: string;
  title: string;
  status: string;
  fundsRaised: number;
  targetAmount: number;
  investors: number;
  daysRemaining: number;

  constructor(
    image: string,
    title: string,
    status: string,
    fundsRaised: number,
    targetAmount: number,
    investors: number,
    daysRemaining: number
  ) {
    this.image = image;
    this.title = title;
    this.status = status;
    this.fundsRaised = fundsRaised;
    this.targetAmount = targetAmount;
    this.investors = investors;
    this.daysRemaining = daysRemaining;
  }
}

// Props Interface
interface CampaignCardProps {
  campaign: Campaign;
  index: number;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, index }) => {
  const [showViewButton, setShowViewButton] = useState(false);

  const handleCardClick = () => {
    setShowViewButton(!showViewButton);
  };

  return (
    <div
      id={`campaign-${index}`}
      className="relative flex flex-col bg-white p-5 rounded-lg shadow-md"
      onClick={handleCardClick}
    >
      {/* Hover effect and View button */}
      <div
        className={`absolute inset-x-0 top-0 h-1/2 bg-transparent group ${
          showViewButton ? '' : 'group-hover'
        }`}
      >
        <div className="relative h-full">
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold ${
              showViewButton ? 'opacity-100' : 'opacity-0'
            } group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg`}
          >
            <Link href={`/detailCampaign/${index}`} className="p-2">
              View
            </Link>
          </div>
        </div>
      </div>
      {/* Card Content */}
      <img
        src={campaign.image}
        alt="Campaign Image"
        width={100}
        height={100}
        className="w-full rounded-lg"
      />
      <h3 className="text-black line-clamp-1">{campaign.title}</h3>
      <h4 className="text-gray-500 text-[17px] mt-3">
        Status: {campaign.status}
      </h4>
      <h4 className="text-gray-500 text-[17px]">
        Funds Raised: ${campaign.fundsRaised}/{campaign.targetAmount}
      </h4>
      <h4 className="text-gray-500 text-[17px]">Investors: {campaign.investors}</h4>
      <h4 className="text-gray-500 text-[17px]">
        Days Remaining: {campaign.daysRemaining}
      </h4>
    </div>
  );
};

export default CampaignCard;

// Example Usage
export const getServerSideProps = async () => {
  const mockCampaign = new Campaign(
    '/image/path.jpg',
    'Exciting Campaign',
    'Active',
    5000,
    10000,
    120,
    15
  );

  return {
    props: {
      campaign: mockCampaign,
      index: 0,
    },
  };
};
