import { JSX } from "react";
//import Image from "next/image";
import BussinessImage from '@/assets/business_img-1.jpg';


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
    //const campaignDetails = await fetchCampaignDetailsForId("677cc652db18e4735880622b");
    // Use params.id to fetch campaign details dynamically
    //const campaignDetails = await fetchCampaignDetailsForId(params.id);
    
    const {id} = await params;
    console.log(id)
    /*
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

    <main className="p-10 mt-20">
            
            <h1>Revolutionize Your Business with Fastwrap</h1>
            <p>Fastwrap is an advanced ERP software designed to streamline and optimize every aspect of your business, from inventory and finance to HR and customer relations. It integrates all your business processes into one cohesive system, enabling faster decision-making, increased productivity, and real-time insights.</p>
            <div className="flex">
                <div>
                    <Image src={BussinessImage} alt="fastwrap" height={800} width={800} />
                </div>
                <div>
                    <input type="text" />
                    <textarea defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod modi harum eos nemo reprehenderit aperiam iste illo sint cumque eligendi. Modi dolorum minima maiores est, natus incidunt inventore sunt laboriosam!"></textarea>
                </div>
            </div>
            
        </main>


    */

    return (
        <main className="min-h-fit p-10 mt-20 border-0 border-t">
            <section className="w-full">
                <article className="p-2">
                    <p className="text-xl">INVEST IN FASTOPPS</p>
                </article>
                <article className="p-2">
                    <p className="text-3xl">Next-Gen Software for the Modern Professional</p>
                </article>
            </section>
            <section className="flex w-full">
                <section className="w-9/12 border-0 px-2">
                    <article className="p-0">
                        <div>
                            <video className="w-full h-full" src="/sample_video-1.mp4" autoPlay controls></video>
                        </div>
                    </article>
                </section>
                <section className="w-1/4 border p-2">
                    <article className="flex flex-col h-full p-2">
                        <div className="h-3/4 border-0 p-2">
                            <div>
                                Almost Funded
                            </div>
                            <div className="text-3xl">
                            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                                <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500 w-4/5"></div>
                            </div>
                                $9950
                            </div>
                            <div className="text-sm">
                                of a $10000 goal
                            </div>
                            <div className="flex mt-2">
                                <div className="w-1/2">
                                    <div className="text-xl">FUND</div>
                                    <div className="text-sm">min $10</div>
                                </div>
                                <div>
                                    <input type="number" min="10" defaultValue="10"/>
                                </div>
                            </div>
                            <div className="mt-2">
                                <button type="button" className="w-full text-sm">FUND</button>
                            </div>
                            <div className="mt-2">
                                <button type="button" className="w-full text-sm">WATCH FOR UPDATES</button>
                            </div>
                        </div>
                        <div className="h-1/4 border-0 p-2">
                            FUNDING TERMS
                        </div>
                    </article>
                </section>
            </section>
        </main>
    )
}
