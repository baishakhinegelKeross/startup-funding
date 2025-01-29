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

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

export interface BusinessConcept {
    businessIdea: string;
    valueProposition: string;
}

export interface MarketAnalysis {
    targetMarket: {
        demographics: string;
        psychographics: string;
        needs: string;
    };
    marketSize: {
        totalAddressableMarket: number;
        servicedAddressableMarket: number;
        servicedObtainableMarket: number;
    };
    competitiveAnalysis: {
        strengths: string[];
        weaknesses: string[];
        opportunities: string[];
        threats: string[];
    };
}

export interface BusinessModel {
    revenueStreams: {
        type: string;
        description: string;
        projectedRevenue: number;
    }[];
    costStructure: {
        fixedCosts: {
            type: string;
            amount: number;
        }[];
        variableCosts: {
            type: string;
            amount: number;
        }[];
    };
}

export interface BusinessPlan {
    executiveSummary: string;
    objectives: {
        shortTerm: string[];
        longTerm: string[];
    };
    marketingStrategy: {
        channels: string[];
        budget: number;
        tactics: string[];
    };
}

export interface OperationalPlan {
    location: {
        type: 'physical' | 'online' | 'hybrid';
        details: string;
    };
    technologyNeeds: {
        software: string[];
        hardware: string[];
        otherTools: string[];
    };
    supplyChain: {
        suppliers: string[];
        logistics: string;
        inventory: string;
    };
}

export interface TeamMember {
    name: string;
    position: string;
    avatar: string;
    about: string;
    experience: string[];
    education: string[];
    skills: string[];
}

export interface FinancialProjections {
    startupCosts: {
        type: string;
        amount: number;
    }[];
    profitAndLoss: {
        revenue: number;
        expenses: number;
        profit: number;
        year: number;
    }[];
    breakEvenAnalysis: {
        point: number;
        expectedDate: string;
    };
}

export interface FundingRequirements {
    totalAmount: number;
    useOfFunds: {
        category: string;
        amount: number;
        description: string;
    }[];
    timeline: {
        phase: string;
        amount: number;
        date: string;
    }[];
}

export interface LegalStructure {
    businessEntity: 'LLC' | 'Corporation' | 'Sole Proprietorship' | 'Partnership';
    licenses: string[];
    permits: string[];
}

export interface RisksAndChallenges {
    risks: {
        type: string;
        impact: 'Low' | 'Medium' | 'High';
        mitigation: string;
    }[];
}

export interface Milestone {
    title: string;
    description: string;
    targetDate: string;
    status: 'Planned' | 'In Progress' | 'Completed';
    metrics: {
        name: string;
        target: number;
        current: number;
    }[];
}

export interface Resource {
    type: 'video' | 'image';
    url: string;
    thumbnailUrl?: string;
    title: string;
    description: string;
}

export interface Highlight {
    id: number;
    description: string;
}

export interface AdditionalHighlight {
    title: string;
    description: string;
}

export interface Valuation {
    currentValuation: string;
    lastValuation: string;
    currencyUnit: Currency;
}

export interface Contribution {
    userId: string;
    amount: number;
    date: string;
}

export interface Startup {
  [key: string]: any;
    id: string;
    title: string;
    story: string;
    resource: Resource;
    category: string;
    goalAmount: number;
    currentAmount: number;
    currencyType: Currency;
    publishedStatus: boolean;
    owner: {
        name: string;
        email: string;
        stripeId: string;
    };
    favoritesCount: number;
    endDate: string;
    createdAt: string;
    contributions: Contribution[];
    highlights: Highlight[];
    additionalHighlights: AdditionalHighlight[];
    valuation: Valuation;
    ourTeam: TeamMember[];
    pitch: string;

    // New business details
    businessConcept: BusinessConcept;
    marketAnalysis: MarketAnalysis;
    businessModel: BusinessModel;
    businessPlan: BusinessPlan;
    operationalPlan: OperationalPlan;
    financialProjections: FinancialProjections;
    fundingRequirements: FundingRequirements;
    legalStructure: LegalStructure;
    risksAndChallenges: RisksAndChallenges;
    milestones: Milestone[];
}
