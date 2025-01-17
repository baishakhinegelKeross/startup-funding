"use client";

import React, { useState } from 'react';
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignTable from '@/components/admin/pendingStartups/CampaignTable';
import CampaignModal from '@/components/admin/pendingStartups/CampaignModal';
import LoadingIndicator from '@/components/admin/pendingStartups/LoadingIndicator';
import ErrorIndicator from '@/components/admin/pendingStartups/ErrorIndicator';

const PendingStartupsPage: React.FC = () => {
    const { campaigns, loading, error } = useCampaigns();
    const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

    const handleViewDetails = (campaign: any) => setSelectedCampaign(campaign);
    const handleCloseModal = () => setSelectedCampaign(null);
    const handleAction = async (action: 'accept' | 'reject') => {
        // Implement logic to accept or reject the campaign
        console.log(`${action}ing campaign: ${selectedCampaign?.title}`);
        handleCloseModal();
    };

    if (loading) return <LoadingIndicator />;
    if (error) return <ErrorIndicator error={error} />;

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-600">Pending Startups</h2>

            <CampaignTable campaigns={campaigns} onViewDetails={handleViewDetails} />

            <CampaignModal campaign={selectedCampaign} onClose={handleCloseModal} onAction={handleAction} />
        </div>
    );
};

export default PendingStartupsPage;
