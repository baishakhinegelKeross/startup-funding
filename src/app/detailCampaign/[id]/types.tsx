// page.tsx : ST

export interface Campaign{
    title: string,
    story: string,
    image_url: string,
    category: string,
    goal_amount: number,
    current_amount: number,
    published: string,
    owner: string,
    email: string,
    faves: number,
    date: Date,
    contributions: Contributions
}

export interface Contributions{
    amount: number,
    fundraiserId: string,
    date: Date
}

export interface PropsArgs{
    params: {
        id: string;
    };
}

// page.tsx : ED

// featured_investor.tsx : ST

export interface FeaturedInvestorProps {
    investorPic: string,
    investorName: string,
    investorTitle: string,
    investmentAmt: string,
    investorCmt: string
  }

// featured_investor.tsx : ED

// team.tsx : ST

export interface TeamMemberProps{
    teamMemberPic: string,
    teamMemberName: string,
    teamMemberTitle: string
}

// team.tsx : ED

// highlights.tsx : ST

export interface HighlightsProps{
    title: string,
    desc: string
}

// highlights.tsx

// keypoints.tsx : ST

export interface KeyPointsProps{
    desc: string
}

// keypoints.tsx : ED

// campaign_investment.tsx : ST

export interface CampaignInvestmentProps {
    campaignId: string,
    data:{
        title: string,
        story: string,
        image_url: string,
        category: string,
        goal_amount: number,
        current_amount: number,
        owner: string,
        email: string,
        stripeId: string,
        transactions: string [],
        end_date: Date,
        date: Date
    }
}

// campaign_investment.tsx : ED

// details.tsx : ST

export interface DetailsProps {
    highlights: {
        id: string;
        title: string;
        desc: string;
    }[],
    keypoints: {
        id: string;
        text: string;
    }[],
    featuredInvestor: {
        id: string;
        investorPic: string;
        investorName: string;
        investorTitle: string;
        investmentAmt: string;
        investorCmt: string;
    }[],
    teamMember: {
        id: string;
        teamMemberPic: string;
        teamMemberName: string;
        teamMemberTitle: string;
    }[]
}

// details.tsx : ED

// update_posts.tsx : ST

export interface UpdatePostsProps {
    key: string,
    postTitle: string,
    postImg: {
        src: string;
        alt: string;
        class: string;
        height: number;
        width: number;
    },
    postedBy: {
        src: string;
        alt: string;
        name: string;
        date: string;
        role: string;
        class: string;
        width: number;
        height: number;
    },
    postTags: {
        id: string,
        text: string;
    }[]
}

// update_posts.tsx : ED

// comments_posts.tsx : ST

export interface CommentPostProps {
    key: string,
    comment_img: string,
    investor_name: string,
    is_lead_investor: boolean,
    investment_amount: string,
    investor_message: string
}

// comments_posts.tsx: ED

// question_answers_posts.tsx : ST


export interface QuestionAnswersPostProps{
    posts: {
        userId: string;
        comment: string;
        userPic: string;
        userName: string;
        userRole: string;
        commentDate: string;
        reply: {
            userId: string;
            replyComment: string;
            userPic: string;
            userName: string;
            userRole: string;
            replyDate: string;
        }[];
    }
}

// question_answers_posts.tsx : ED

// text_editor.tsx : ST

export interface TextEditorProps{
    id: string,
    cache: {
        [key: number]: HTMLInputElement
    }
}

// text_editor.tsx : ED

// img_editor.tsx : ST

export interface ImgEditorProps{
    id: string,
    cache: {
        [key: number]: HTMLInputElement
    }
}

// img_editor.tsx : ED

// amount.tsx : ST

export interface CampaignAmountProps{
    goal: string,
    raised: string
}

// amount.tsx : ED