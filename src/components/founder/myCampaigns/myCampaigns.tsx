'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CampaignListPage: React.FC = () => {
    const router = useRouter();

    // Sample campaigns with an 'id' for each
    const [campaigns, setCampaigns] = useState([
        {
            id: 1,
            campaignTitle: "Porro omnis molestia",
            campaignImage: "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
            status: "pending",
        },
        {
            id: 2,
            campaignTitle: "Aut exercitationem v",
            campaignImage: "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
            status: "approved",
        },
        {
            id: 3,
            campaignTitle: "Necessitatibus a qui",
            campaignImage: "https://media.istockphoto.com/id/1219580367/photo/marketing-campaign-brand-advertisement-business-strategy.jpg?s=2048x2048&w=is&k=20&c=nMmYCcGfAT-PxZ-KNLafMP9BqiC9oyKe2ZS535Gv2wU=",
            status: "rejected",
            rejectionReason: "The campaign did not meet our eligibility criteria.",
        }
    ]);

    const handleNavigate = (campaignId: number) => {
        // Navigate to the campaign details page using the campaign id
        router.push(`/campaign-details/${campaignId}`);
    };

    const renderStatusMessage = (status: string) => {
        switch (status) {
            case 'pending':
                return <span className="text-yellow-600">Under Review</span>;
            case 'approved':
                return <span className="text-green-600">Approved</span>;
            case 'rejected':
                return <span className="text-red-600">Rejected</span>;
            default:
                return <span className="text-gray-600">Status unknown</span>;
        }
    };

    return (
        <div className="p-8  min-h-screen">
            <h1 className="text-3xl font-semibold text-white mb-6 text-center">Campaigns</h1>

            {/* Campaign Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <div key={campaign.id} className="bg-white p-4 rounded-md shadow-sm hover:shadow-md transition duration-200 ease-in-out">
                        <img
                            src={campaign.campaignImage}
                            alt="Campaign"
                            className="w-full h-40 object-cover rounded-md mb-4"
                        />
                        <h3 className="text-lg font-medium text-gray-900 truncate">{campaign.campaignTitle}</h3>
                        <div className="text-sm text-gray-600 mb-4">{renderStatusMessage(campaign.status)}</div>

                        {/* If Rejected, show the reason */}
                        {campaign.status === 'rejected' && (
                            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm rounded-lg shadow-sm">
                                <strong className="font-semibold">Rejection Reason:</strong>
                                <p className='text-black text-sm font-mono'>{campaign.rejectionReason}</p>
                            </div>
                        )}

                        {/* "View Full Details" Button */}
                        {campaign.status === 'approved' && (
                            <Link
                                href={`/mycampaign/${campaign.id}`}  // Using dynamic route for navigation
                                className="my-1 text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-3 px-8 rounded-full hover:from-indigo-700 hover:to-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-500 shadow-md transform hover:scale-105 transition-all duration-300 ease-in-out"
                            >
                                View Full Details
                            </Link>

                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CampaignListPage;
