"use client";

// import { Collection, Document } from 'mongodb';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { 
    Users, 
    LineChart, 
    Award, 
    Network, 
    DollarSign, 
    TrendingUp, 
    Target, 
    Rocket, 
    Brain, 
    Globe, 
    Shield,  
    AlertTriangle, 
    Mail,
    Video,
    LayoutDashboard,
    MessageCircle,
    CheckCircle2 ,
    FileCheck, 
    Lock, 
    UserCheck, 
    Undo2,
    Lightbulb,
    Scale,
    FileText,
    Phone,
    Eye,
    Share2
} from "lucide-react";
  
import Classes from './../page.module.css'
import { useRouter } from 'next/navigation'; 
import { usePathname } from 'next/navigation';
import { Separator } from "@/components/ui/separator"
//import DBCollectionAccess from "@/lib/dbconnect";
//import { redirect } from "next/navigation"

interface ApprovalTabsProps{
    campaignData: {
        campaignId: string,
        campaignTitle: string,
        campaignDescription: string
    },
    pitch: string,
    fundingNDetails: string,
    teamAndBackground: string,
    bussinessAndMarket: string,
    planningAndExecution: string,
    legalAndComplaince: string,
    contactInformation: string
}

type campaignData = {
    campaignId: string,
    campaignTitle: string,
    campaignDescription: string
}

