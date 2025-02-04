'use client'
import Image from "next/image";
import Link from "next/link";
import { CampaignInvestmentProps } from "./types";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";
import axios from "axios";
import { useRouter } from "next/navigation";

const CampaignInvestment: React.FC<CampaignInvestmentProps> = ({ campaignId, data }) => {
    const { user } = useAuth();
    const router = useRouter();
    const userRole = user?.role === 'admin' ? 'admin' : user?.role === 'fundraiser' ? 'founder' : user?.role === 'investor' ? 'investor' : undefined;
    
    const getFundStatus = function(percentage: number){
        let status = 'Fully Funded';

        if(percentage >= 0 && percentage < 25){
            status =  'Just Launched';
        }
        else if(percentage >= 25 && percentage < 50){
            status =  'Getting Started';
        }
        else if(percentage >= 50 && percentage < 75){
            status =  'Halfway There';
        }
        else if(percentage >= 75 && percentage < 99){
            status =  'Almost Funded';
        }

        return status;
    };

    // Campaign data
    const image = data.image_url ? data.image_url : "https://placehold.co/600x400?text=Campaign+Photo.png";
    const title = data.title ? data.title : "Campaign Title";
    const story = data.story ? data.story : "Campaign Story";
    const raised = data.current_amount ? data.current_amount : 1;
    const goal = data.goal_amount ? data.goal_amount : 1;
    const fundedPct = parseFloat(((raised/goal) * 100).toFixed(2));
    const fundStatus = getFundStatus(fundedPct);
    const fundProgress = fundedPct <= 100 ? fundedPct : 0;

    //console.log('In browser: ', data);
  
    return (
            <div className="bg-[#0a0b1e]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                    {/* Header Section */}
                    <div className="space-y-4 mb-12">
                        <Badge
                            variant="secondary"
                            className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        >
                            INVEST IN FASTOPPS
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                            {/*
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Next-Gen Software for the
                            </span>
                            <br className="hidden md:block" />
                            <span className="text-primary">Modern Professional</span>
                            */}
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">{title}</span>
                        </h1>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
                        {/* Campaign Image Section */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur overflow-hidden">
                            <CardContent className="p-0">
                                <div className="aspect-video relative">
                                    <Image
                                        src={image}
                                        alt="campaign_image.jpg"
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>

                                <div className="mt-2">
                                    <p className="text-lg">
                                        <q>
                                            {story}
                                        </q>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Investment Card */}
                        <Card className="border-0 shadow-xl bg-card/50 backdrop-blur">
                            <CardContent className="p-6 space-y-6">
                                {/* Progress Section */}
                                <div className="space-y-2">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-lg font-semibold text-primary">{fundStatus}</h3>
                                        <span className="text-sm text-muted-foreground">{fundedPct}%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className={`h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-[${fundProgress}%]`}></div>
                                    </div>
                                </div>

                                {/* Amount Section */}
                                
                                <div className="space-y-1">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-bold text-primary">${raised}</span>
                                        <span className="text-muted-foreground">raised</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">of a ${goal} goal</p>
                                </div>
                                

                                {/* Investment Form */}
                                {(userRole == "investor" || userRole == undefined) &&
                                <div className="space-y-4">
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-primary mb-2">
                                            INVESTMENT AMOUNT
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-[14px] top-[14px] text-gray-500">$</span>
                                            <input type="number" min="10"
                                                id="amountInp"
                                                className="m-0 w-full pl-8 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter amount" 
                                                defaultValue={10} 
                                                />
                                        </div>
                                        <p className="mt-1 text-sm text-muted-foreground">Minimum $10</p>
                                    </div>

                                    {/* Action Buttons */}
                                    
                                    <div className="space-y-3">
                                        {/*  {userRole == undefined ? 
                                            ( <Button
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                    asChild
                                                >
                                                <Link href={`/login`}>
                                                        INVEST NOW
                                                    </Link>
                                                    
                                                </Button>
                                            )
                                                :
                                                (<Button
                                                    onClick={async ()=>{
                                                        debugger
                                                        
                                                        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser/campaign/checkout/${campaignId}`,JSON.stringify({'amount':document.getElementById('amountInp').value}),{
                                                            headers: {
                                                            'Content-Type': 'application/json'
                                                            },
                                                            withCredentials:true
                                            
                                                        })
                                                        const data = res.data;
                                                        router.push(data.url)
                                                        //redirect(data.url)
                                                    }}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                    asChild
                                                >
                                                        INVEST NOW
                                                    
                                                </Button>)
                                            } */}

                                        {userRole === undefined ? (
                                            <Button
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                                asChild
                                            >
                                                <Link href={`/login`}>
                                                    INVEST NOW
                                                </Link>
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={async () => {
                                                    try {
                                                        const amount = document.getElementById('amountInp').value;
                                                        const response = await axios.post(
                                                            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/fundraiser/campaign/checkout/${campaignId}`,
                                                            JSON.stringify({ amount }),
                                                            {
                                                                headers: {
                                                                    'Content-Type': 'application/json',
                                                                },
                                                                withCredentials: true,
                                                            }
                                                        );
                                                        const data = response.data;
                                                        router.push(data.url);
                                                    } catch (error) {
                                                        console.error('Error during the request:', error);
                                                    }
                                                }}
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                                            >
                                                INVEST NOW
                                            </Button>
                                        )}

                                        
                                        {userRole != undefined && 
                                        <Button
                                            variant="secondary"
                                            className="w-full bg-secondary/50 hover:bg-secondary/70"
                                        >
                                            <Eye className="mr-2 h-4 w-4" />
                                            <Link href={`/dispute/${data.title}-${campaignId}`}>Report Dispute</Link>
                                        </Button>
                                        }
                                       
                                    </div>
                                    
                                </div>
                                }
                               
                            </CardContent>
                        </Card>
                    </div>
                    
                </div>

                {/* Gradient Background Effect */}
                <div className="fixed inset-0 -z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                </div>
            </div>
    );
};

export default CampaignInvestment;