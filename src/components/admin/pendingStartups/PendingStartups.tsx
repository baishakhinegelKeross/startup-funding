import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Import shadcn Dialog components
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

// Define the Contribution type based on your backend data
interface Contribution {
    amount: number;
    fundraiserId: string;
    date: string;
    _id: string;
}

interface Campaign {
    approved: boolean;
    _id: string;
    title: string;
    story: string;
    image_url: string;
    category: string;
    goal_amount: number;
    current_amount: number;
    published: boolean;
    owner: string;
    email: string;
    stripeId: string;
    faves: number;
    date: string;
    end_date?: string;
    contributions: Contribution[];
    amount_raised: number;
}

const PendingStartups: React.FC = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Fetch campaigns from the backend API
    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get<Campaign[]>(`${process.env.NEXT_PUBLIC_REACT_APP_API_URL}`);
                console.log(response);
                const pending = response.data.filter(campaign => !campaign.approved);
                setCampaigns(pending);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch campaigns.');
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, []);

    // Handle opening the modal with campaign details
    const handleViewDetails = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedCampaign(null);
    };

    // Handle Accept or Reject actions
    const handleAction = async (action: 'accept' | 'reject') => {
        if (!selectedCampaign) return;

        try {
            // Update the campaign status in the backend
            await axios.patch(`http://192.168.3.7:8080/api/fundraiser/${selectedCampaign._id}`, {
                approved: action === 'accept',
            });

            // Update the local state
            setCampaigns(prev =>
                prev.filter(campaign => campaign._id !== selectedCampaign._id)
            );

            // Optionally, display a success message
            alert(`Campaign ${action}ed successfully!`);
        } catch (err: any) {
            alert(`Failed to ${action} the campaign: ${err.message}`);
        } finally {
            handleCloseModal();
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl text-gray-700">Loading pending startups...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-2xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Pending Startups</h2>

            {campaigns.length === 0 ? (
                <div className="text-center text-gray-600">No pending startups available.</div>
            ) : (
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
                            {campaigns.map(campaign => (
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
                                            onClick={() => handleViewDetails(campaign)} // Pass the whole campaign object here
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
            )}

            {/* Modal for Campaign Details */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="bg-white rounded-lg max-w-4xl mx-auto p-6 shadow-lg">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-bold mb-4 text-blue-600 text-center">
                            {selectedCampaign?.title}
                        </DialogTitle>
                        <DialogDescription>
                            {/* You can add a description here if needed */}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedCampaign && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Campaign Image */}
                                <div>
                                    <img
                                        src={selectedCampaign.image_url}
                                        alt={selectedCampaign.title}
                                        className="w-full h-64 object-cover rounded-lg shadow-md"
                                    />
                                </div>

                                {/* Campaign Details */}
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Description:</h4>
                                        <p className="text-gray-600">{selectedCampaign.story}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Category:</h4>
                                        <p className="text-gray-600 capitalize">{selectedCampaign.category}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Founder:</h4>
                                        <p className="text-gray-600">{selectedCampaign.owner}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Email:</h4>
                                        <p className="text-gray-600">{selectedCampaign.email}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Target Amount:</h4>
                                        <p className="text-gray-600">${selectedCampaign.goal_amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Current Amount:</h4>
                                        <p className="text-gray-600">${selectedCampaign.current_amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">Amount Raised:</h4>
                                        <p className="text-gray-600">${selectedCampaign.amount_raised}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-gray-700">End Date:</h4>
                                        <p className="text-gray-600">
                                            {selectedCampaign.end_date
                                                ? new Date(selectedCampaign.end_date).toLocaleDateString()
                                                : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contributions */}
                            <div className="mt-6">
                                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Contributions:</h3>
                                {selectedCampaign.contributions.length === 0 ? (
                                    <p className="text-gray-600">No contributions yet.</p>
                                ) : (
                                    <ul className="space-y-2">
                                        {selectedCampaign.contributions.map(contribution => (
                                            <li key={contribution._id} className="border p-4 rounded-lg">
                                                <div className="flex justify-between">
                                                    <span className="font-semibold text-gray-700">${contribution.amount.toLocaleString()}</span>
                                                    <span className="text-gray-500">
                                                        {new Date(contribution.date).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-gray-600 mt-2">Donor ID: {contribution.fundraiserId}</p>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <DialogFooter className="mt-8 flex justify-center space-x-4">
                                <Button
                                    onClick={() => handleAction('accept')}
                                    className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
                                >
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => handleAction('reject')}
                                    className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
                                >
                                    Reject
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PendingStartups;
