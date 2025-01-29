import { useEffect, useState } from 'react';
import axios from 'axios';

interface Contribution {
    amount: number;
    fundraiserId: string;
    date: string;
    _id: string;
}

export interface Campaign {
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

export const useCampaigns = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const response = await axios.get<Campaign[]>(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser`);
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

    return { campaigns, loading, error };
};
