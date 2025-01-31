import { JSX } from "react";
import axios from 'axios';

import { PropsArgs } from './types';
import OtherDetails from "./other_details";
import Classes from './page.module.css'
import CampaignInvestment from "./campaign_investment";


const fetchCampaignData = async function(url: string) {
    try {
      // Make a GET request to the specified URL
      const response = await axios.get(url);
  
      // Return the data from the response
      return response.data;

    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error if needed
    }
}


export default async function CampaignDetails({ params }: PropsArgs): Promise<JSX.Element> {
    const {id} = await params;
    const fetchAPI_URL = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser/campaign/${id}`;
    //console.log('Campaign Id: ', id)

    const fetchedCampaignData = await fetchCampaignData(fetchAPI_URL);
    //console.log('Fetched Campaign Data:- ', fetchedCampaignData);

    const filteredCampaignData = {
        title: fetchedCampaignData.title,
        story: fetchedCampaignData.story,
        image_url: fetchedCampaignData.image_url,
        category: fetchedCampaignData.category,
        goal_amount: fetchedCampaignData.goal_amount,
        current_amount: fetchedCampaignData.current_amount,
        owner: fetchedCampaignData.owner,
        email: fetchedCampaignData.email,
        stripeId: fetchedCampaignData.stripeId,
        transactions: fetchedCampaignData.transactions,
        end_date: fetchedCampaignData.end_date,
        date: fetchedCampaignData.date
    }

    return (
        <main className={`${Classes.wrapper} mt-20 border-0 border-t`}>
            <CampaignInvestment campaignId={id} data={filteredCampaignData}></CampaignInvestment>
            <OtherDetails></OtherDetails>
        </main>
    )
}
