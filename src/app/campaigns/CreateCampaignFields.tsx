"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Target, Users, Wallet, LineChart, BadgeDollarSign, Scale, Milestone, AlertTriangle, FileText } from "lucide-react";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

const formSchema = z.object({
    // Business Concept
    businessName: z.string().min(2, "Business name must be at least 2 characters"),
    businessIdea: z.string().min(10, "Please provide a detailed business idea"),
    valueProposition: z.string().min(10, "Please describe your value proposition"),
    businessModelDoc: z
        .instanceof(FileList)
        .refine((files) => files?.length === 1, "Business model document is required")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Only .pdf, .doc, and .docx files are accepted"
        )
        .optional(),
    businessPlanDoc: z
        .instanceof(FileList)
        .refine((files) => files?.length === 1, "Business plan document is required")
        .refine(
            (files) => files?.[0]?.size <= MAX_FILE_SIZE,
            "Max file size is 5MB"
        )
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
            "Only .pdf, .doc, and .docx files are accepted"
        )
        .optional(),

    // Market Analysis
    targetMarket: z.string().min(10, "Please describe your target market"),
    marketSize: z.string().min(1, "Please estimate your market size"),
    competitiveAnalysis: z.string().min(10, "Please provide competitive analysis"),

    // Business Model
    revenueStreams: z.string().min(10, "Please describe your revenue streams"),
    costStructure: z.string().min(10, "Please outline your cost structure"),

    // Business Plan
    executiveSummary: z.string().min(10, "Please provide an executive summary"),
    shortTermGoals: z.string().min(10, "Please list your short-term goals"),
    longTermGoals: z.string().min(10, "Please list your long-term goals"),
    marketingStrategy: z.string().min(10, "Please describe your marketing strategy"),

    // Operational Plan
    businessLocation: z.string().min(2, "Please specify your business location"),
    technologyNeeds: z.string().min(10, "Please list your technology needs"),
    supplyChain: z.string().min(10, "Please describe your supply chain"),

    // Management Team
    teamMembers: z.string().min(10, "Please list key team members"),
    rolesResponsibilities: z.string().min(10, "Please outline roles and responsibilities"),

    // Financial Projections
    startupCosts: z.string().min(1, "Please estimate your startup costs"),
    projectedRevenue: z.string().min(1, "Please provide projected revenue"),
    breakEvenPoint: z.string().min(1, "Please estimate break-even point"),

    // Funding Requirements
    fundingNeeded: z.string().min(1, "Please specify funding needed"),
    useOfFunds: z.string().min(10, "Please detail use of funds"),

    // Legal Structure
    businessEntity: z.string().min(2, "Please select business entity type"),
    licensesPermits: z.string().min(10, "Please list required licenses and permits"),

    // Risks and Challenges
    risksAndChallenges: z.string().min(10, "Please describe potential risks and challenges"),

    // Milestones and Metrics
    keyMilestones: z.string().min(10, "Please list key milestones"),
    metricsForSuccess: z.string().min(10, "Please specify metrics for success"),
});

