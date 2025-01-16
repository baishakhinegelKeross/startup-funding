import React from 'react';
import { Campaign } from '@/hooks/useCampaigns';
import { Button } from '@/components/ui/button';

interface CampaignTableProps {
    campaigns: Campaign[];
    onViewDetails: (campaign: Campaign) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onViewDetails }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Campaign Title</th>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Founder</th>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Target Amount</th>
                        <th className="px-6 py-3 text-left text-sm uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-center text-sm uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {campaigns.map((campaign) => (
                        <tr key={campaign._id} className="border-b">
                            <td className="px-6 py-4">{campaign.title}</td>
                            <td className="px-6 py-4">{campaign.owner}</td>
                            <td className="px-6 py-4 capitalize">{campaign.category}</td>
                            <td className="px-6 py-4">${campaign.goal_amount.toLocaleString()}</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                                    Pending
                                </span>
                            </td>
                            <td className="px-6 py-4 text-center">
                                <Button
                                    onClick={() => onViewDetails(campaign)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                                >
                                    View Details
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CampaignTable;