const AdminApprovalTabs:React.FC<ApprovalTabsProps> = ({campaignData, pitch, fundingNDetails, teamAndBackground, bussinessAndMarket, planningAndExecution, legalAndComplaince, contactInformation})=>{
    const router = useRouter();
    const currentPathName = usePathname();
    const status: string = "pending";
    const submittedAt = "28/1/2025, 11:48:35 am";

    debugger;
    console.log(campaignData);

    const validation = function(){
        let isValid = true;
        const comment = document.getElementById('adminComment') as HTMLTextAreaElement;
        const commentFlag = document.getElementById('adminCommentFlag');
    
        if(comment?.value){
            commentFlag?.classList.add('hidden');
        }
        else{
            commentFlag?.classList.remove('hidden');
            isValid = false;
        }
    
        return isValid;
    }

    const handleRequestChange = async function (pendingCampaignId: string) {
        const isValid = validation();
        const commentEle = document.getElementById('adminComment') as HTMLTextAreaElement;
      
        if (!isValid) {
          console.error("Validation failed.");
          return;
        }
      
        try {
          // Check connection
          //await DBCollectionAccess("Campaigns", null); // Update collection name with actual name
          //console.log("Connection to 'Campaigns' collection successful.");
    
          const campaignData = {
            _id: pendingCampaignId, // change to actual fieldname and value
            status: 'Change Requested', // change to actual fieldname
            comment: commentEle.value // Set or update comment field
          }
      
          // Proceed with API call
          const response = await fetch("/api/pendingCampaigns", { // update api route with actual route
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(campaignData),
          });
      
          const data = await response.json();
      
          if (response.ok) {
            alert(`Campaigns added successfully! ID: ${data.userId}`);
          } else {
            alert(`Error: ${data.message}`);
          }
        } catch (error) {
          console.error("Error in handleApproval:", error);
          alert("An unexpected error occurred. Please try again.");
        }
    
        // Redirect to pending campaigns
        router.push('/dashboard');
    };

    const handleApproval = async function (campaignData: campaignData) {
        const campaignId = campaignData._id
        const baseUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/admin/request/campaignResponses?id=${campaignId}`;
        //const campaignId = '6785f626cb0c0ebbc57cbef2'; // Extracted _id from the URL

        // const data = {
        // _id: campaignId
        // };

        //const isValid = validation();
        //const commentEle = document.getElementById('adminComment') as HTMLTextAreaElement;

        ;
        //const url = process.env.NEXT_PUBLIC_APPROVAL_URL + "?id='" + campaignId + "'";


      
        // if (!isValid) {
        //   console.error("Validation failed.");
        //   return;
        // }

        //let campaignData2 = campaignData;

        //campaignData2.status = 'active';
        //campaignData2.comment = commentEle.value;


        //http://localhost:8000/admin/request/campaignResponses?id="6798b76bfdb55e38073b1572"
        try {
          // Check connection
          //await DBCollectionAccess("Campaigns", null); // Update collection name with actual name
          //console.log("Connection to 'Campaigns' collection successful.");
      
          // Proceed with API call
        //   const response = await fetch("/api/campaigns", { // update api route with actual route
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(campaignData2),
        //   });
      
        //   const data = await response.json();
      
        //   if (response.ok) {
        //     alert(`Campaigns added successfully! ID: ${data.userId}`);
        //   } else {
        //     alert(`Error: ${data.message}`);
        //   }


        // await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, JSON.stringify(submittedData), {
        //     headers: { 'Content-Type': 'application/json' },
        //     withCredentials: true
        //   })

            axios.post(baseUrl,{},{withCredentials: true})
            .then((response: { status: number; data: any; }) => {
                if (response.status === 200) {
                    console.log('Request successful:', response.data);
                } else {
                    console.log('Request failed with status:', response.status);
                }
            })
            .catch((error: any) => {
                console.error('Error making request:', error);
            });

        } catch (error) {
          console.error("Error in handleApproval:", error);
          alert("An unexpected error occurred. Please try again.");
        }

        // Redirect to pending campaigns
        router.push('/dashboard');
    };

    const getStatusBadge = () => {
        switch (status) {
            case "approved":
                return <Badge className="bg-green-500">Approved</Badge>;
            case "changes_requested":
                return <Badge className="bg-yellow-500">Changes Requested</Badge>;
            default:
                return <Badge className="bg-blue-500">Pending Review</Badge>;
        }
    };
    
    return (
        <div className="container mx-auto">
            <Card>
                <CardHeader className="space-y-4">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-3xl font-bold">Campaign Review</CardTitle>
                        {getStatusBadge()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                        Submitted: {submittedAt}
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="projectOverview" className="w-full">
                        <TabsList className="grid w-full grid-cols-8">
                            <TabsTrigger className={Classes.tablist} value="projectOverview">Project Overview</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="fundingDetails">Funding Details</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="teamAndBackground">Team & Background</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="bussinessAndMarket">Business & Market</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="planningAndExecution">Planning & Execution</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="legalAndComplaince">Legal & Compliance</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="contactInformation">Contact Information</TabsTrigger>
                            <TabsTrigger className={Classes.tablist}  value="actions">Actions</TabsTrigger>
                        </TabsList>

                        <TabsContent value="projectOverview">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-[#8061FF] hidden">{campaignData.campaignTitle}</CardTitle>
                                    <CardDescription className="hidden">
                                        {campaignData.campaignDescription}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2 max-h-screen-20rem overflow-auto'>
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: pitch }} />*/}

                                        <div className="pitch-section grid gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#8061FF]">
                                                    Introduction
                                                </h3>
                                                <p className="text-sm">
                                                    In today’s fast-paced, innovation-driven economy, countless brilliant ideas never see the light of day simply because aspiring entrepreneurs lack the resources to transform their visions into reality. 
                                                    InnovateX bridges this gap by creating a robust platform that empowers innovators to bring their ideas to life, unlocking unprecedented opportunities for growth and success.
                                                </p>
                                                <p className="text-sm">
                                                    At InnovateX, we aim to redefine how startups access funding, mentorship, and resources. Our mission is simple yet powerful: to provide a streamlined, data-driven ecosystem where entrepreneurs, investors, and mentors converge to fuel transformative ideas. InnovateX is not just a service; it is a movement designed to empower the next wave of creators, thinkers, and problem-solvers.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">The Problem</h3>
                                                <p className="text-sm">
                                                    Over 90% of startups fail within their first five years. The primary reasons? Lack of funding, mentorship, and market validation. Investors, on the other hand, often struggle to identify high-potential startups amidst the noise, wasting time and resources on unvetted pitches. This disconnect between innovators and investors stifles innovation and limits market growth.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">The Solution</h3>
                                                <p className="text-sm">
                                                    InnovateX is a platform-driven accelerator designed to address these inefficiencies. We leverage cutting-edge technology to curate, assess, and support promising startups while ensuring investors gain access to high-quality, de-risked opportunities.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <p className="text-sm">Here’s how InnovateX works:</p>
                                                <ol className="text-sm">
                                                    <li>Startup Onboarding: Entrepreneurs submit their ideas through our platform, where AI-powered analysis evaluates their market potential, feasibility, and scalability.</li>
                                                    <li>Mentorship Matching: We connect startups with industry-specific mentors, enabling guided development and strengthening business models.</li>
                                                    <li>Investor Opportunities: Investors gain exclusive access to pre-vetted startups, categorized by sector, growth stage, and risk profile.</li>
                                                    <li>End-to-End Support: From funding to scaling, InnovateX provides startups with the tools, training, and market insights they need to succeed.</li>
                                                </ol>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">Why Invest in InnovateX?</h3>
                                                <ol className="text-sm">
                                                    <li>Massive Market Potential: With over 300 million startups worldwide and a global venture capital market projected to reach $1.2 trillion by 2030, the demand for a centralized innovation hub has never been higher.</li>
                                                    <li>Proven Revenue Model: Our subscription-based model for investors, combined with equity-based partnerships with startups, ensures steady cash flow and long-term growth potential.</li>
                                                    <li>Cutting-Edge Technology: InnovateX leverages AI, big data, and predictive analytics to identify high-potential startups and track market trends, creating a competitive edge.</li>
                                                    <li>Scalability: Our platform is designed to scale globally, offering seamless integration with regional markets and creating localized opportunities.</li>
                                                </ol>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">Our Impact</h3>
                                                <p className="text-sm">
                                                    By investing in InnovateX, you’re not just funding a business—you’re fueling innovation and enabling a global wave of startups to create jobs, solve real-world problems, and transform industries. Our vision is to democratize access to resources and opportunities for creators, ensuring no great idea goes unnoticed.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">The Ask</h3>
                                                <p className="text-sm">
                                                    We are seeking $5 million in funding to expand our platform’s capabilities, enhance our AI technology, and grow our user base. Your investment will allow us to penetrate key markets, onboard more startups, and create a vibrant, self-sustaining ecosystem of innovation.
                                                </p>
                                            </div>
                                            
                                            <div>
                                                <h3 className="font-medium mb-2 text-[#8061FF]">Join Us</h3>
                                                <p className="text-sm">
                                                    InnovateX is more than an investment opportunity—it’s a chance to be at the forefront of a revolution in innovation. Together, we can transform ideas into impactful ventures and create a brighter future for generations to come.
                                                </p>
                                            </div>

                                            <p className="text-sm">Let’s build the future together. Innovate with InnovateX.</p>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="fundingDetails">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Fund requirements</CardTitle>
                                    <CardDescription className="hidden">
                                        Funding details of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: fundingNDetails }} />*/}

                                        <div className="funding-details grid gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[#8061FF]">Goal</h3>
                                                <p className="text-sm">
                                                    We aim to raise <strong>₹10,00,000 (INR)</strong> to develop and launch InnovateX, our cutting-edge online platform that empowers startups to connect, collaborate, and grow. This funding goal is meticulously calculated to ensure efficient use of resources and guarantee a successful product launch.
                                                </p>
                                            </div>

                                            <div>
                                                <h3 className="text-xl font-semibold text-[#8061FF]">Budget Breakdown</h3>
                                                <p className="text-sm">Here’s a transparent breakdown of how the funds will be utilized:</p>
                                                <ul>
                                                    <li>
                                                    <strong className="text-md">Platform Development (50% - ₹5,00,000)</strong>
                                                    <ul>
                                                        <li className="text-sm">Building and optimizing the InnovateX web platform with seamless user experience, including core features like startup profiles, collaboration tools, and funding dashboards.</li>
                                                    </ul>
                                                    </li>
                                                    <li>
                                                    <strong className="text-md">Marketing & Outreach (30% - ₹3,00,000)</strong>
                                                    <ul>
                                                        <li className="text-sm">Social media campaigns, paid advertisements, and strategic partnerships to reach our target audience of startups, investors, and mentors.</li>
                                                    </ul>
                                                    </li>
                                                    <li>
                                                    <strong className="text-md">Operations & Team (15% - ₹1,50,000)</strong>
                                                    <ul>
                                                        <li className="text-sm">Hiring skilled developers, designers, and marketing personnel to ensure a robust and scalable platform.</li>
                                                    </ul>
                                                    </li>
                                                    <li>
                                                    <strong className="text-md">Legal & Compliance (5% - ₹50,000)</strong>
                                                    <ul>
                                                        <li className="text-sm">Covering necessary registrations, legal documentation, and compliance with industry standards to provide a secure and trustworthy platform.</li>
                                                    </ul>
                                                    </li>
                                                </ul>
                                            </div>   

                                            <div>
                                                <h3 className="text-xl font-semibold text-[#8061FF]">Rewards or Incentives (if applicable)</h3>
                                                <p className="text-sm">We value our contributors and have designed exclusive rewards to show our appreciation:</p>
                                                <ul>
                                                    <li>
                                                        <strong className="text-md">Supporter Tier (₹500 - ₹4,999)</strong>
                                                        <ul>
                                                            <li className="text-sm">A thank-you email and a special mention on our website as a &quot;Founding Supporter.&quot;</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong className="text-md">Collaborator Tier (₹5,000 - ₹24,999)</strong>
                                                        <ul>
                                                            <li className="text-sm">Exclusive early access to InnovateX and a personalized shout-out on our social media pages.</li>
                                                        </ul>
                                                    </li>
                                                    <li>
                                                        <strong className="text-md">Partner Tier (₹25,000+)</strong>
                                                        <ul>
                                                            <li className="text-sm">Lifetime premium membership of InnovateX, access to advanced tools, and a featured badge on your startup’s profile.</li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="teamAndBackground">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Team and Background</CardTitle>
                                    <CardDescription className="hidden">
                                        Team and Background of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: teamAndBackground }} />*/}

                                        <div className="bg-background text-foreground">
                                            {/* Hero Section */}
                                            <div className="relative bg-black">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                                <div className="text-center">
                                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                    Meet the InnovateX Team
                                                    </h1>
                                                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                                                    A collective of visionaries, innovators, and industry experts driving the future of startup success.
                                                    </p>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Founder Section */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <Card className="p-8 bg-card">
                                                <h2 className="text-3xl font-bold mb-6">The Visionary</h2>
                                                <p className="text-muted-foreground leading-7">
                                                    The visionary behind InnovateX is a seasoned entrepreneur with over a decade of experience in the startup ecosystem. 
                                                    With a strong background in business strategy, technology, and venture capital, the founder has successfully scaled 
                                                    multiple startups and facilitated over $50 million in funding for innovative projects.
                                                </p>
                                                </Card>
                                            </section>

                                            {/* Team Members */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-12">Leadership Team</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                {/* John Carter */}
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Avatar className="w-24 h-24 mb-4">
                                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-2xl font-semibold">JC</span>
                                                        </div>
                                                    </Avatar>
                                                    <h3 className="text-xl font-semibold mb-2">John Carter</h3>
                                                    <Badge className="mb-4">Chief Technology Officer</Badge>
                                                    <p className="text-sm text-muted-foreground">
                                                        A software architect with 15 years of expertise in AI, big data, and platform development.
                                                    </p>
                                                    </div>
                                                </Card>

                                                {/* Sarah Mitchell */}
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Avatar className="w-24 h-24 mb-4">
                                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-2xl font-semibold">SM</span>
                                                        </div>
                                                    </Avatar>
                                                    <h3 className="text-xl font-semibold mb-2">Sarah Mitchell</h3>
                                                    <Badge className="mb-4">Head of Partnerships</Badge>
                                                    <p className="text-sm text-muted-foreground">
                                                        12+ years of experience in corporate partnerships and venture funding.
                                                    </p>
                                                    </div>
                                                </Card>

                                                {/* Emily Zhang */}
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Avatar className="w-24 h-24 mb-4">
                                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-2xl font-semibold">EZ</span>
                                                        </div>
                                                    </Avatar>
                                                    <h3 className="text-xl font-semibold mb-2">Emily Zhang</h3>
                                                    <Badge className="mb-4">Marketing Director</Badge>
                                                    <p className="text-sm text-muted-foreground">
                                                        Digital marketing expert with proven track record in scaling startups.
                                                    </p>
                                                    </div>
                                                </Card>

                                                {/* David Singh */}
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Avatar className="w-24 h-24 mb-4">
                                                        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                                                        <span className="text-2xl font-semibold">DS</span>
                                                        </div>
                                                    </Avatar>
                                                    <h3 className="text-xl font-semibold mb-2">David Singh</h3>
                                                    <Badge className="mb-4">Operations Lead</Badge>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expert in operations management and business analytics.
                                                    </p>
                                                    </div>
                                                </Card>
                                                </div>
                                            </section>

                                            {/* Track Record */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-12">Track Record</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <LineChart className="w-12 h-12 mb-4 text-primary" />
                                                    <h3 className="text-2xl font-bold mb-2">$1B+</h3>
                                                    <p className="text-sm text-muted-foreground">Combined startup valuations</p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Users className="w-12 h-12 mb-4 text-primary" />
                                                    <h3 className="text-2xl font-bold mb-2">100+</h3>
                                                    <p className="text-sm text-muted-foreground">Startups funded</p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Network className="w-12 h-12 mb-4 text-primary" />
                                                    <h3 className="text-2xl font-bold mb-2">500+</h3>
                                                    <p className="text-sm text-muted-foreground">Investors and mentors</p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Award className="w-12 h-12 mb-4 text-primary" />
                                                    <h3 className="text-2xl font-bold mb-2">5</h3>
                                                    <p className="text-sm text-muted-foreground">Tech platforms launched</p>
                                                    </div>
                                                </Card>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="bussinessAndMarket">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Business and Market</CardTitle>
                                    <CardDescription className="hidden">
                                        InnovateX&apos;s bussiness plan and market
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: bussinessAndMarket }} />*/}

                                        <div className="min-h-screen bg-background text-foreground">
                                            {/* Hero Section */}
                                            <div className="relative bg-black">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                                <div className="text-center">
                                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                    InnovateX Business Model
                                                    </h1>
                                                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                                                    A revolutionary platform connecting startups with investors through AI-powered assessment and mentorship.
                                                    </p>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Business Model Section */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-8">Revenue Streams</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <DollarSign className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Subscription Model</h3>
                                                        <p className="text-muted-foreground">
                                                        Monthly subscription fees from investors for access to pre-vetted startups and premium features.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>
                                                
                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <TrendingUp className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Equity Partnerships</h3>
                                                        <p className="text-muted-foreground">
                                                        Strategic equity stakes in onboarded startups, creating long-term value as companies scale.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>
                                                </div>

                                                {/* Premium Services */}
                                                <h3 className="text-2xl font-semibold mb-6">Premium Services</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                                                <Card className="p-6 bg-card">
                                                    <Brain className="w-6 h-6 text-primary mb-4" />
                                                    <h4 className="font-semibold mb-2">Mentorship Packages</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                    Personalized guidance from industry experts
                                                    </p>
                                                </Card>
                                                
                                                <Card className="p-6 bg-card">
                                                    <Target className="w-6 h-6 text-primary mb-4" />
                                                    <h4 className="font-semibold mb-2">Market Research</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                    Tailored market analysis and insights
                                                    </p>
                                                </Card>
                                                
                                                <Card className="p-6 bg-card">
                                                    <Users className="w-6 h-6 text-primary mb-4" />
                                                    <h4 className="font-semibold mb-2">Exclusive Events</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                    Network with top investors and founders
                                                    </p>
                                                </Card>
                                                </div>

                                                {/* Market Analysis */}
                                                <h2 className="text-3xl font-bold mb-8">Market Analysis</h2>
                                                <Card className="p-8 bg-card mb-12">
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                                                    <div className="text-center">
                                                    <h3 className="text-4xl font-bold text-primary mb-2">300M+</h3>
                                                    <p className="text-muted-foreground">Global Startups</p>
                                                    </div>
                                                    <div className="text-center">
                                                    <h3 className="text-4xl font-bold text-primary mb-2">$1.2T</h3>
                                                    <p className="text-muted-foreground">VC Market by 2030</p>
                                                    </div>
                                                    <div className="text-center">
                                                    <h3 className="text-4xl font-bold text-primary mb-2">25%</h3>
                                                    <p className="text-muted-foreground">Angel Investor Growth</p>
                                                    </div>
                                                </div>
                                                <Separator className="my-8" />
                                                <div className="space-y-4">
                                                    <h4 className="text-xl font-semibold mb-4">Key Market Insights</h4>
                                                    <ul className="space-y-3 text-muted-foreground">
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                                                        <span>Record funding levels in tech sector during 2023</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                                                        <span>Rising demand for mentorship-driven accelerators</span>
                                                    </li>
                                                    <li className="flex items-start space-x-3">
                                                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                                                        <span>Shift toward platform-driven investment opportunities</span>
                                                    </li>
                                                    </ul>
                                                </div>
                                                </Card>

                                                {/* Competitive Advantages */}
                                                <h2 className="text-3xl font-bold mb-8">Our Competitive Edge</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Brain className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">AI-Powered Assessment</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Smart evaluation of startups using advanced AI algorithms
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Users className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Mentorship-Driven</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Expert guidance beyond just funding
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Rocket className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">End-to-End Support</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Comprehensive tools and resources for scaling
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Globe className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Global Scalability</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Designed for worldwide market expansion
                                                    </p>
                                                    </div>
                                                </Card>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="planningAndExecution">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Planning and Execution</CardTitle>
                                    <CardDescription className="hidden">
                                        Planning and execution of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: planningAndExecution }} />*/}

                                        <div className="min-h-screen bg-background text-foreground">
                                            {/* Hero Section */}
                                            <div className="relative bg-black">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                                <div className="text-center">
                                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                    InnovateX Roadmap
                                                    </h1>
                                                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                                                    Our journey to revolutionize the startup ecosystem through AI-powered assessment and mentorship.
                                                    </p>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Timeline Section */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-8">Timeline and Milestones</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                                                <Card className="p-6 bg-card relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2">
                                                    <Badge variant="secondary">Months 1-6</Badge>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-4 mt-6">Phase 1: Platform Development</h3>
                                                    <ul className="space-y-3 text-muted-foreground">
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Core platform architecture</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>AI-powered evaluation system</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Beta testing phase</span>
                                                    </li>
                                                    </ul>
                                                </Card>

                                                <Card className="p-6 bg-card relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2">
                                                    <Badge variant="secondary">Months 7-12</Badge>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-4 mt-6">Phase 2: Market Expansion</h3>
                                                    <ul className="space-y-3 text-muted-foreground">
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Public launch</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>First 100 startups</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Regional expansion</span>
                                                    </li>
                                                    </ul>
                                                </Card>

                                                <Card className="p-6 bg-card relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2">
                                                    <Badge variant="secondary">Months 13-24</Badge>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-4 mt-6">Phase 3: Global Scaling</h3>
                                                    <ul className="space-y-3 text-muted-foreground">
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Global expansion</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>AI system refinement</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>1,000 startups milestone</span>
                                                    </li>
                                                    </ul>
                                                </Card>

                                                <Card className="p-6 bg-card relative overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-2">
                                                    <Badge variant="secondary">Beyond Year 2</Badge>
                                                    </div>
                                                    <h3 className="text-xl font-semibold mb-4 mt-6">Phase 4: Innovation</h3>
                                                    <ul className="space-y-3 text-muted-foreground">
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Additional services</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Market research tools</span>
                                                    </li>
                                                    <li className="flex items-start space-x-2">
                                                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                                                        <span>Platform refinement</span>
                                                    </li>
                                                    </ul>
                                                </Card>
                                                </div>

                                                {/* Risk Assessment */}
                                                <h2 className="text-3xl font-bold mb-8">Risk Assessment</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <AlertTriangle className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Market Competition</h3>
                                                        <p className="text-muted-foreground">
                                                        Maintaining competitive edge through unique AI-driven approach and mentorship services.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <Target className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Technology Adoption</h3>
                                                        <p className="text-muted-foreground">
                                                        Addressing resistance through training and data-backed evidence of system efficacy.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <TrendingUp className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Platform Scalability</h3>
                                                        <p className="text-muted-foreground">
                                                        Utilizing cloud infrastructure to ensure smooth scaling without compromising quality.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <Shield className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Regulatory Compliance</h3>
                                                        <p className="text-muted-foreground">
                                                        Working with legal experts to ensure compliance with local laws and data protection.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>
                                                </div>

                                                {/* Communication Plan */}
                                                <h2 className="text-3xl font-bold mb-8">Updates and Communication</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Mail className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Regular Updates</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Monthly newsletters with progress updates and features
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Video className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Exclusive Webinars</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Quarterly interactive sessions with the team
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <LayoutDashboard className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Backer Portal</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Real-time progress tracking and exclusive content
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <MessageCircle className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Open Communication</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Transparent updates on challenges and achievements
                                                    </p>
                                                    </div>
                                                </Card>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="legalAndComplaince">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Legal and Compliance</CardTitle>
                                    <CardDescription className="hidden">
                                        Legal and Compliance details of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: legalAndComplaince }} />*/}

                                        <div className="min-h-screen bg-background text-foreground">
                                            {/* Hero Section */}
                                            <div className="relative bg-black">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                                <div className="text-center">
                                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                    Legal Framework
                                                    </h1>
                                                    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                                                    Our commitment to maintaining a secure and compliant platform for startups and investors.
                                                    </p>
                                                </div>
                                                </div>
                                            </div>

                                            {/* Legal and Compliance Section */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-8">Compliance Framework</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <FileCheck className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Permits and Licenses</h3>
                                                        <p className="text-muted-foreground">
                                                        Comprehensive business licensing and compliance with local business and tax laws across all operating regions.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <Lock className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Data Protection</h3>
                                                        <p className="text-muted-foreground">
                                                        Strict adherence to GDPR and CCPA regulations with robust encryption and secure data management practices.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <UserCheck className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">AML and KYC</h3>
                                                        <p className="text-muted-foreground">
                                                        Comprehensive identity verification and fund source validation for all platform participants.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex items-start space-x-4">
                                                    <Globe className="w-8 h-8 text-primary mt-1" />
                                                    <div>
                                                        <h3 className="text-xl font-semibold mb-3">Regional Compliance</h3>
                                                        <p className="text-muted-foreground">
                                                        Expert-guided adherence to specific regulations in financial services and startup acceleration.
                                                        </p>
                                                    </div>
                                                    </div>
                                                </Card>
                                                </div>

                                                {/* Legal Terms Section */}
                                                <h2 className="text-3xl font-bold mb-8">Legal Terms and Disclaimers</h2>
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col space-y-4">
                                                    <DollarSign className="w-12 h-12 text-primary" />
                                                    <h3 className="text-xl font-semibold">Usage of Funds</h3>
                                                    <p className="text-muted-foreground">
                                                        Transparent allocation towards platform development, marketing, and technology improvements.
                                                    </p>
                                                    <Badge className="w-fit">Quarterly Reports</Badge>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col space-y-4">
                                                    <Undo2 className="w-12 h-12 text-primary" />
                                                    <h3 className="text-xl font-semibold">Refund Policy</h3>
                                                    <p className="text-muted-foreground">
                                                        Campaign-specific refund terms determined by individual startups and entrepreneurs.
                                                    </p>
                                                    <Badge className="w-fit">Terms Apply</Badge>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col space-y-4">
                                                    <Lightbulb className="w-12 h-12 text-primary" />
                                                    <h3 className="text-xl font-semibold">Intellectual Property</h3>
                                                    <p className="text-muted-foreground">
                                                        Protected innovation rights with comprehensive licensing agreements.
                                                    </p>
                                                    <Badge className="w-fit">Full Protection</Badge>
                                                    </div>
                                                </Card>
                                                </div>

                                                {/* Additional Terms */}
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Users className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Investor Terms</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Clear risk disclosure and investment guidelines for all platform participants
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <FileText className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">NDAs</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Mandatory confidentiality agreements protecting all shared information
                                                    </p>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-card">
                                                    <div className="flex flex-col items-center text-center">
                                                    <Scale className="w-12 h-12 text-primary mb-4" />
                                                    <h3 className="font-semibold mb-2">Dispute Resolution</h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        Structured arbitration process following international standards
                                                    </p>
                                                    </div>
                                                </Card>
                                                </div>

                                                {/* Liability Notice */}
                                                <Card className="mt-16 p-6 bg-card border-destructive">
                                                <div className="flex items-start space-x-4">
                                                    <AlertTriangle className="w-8 h-8 text-destructive mt-1" />
                                                    <div>
                                                    <h3 className="text-xl font-semibold mb-3">Liability Limitations</h3>
                                                    <p className="text-muted-foreground">
                                                        While InnovateX strives to provide a secure and reliable platform, we limit our liability to the fullest extent permitted by law. InnovateX is not responsible for startup failures, legal issues, or external factors beyond our control.
                                                    </p>
                                                    </div>
                                                </div>
                                                </Card>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="contactInformation">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl hidden">Contact Information</CardTitle>
                                    <CardDescription className="hidden">
                                        InnovateX&apos;s contact details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-screen-20rem overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: contactInformation }} />*/}

                                        <div className="min-h-screen bg-background text-foreground">
                                            {/* Hero Section */}
                                            <div className="relative bg-black">
                                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                                                    <div className="text-center">
                                                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                                            Accessible Communication Channels
                                                        </h1>
                                                        <p className="mt-6 text-lg leading-8 text-gray-300 max-w-3xl mx-auto">
                                                            We at InnovateX prioritize open and accessible communication. Reach out to us through the following channels:
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Communication Channels Section */}
                                            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                                                <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                                    <Card className="p-6 bg-card">
                                                        <div className="flex items-start space-x-4">
                                                            <Mail className="w-8 h-8 text-primary mt-1" />
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-3">Email</h3>
                                                                <p className="text-muted-foreground">
                                                                    support@innovatex.com
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>

                                                    <Card className="p-6 bg-card">
                                                        <div className="flex items-start space-x-4">
                                                            <Phone className="w-8 h-8 text-primary mt-1" />
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-3">Phone</h3>
                                                                <p className="text-muted-foreground">
                                                                    +1-800-INNOVEX (+1-800-466-6839)
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>

                                                    <Card className="p-6 bg-card">
                                                        <div className="flex items-start space-x-4">
                                                            <Globe className="w-8 h-8 text-primary mt-1" />
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-3">Website</h3>
                                                                <p className="text-muted-foreground">
                                                                    www.innovatex.com
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>

                                                    <Card className="p-6 bg-card">
                                                        <div className="flex items-start space-x-4">
                                                            <Share2 className="w-8 h-8 text-primary mt-1" />
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-3">Social Media</h3>
                                                                <p className="text-muted-foreground">
                                                                    Twitter, Facebook, LinkedIn, Instagram
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </div>

                                                {/* Transparency Section */}
                                                <h2 className="text-3xl font-bold mb-8">Transparency</h2>
                                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-16">
                                                    <Card className="p-6 bg-card">
                                                        <div className="flex flex-col space-y-4">
                                                            <Eye className="w-12 h-12 text-primary mx-auto" />
                                                            <h3 className="text-xl font-semibold text-center">Our Commitment</h3>
                                                            <p className="text-muted-foreground">
                                                                At InnovateX, we are committed to maintaining transparency and accountability. All communication channels listed above are actively monitored by our support team to ensure timely and effective responses to your inquiries. Whether you have questions about our platform, partnerships, or investment opportunities, feel free to get in touch with us.
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </div>

                                                {/* Feedback Section */}
                                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                                                    <Card className="p-6 bg-card">
                                                        <div className="flex flex-col items-center text-center">
                                                            <MessageCircle className="w-12 h-12 text-primary mb-4" />
                                                            <h3 className="font-semibold mb-2">We Value Your Feedback</h3>
                                                            <p className="text-sm text-muted-foreground">
                                                                We value your feedback and are here to assist with any concerns or inquiries you may have. Let’s innovate together!
                                                            </p>
                                                        </div>
                                                    </Card>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button>Next</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>

                        <TabsContent value="actions">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl">Actions</CardTitle>
                                    <CardDescription>
                                        Campaign Actions for InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div className="space-y-1">
                                        <Label htmlFor="adminComment">Comment</Label>
                                        <Textarea id="adminComment" className="min-h-80"  placeholder="Enter your comment ..."/>
                                        <p id="adminCommentFlag" className="text-red-700 hidden">
                                            Please enter comment!
                                        </p>
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button className="me-2" onClick={()=>{ handleRequestChange(currentPathName)} }>Request Changes</Button>
                                    <Button onClick={()=>{ handleApproval(campaignData) }}>Approve</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>

        
    );
}

/*
const handleRequestChange_old = async function(router: ReturnType<typeof useRouter>, pendingCampaignId: string){
    return; // temp stop
    
    const isValid = validation();
    const commentEle = document.getElementById('adminComment') as HTMLTextAreaElement;
    
    const updateStatus = async function(collection:Collection<Document>) {
        try{
            const updateResult = await collection.updateOne(
                { 
                    pendingCampaignId: pendingCampaignId // change to actual fieldname and value 
                },
                { 
                    $set: { 
                        status: 'Change Requested', // change to actual fieldname
                        comment: commentEle.value // Set or update comment field 
                    } 
                }
              );
        
              return updateResult;
        }
        catch(err){
            console.error(err);
        }
    }

    if (!isValid) {
        console.error("Validation failed.");
        return;
    }
    
    
    try {
        // Check connection
        await DBCollectionAccess("PendingStartups", (collection: Collection<Document>)=>{
            updateStatus(collection);
        }); // Update collection name with actual name
        console.log("Connection to 'PendingStartups' collection successful.");


    } catch (error) {
        console.error("Error in handleRequestChange:", error);
        alert("An unexpected error occurred. Please try again.");
    }

    // Redirect to pending campaigns
    router.push('http://localhost:3000/admin/pendingStartups');
    
}
*/

export default AdminApprovalTabs