export function CampaignForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        // Handle form submission
    }

    return (
        <div className="container mx-auto py-10">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center">Create Your Startup Campaign</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <Tabs defaultValue="business-concept" className="w-full">
                                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:grid-cols-10">
                                    <TabsTrigger value="business-concept">Concept</TabsTrigger>
                                    <TabsTrigger value="market-analysis">Market</TabsTrigger>
                                    <TabsTrigger value="business-model">Model</TabsTrigger>
                                    <TabsTrigger value="business-plan">Plan</TabsTrigger>
                                    <TabsTrigger value="operational">Operations</TabsTrigger>
                                    <TabsTrigger value="team">Team</TabsTrigger>
                                    <TabsTrigger value="financial">Financial</TabsTrigger>
                                    <TabsTrigger value="funding">Funding</TabsTrigger>
                                    <TabsTrigger value="legal">Legal</TabsTrigger>
                                    <TabsTrigger value="risks-milestones">Risks & Goals</TabsTrigger>
                                </TabsList>

                                {/* Business Concept Tab */}
                                <TabsContent value="business-concept" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Business Concept</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="businessName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter your business name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="businessIdea"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business Idea</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your product or service"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="valueProposition"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Value Proposition</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="What makes your offering unique?"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-5 w-5" />
                                            <h2 className="text-xl font-semibold">Document Upload</h2>
                                        </div>
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="businessModelDoc"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>Business Model Document</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={(e) => onChange(e.target.files)}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Upload your detailed business model (PDF, DOC, DOCX - Max 5MB)
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="businessPlanDoc"
                                            render={({ field: { value, onChange, ...field } }) => (
                                                <FormItem>
                                                    <FormLabel>Business Plan Document</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="file"
                                                            accept=".pdf,.doc,.docx"
                                                            onChange={(e) => onChange(e.target.files)}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormDescription>
                                                        Upload your complete business plan (PDF, DOC, DOCX - Max 5MB)
                                                    </FormDescription>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>

                                {/* Market Analysis Tab */}
                                <TabsContent value="market-analysis" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Target className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Market Analysis</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="targetMarket"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target Market</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your target customers"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="marketSize"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Market Size (in USD)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Estimated market size" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="competitiveAnalysis"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Competitive Analysis</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your competitors and SWOT analysis"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Business Model Tab */}
                                <TabsContent value="business-model" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <LineChart className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Business Model</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="revenueStreams"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Revenue Streams</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="How will your business make money?"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="costStructure"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Cost Structure</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Outline your fixed and variable costs"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Business Plan Tab */}
                                <TabsContent value="business-plan" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <FileText className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Business Plan</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="executiveSummary"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Executive Summary</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Provide a brief overview of your business"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="shortTermGoals"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Short-term Goals</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List your goals for the next 1-2 years"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="longTermGoals"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Long-term Goals</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List your goals for the next 3-5 years"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="marketingStrategy"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Marketing Strategy</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your marketing and customer acquisition plans"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Operational Plan Tab */}
                                <TabsContent value="operational" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Building2 className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Operational Plan</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="businessLocation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business Location</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Where will your business operate?" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="technologyNeeds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Technology Needs</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List required technology and tools"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="supplyChain"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Supply Chain</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Describe your supply chain process"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Management Team Tab */}
                                <TabsContent value="team" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Management Team</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="teamMembers"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Team Members</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List key team members and their backgrounds"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="rolesResponsibilities"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Roles & Responsibilities</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Outline who does what in the business"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Financial Projections Tab */}
                                <TabsContent value="financial" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Wallet className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Financial Projections</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="startupCosts"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Startup Costs (USD)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Initial costs needed" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="projectedRevenue"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Projected Annual Revenue (USD)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Expected revenue" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="breakEvenPoint"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Break-even Point (months)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Months to break-even" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Funding Requirements Tab */}
                                <TabsContent value="funding" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <BadgeDollarSign className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Funding Requirements</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="fundingNeeded"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Funding Needed (USD)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Amount of funding required" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="useOfFunds"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Use of Funds</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="How will the funds be used?"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Legal Structure Tab */}
                                <TabsContent value="legal" className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Scale className="h-5 w-5" />
                                        <h2 className="text-xl font-semibold">Legal Structure</h2>
                                    </div>
                                    <Separator />
                                    <FormField
                                        control={form.control}
                                        name="businessEntity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Business Entity Type</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select business entity type" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="llc">LLC</SelectItem>
                                                        <SelectItem value="corporation">Corporation</SelectItem>
                                                        <SelectItem value="partnership">Partnership</SelectItem>
                                                        <SelectItem value="soleProprietorship">Sole Proprietorship</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="licensesPermits"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Licenses & Permits</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="List required licenses and permits"
                                                        className="min-h-[100px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </TabsContent>

                                {/* Risks and Milestones Tab */}
                                <TabsContent value="risks-milestones" className="space-y-4">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="h-5 w-5" />
                                            <h2 className="text-xl font-semibold">Risks and Challenges</h2>
                                        </div>
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="risksAndChallenges"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Risks & Challenges</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Describe potential risks and mitigation strategies"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Milestone className="h-5 w-5" />
                                            <h2 className="text-xl font-semibold">Milestones and Metrics</h2>
                                        </div>
                                        <Separator />
                                        <FormField
                                            control={form.control}
                                            name="keyMilestones"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Key Milestones</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="List important milestones and timeline"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="metricsForSuccess"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Metrics for Success</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Define how you'll measure success"
                                                            className="min-h-[100px]"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </TabsContent>
                            </Tabs>

                            <Button type="submit" className="w-full">Submit Campaign</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}