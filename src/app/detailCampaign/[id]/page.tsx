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
    const apiUrl = `http://192.168.3.7:8080/api/fundraiser/campaign/${id}`;

    const fetchedDetails = await fetch(apiUrl, {
        method: 'GET', // Use 'GET' method for fetching data
        headers: {
            'Content-Type': 'application/json', // Indicate that the request expects JSON data
        },
    });

    if (!fetchedDetails.ok) {
        throw new Error(`Failed to fetch campaign details for ID: ${id}`);
    }

    const fetchedData = await fetchedDetails.json();
    return fetchedData;
};

export default async function CampaignDetails({ params }: PropsArgs): Promise<JSX.Element> {
    const { id } = params;
    const campaignDetails = await fetchCampaignDetailsForId(id);

    return (
        <main className="p-10 mt-20">
            <h1>{campaignDetails.title}</h1>
            <p>{campaignDetails.story}</p>
            <div className="flex">
                <div>
                    <Image src={campaignDetails.image_url} alt={campaignDetails.title} height={800} width={800} />
                </div>
                <div>
                    <input type="text" defaultValue="Default text" />
                    <textarea defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod modi harum eos nemo reprehenderit aperiam iste illo sint cumque eligendi. Modi dolorum minima maiores est, natus incidunt inventore sunt laboriosam!"></textarea>
                </div>
            </div>
        </main>
    );
}
