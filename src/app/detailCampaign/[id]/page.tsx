import { JSX } from "react";
import Image from "next/image";

// Define a class to encapsulate campaign details
class Campaign {
    constructor(
        public title: string,
        public story: string,
        public image_url: string,
        public category: string,
        public goal_amount: number,
        public current_amount: number,
        public published: string,
        public owner: string,
        public email: string,
        public faves: number,
        public date: Date,
        public contributions: Contributions
    ) {}
}

class Contributions {
    constructor(
        public amount: number,
        public fundraiserId: string,
        public date: Date
    ) {}
}

type PropsArgs = {
    params: {
        id: string;
    };
};

const fetchCampaignDetailsForId = async function (id: string): Promise<Campaign> {
    const apiUrl = `http://192.168.3.7:5000/api/fundraiser/campaign/${id}`;

    const fetchtedDetails = await fetch(apiUrl, {
        method: 'GET', // Use 'GET' method for fetching data
        headers: {
            'Content-Type': 'application/json', // Indicate that the request expects JSON data
        },
    });

    if (!fetchtedDetails.ok) {
        throw new Error(`Failed to fetch campaign details for ID: ${id}`);
    }

    const fetchedData = await fetchtedDetails.json();
    return fetchedData;
};

export default async function CampaignDetails({ params }: PropsArgs): Promise<JSX.Element> {
    const campaignDetails = await fetchCampaignDetailsForId("677cc652db18e4735880622b");
    // Use params.id to fetch campaign details dynamically
    //const campaignDetails = await fetchCampaignDetailsForId(params.id);
    
    const {id} = await params;
    console.log(id)
    
    return (
        <main className="p-10 mt-20">
            <h1>{campaignDetails.title}</h1>
            <p>{campaignDetails.story}</p>
            <div className="flex">
                <div>
                    <Image src={campaignDetails.image_url} alt={campaignDetails.title} height={800} width={800} />
                </div>
                <div>
                    <input type="text" />
                    <textarea>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod modi harum eos nemo reprehenderit aperiam iste illo sint cumque eligendi. Modi dolorum minima maiores est, natus incidunt inventore sunt laboriosam!</textarea>
                </div>
            </div>
            
        </main>
    );
}
