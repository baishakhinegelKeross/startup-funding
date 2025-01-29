"use client";

// import { Collection, Document } from 'mongodb';
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
import Classes from './../page.module.css'
import { useRouter } from 'next/navigation'; 
import { usePathname } from 'next/navigation';
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
        return; // temp stop
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
            pendingCampaignId: pendingCampaignId, // change to actual fieldname and value
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
        router.push('/admin/pendingStartups');
    };

    const handleApproval = async function (campaignData: campaignData) {
        return; // temp stop
        const isValid = validation();
      
        if (!isValid) {
          console.error("Validation failed.");
          return;
        }
      
        try {
          // Check connection
          //await DBCollectionAccess("Campaigns", null); // Update collection name with actual name
          //console.log("Connection to 'Campaigns' collection successful.");
      
          // Proceed with API call
          const response = await fetch("/api/campaigns", { // update api route with actual route
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
                                    <CardTitle className="text-2xl text-[#8061FF]">{campaignData.campaignTitle}</CardTitle>
                                    <CardDescription>
                                        {campaignData.campaignDescription}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className='space-y-2 max-h-screen-20rem overflow-auto'>
                                    <div>
                                        {/* Render the HTML string safely */}
                                        {/*<div dangerouslySetInnerHTML={{ __html: pitch }} />*/}
                                
                                        <div className="pitch-section grid gap-4">
                                            <div>
                                                <h2 className="text-xl font-semibold text-[#8061FF]">
                                                    Introduction
                                                </h2>
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
                                    <CardTitle className="text-2xl">Fund requirements</CardTitle>
                                    <CardDescription>
                                        Funding details of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: fundingNDetails }} />
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
                                    <CardTitle className="text-2xl">Team and Background</CardTitle>
                                    <CardDescription>
                                    Team and Background of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: teamAndBackground }} />
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
                                    <CardTitle className="text-2xl">Business and Market</CardTitle>
                                    <CardDescription>
                                        InnovateX&apos;s bussiness plan and market
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: bussinessAndMarket }} />
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
                                    <CardTitle className="text-2xl">Planning and Execution</CardTitle>
                                    <CardDescription>
                                        Planning and execution of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: planningAndExecution }} />
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
                                    <CardTitle className="text-2xl">Legal and Compliance</CardTitle>
                                    <CardDescription>
                                        Legal and Compliance details of InnovateX
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: legalAndComplaince }} />
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
                                    <CardTitle className="text-2xl">Contact Information</CardTitle>
                                    <CardDescription>
                                        InnovateX&apos;s contact details
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2 max-h-96 overflow-auto">
                                    <div>
                                        {/* Render the HTML string safely */}
                                        <div dangerouslySetInnerHTML={{ __html: contactInformation }} />
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