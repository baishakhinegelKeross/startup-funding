export interface Campaign {
    _id: string;
    title: string;
    story: string;
    goal_amount: number;
    amount_raised: number;
    createdAt: Date;
    end_date: Date;
    image_url: string;
    owner: string;
    category: string;
    email: string;
}

export interface Donation {
    id: string;
    amount: number;
    campaignId: string;
    donorName: string;
    message?: string;
    createdAt: Date;
}