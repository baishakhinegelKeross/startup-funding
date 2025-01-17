import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/hooks/useCampaigns';

interface CampaignModalProps {
    campaign: Campaign | null;
    onClose: () => void;
    onAction: (action: 'accept' | 'reject') => void;
}

const CampaignModal: React.FC<CampaignModalProps> = ({ campaign, onClose, onAction }) => {
    if (!campaign) return null;

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="bg-white rounded-lg max-w-4xl mx-auto p-6 shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold mb-4 text-blue-600 text-center">
                        {campaign.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Campaign Image */}
                    <div>
                        <img
                            src={campaign.image_url}
                            alt={campaign.title}
                            className="w-full h-64 object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Campaign Details */}
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Description:</h4>
                            <p className="text-gray-600">{campaign.story}</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Category:</h4>
                            <p className="text-gray-600 capitalize">{campaign.category}</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Founder:</h4>
                            <p className="text-gray-600">{campaign.owner}</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-semibold text-gray-700">Email:</h4>
                            <p className="text-gray-600">{campaign.email}</p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="mt-8 flex justify-center space-x-4">
                    <Button
                        onClick={() => onAction('accept')}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-200"
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={() => onAction('reject')}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-200"
                    >
                        Reject
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CampaignModal;
