import React from 'react';
import { Campaign } from '@/hooks/useCampaigns';
import { Button } from '@/components/ui/button';

// Import shadcn/ui table components
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
} from '@/components/ui/table'; // Adjust the import path based on your project structure

interface CampaignTableProps {
    campaigns: Campaign[];
    onViewDetails: (campaign: Campaign) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns, onViewDetails }) => {
    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <TableHeader className="bg-blue-500 text-white">
                    <TableRow>
                        <TableHead className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                            Campaign Title
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                            Founder
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                            Category
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                            Target Amount
                        </TableHead>
                        <TableHead className="px-6 py-3 text-left text-sm uppercase tracking-wider">
                            Status
                        </TableHead>
                        <TableHead className="px-6 py-3 text-center text-sm uppercase tracking-wider">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-gray-700">
                    {campaigns.map((campaign) => (
                        <TableRow key={campaign._id} className="border-b">
                            <TableCell className="px-6 py-4">{campaign.title}</TableCell>
                            <TableCell className="px-6 py-4">{campaign.owner}</TableCell>
                            <TableCell className="px-6 py-4 capitalize">{campaign.category}</TableCell>
                            <TableCell className="px-6 py-4">${campaign.goal_amount.toLocaleString()}</TableCell>
                            <TableCell className="px-6 py-4">
                                <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-200 text-yellow-800">
                                    Pending
                                </span>
                            </TableCell>
                            <TableCell className="px-6 py-4 text-center">
                                <Button
                                    onClick={() => onViewDetails(campaign)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                                >
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CampaignTable;
