"use client";

import React, { useState } from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignTable from '@/components/admin/pendingStartups/CampaignTable';
import CampaignModal from '@/components/admin/pendingStartups/CampaignModal';
import LoadingIndicator from '@/components/admin/pendingStartups/LoadingIndicator';
import ErrorIndicator from '@/components/admin/pendingStartups/ErrorIndicator';
import axios from 'axios';

const PendingStartupsPage = () => {
    const { campaigns, loading, error } = useCampaigns();
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    const handleViewDetails = (campaign: any) => {
        setSelectedCampaign(campaign);
    };

    const handleCloseModal = () => {
        setSelectedCampaign(null);
    };

    const handleAction = async (action: 'accept' | 'reject') => {
        try {
            const payload = {
                approved: action === 'accept',
                comments: action === 'accept' ? "Campaign approved" : "Campaign rejected"
            };

            const response = await axios.post(
                `http://192.168.3.7:8080/admin/request/campaignResponses?id=${selectedCampaign._id}`,
                payload
            );

            if (response.status === 200) {
                // Refresh the campaigns list after successful action
                window.location.reload();
            }

            handleCloseModal();
        } catch (error) {
            console.error('Error processing action:', error);
        }
    };

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorIndicator error={error} />;

    return (
        <div className="p-6 min-h-screen bg-gray-900">
            <h2 className="text-3xl font-bold mb-8 text-center text-blue-500">
                Pending Startup Requests
            </h2>

            <div className="rounded-lg shadow-lg bg-gray-800 p-6">
                <CampaignTable
                    campaigns={campaigns}
                    onViewDetails={handleViewDetails}
                />
            </div>

            {selectedCampaign && (
                <CampaignModal
                    campaign={selectedCampaign}
                    onClose={handleCloseModal}
                    onAction={handleAction}
                />
            )}
        </div>
    );
};

export default PendingStartupsPage;
