import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    PlusCircle,
    MinusCircle,
    AlertCircle,
    Save,
    ArrowLeft,
    X,
    ChevronRight,
    ChevronLeft,
    UserPlus,
    Sparkles,
    Target,
    Users,
    Link,
    DollarSign,
    Building2,
    GraduationCap,
    Briefcase,
    Milestone,
    Scale,
    BadgeDollarSign,
    FileText,
    LineChart,
    Wallet,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormItem, FormMessage, FormDescription, FormLabel, FormField, FormControl } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCampaignStore } from '@/store/campaign-store';
import type { Startup, Currency, Campaign } from '@/types';
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const CATEGORIES = [
    'CleanTech',
    'FinTech',
    'HealthTech',
    'EdTech',
    'AI/ML',
    'Blockchain',
    'IoT',
    'Other',
];

const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

const TABS = [
    { id: 'details', label: 'Campaign Details', icon: Target },
    { id: 'additional', label: 'Additional Info', icon: Sparkles },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'pitch', label: 'Campaign Pitch', icon: AlertCircle },
    { id: 'business-concept', label: 'Business Concept', icon: Building2 },
    { id: 'market-analysis', label: 'Market Analysis', icon: Target },
    { id: 'business-model', label: 'Business Model', icon: LineChart },
    { id: 'business-plan', label: 'Business Plan', icon: FileText },
    { id: 'operational', label: 'Operational Plan', icon: Building2 },
    { id: 'management-team', label: 'Management Team', icon: Users },
    { id: 'financial-projections', label: 'Financial Projections', icon: Wallet },
    { id: 'funding-requirements', label: 'Funding Requirements', icon: BadgeDollarSign },
    { id: 'legal-structure', label: 'Legal Structure', icon: Scale },
    { id: 'risks-milestones', label: 'Risks & Milestones', icon: Milestone },
];

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

// const formSchema = z.object({
//     // highlights: z.array(z.object({ description: z.string() })).optional(),
//     highlights: z.array(z.object({
//         description: z.string(),
//         id: z.number().optional()
//     })).optional(),
//     ourTeam: z.array(z.object({
//         name: z.string(),
//         position: z.string(),
//         avatar: z.string().optional(),
//         about: z.string().optional(),
//     })).optional(),
//     // Existing Fields from CreateCampaignModalNew.tsx
//     title: z.string().min(1, "Title is required"),
//     story: z.string().min(10, "Story is required"),
//     resourceUrl: z.string().url("Please enter a valid URL"),
//     category: z.enum([
//         'CleanTech',
//         'FinTech',
//         'HealthTech',
//         'EdTech',
//         'AI/ML',
//         'Blockchain',
//         'IoT',
//         'Other',
//     ]).refine((val) => val !== undefined, {
//         message: "Please select a valid category",
//     }),
//     goalAmount: z.number().min(1, "Amount must be greater than 0"),
//     currencyType: z.enum(['USD', 'EUR', 'GBP', 'JPY']).refine((val) => val !== undefined, {
//         message: "Please select a valid currency",
//     }),
//     owner: z.object({
//         name: z.string().min(1, "Owner name is required"),
//         email: z.string().email("Invalid email address"),
//         stripeId: z.string().min(1, "Stripe ID is required"),
//     }),
//     publishedStatus: z.boolean().optional(),

//     // additionalHighlights: z.array(z.string()).optional(),

//     additionalHighlights: z.array(z.object({
//         title: z.string(),
//         description: z.string().optional()
//     })).optional(),

//     // New Fields from CreateCampaignFields.tsx
//     pitch: z.string().min(10, "Please provide a detailed campaign pitch").optional(),

//     // Business Concept
//     businessName: z.string().min(2, "Business name must be at least 2 characters"),
//     businessIdea: z.string().min(10, "Please provide a detailed business idea"),
//     valueProposition: z.string().min(10, "Please describe your value proposition"),
//     businessModelDoc: z
//         .instanceof(FileList)
//         .refine((files) => files?.length === 1, "Business model document is required")
//         .refine(
//             (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//             "Max file size is 5MB"
//         )
//         .refine(
//             (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
//             "Only .pdf, .doc, and .docx files are accepted"
//         )
//         .optional(),
//     businessPlanDoc: z
//         .instanceof(FileList)
//         .refine((files) => files?.length === 1, "Business plan document is required")
//         .refine(
//             (files) => files?.[0]?.size <= MAX_FILE_SIZE,
//             "Max file size is 5MB"
//         )
//         .refine(
//             (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
//             "Only .pdf, .doc, and .docx files are accepted"
//         )
//         .optional(),

//     // Market Analysis
//     targetMarket: z.string().min(10, "Please describe your target market"),
//     marketSize: z.string().min(1, "Please estimate your market size"),
//     competitiveAnalysis: z.string().min(10, "Please provide competitive analysis"),

//     // Business Model
//     revenueStreams: z.string().min(10, "Please describe your revenue streams"),
//     costStructure: z.string().min(10, "Please outline your cost structure"),

//     // Business Plan
//     executiveSummary: z.string().min(10, "Please provide an executive summary"),
//     shortTermGoals: z.string().min(10, "Please list your short-term goals"),
//     longTermGoals: z.string().min(10, "Please list your long-term goals"),
//     marketingStrategy: z.string().min(10, "Please describe your marketing strategy"),

//     // Operational Plan
//     businessLocation: z.string().min(2, "Please specify your business location"),
//     technologyNeeds: z.string().min(10, "Please list your technology needs"),
//     supplyChain: z.string().min(10, "Please describe your supply chain"),

//     // Management Team
//     teamMembers: z.string().min(10, "Please list key team members"),
//     rolesResponsibilities: z.string().min(10, "Please outline roles and responsibilities"),

//     // Financial Projections
//     startupCosts: z.string().min(1, "Please estimate your startup costs"),
//     projectedRevenue: z.string().min(1, "Please provide projected revenue"),
//     breakEvenPoint: z.string().min(1, "Please estimate break-even point"),

//     // Funding Requirements
//     fundingNeeded: z.string().min(1, "Please specify funding needed"),
//     useOfFunds: z.string().min(10, "Please detail use of funds"),

//     // Legal Structure
//     businessEntity: z.string().min(2, "Please select business entity type"),
//     licensesPermits: z.string().min(10, "Please list required licenses and permits"),

//     // Risks and Challenges
//     risksAndChallenges: z.string().min(10, "Please describe potential risks and challenges"),

//     // Milestones and Metrics
//     keyMilestones: z.string().min(10, "Please list key milestones"),
//     metricsForSuccess: z.string().min(10, "Please specify metrics for success"),

//     // Valuation
//     valuation: z.object({
//         currentValuation: z.number().optional(),
//         lastValuation: z.number().optional(),
//         currencyUnit: z.enum(['USD', 'EUR', 'GBP', 'JPY', 'INR']).optional(),
//     }).optional(),
// });

const formSchema = z.object({
    // Currency Type
    currencyType: z.enum(['USD', 'EUR', 'GBP', 'JPY']).refine((val) => val !== undefined, {
        message: "Please select a valid currency",
    }),
    // Highlights
    highlights: z.array(z.object({
        description: z.string(),
        id: z.number().optional()
    })).optional(),

    // Title
    title: z.string().min(10, "Title is required"),

    // Story
    story: z.string().min(100, "Story must have at least 100 characters"),

    // Category
    category: z.enum([
        'CleanTech',
        'FinTech',
        'HealthTech',
        'EdTech',
        'AI/ML',
        'Blockchain',
        'IoT',
        'Other',
    ]).refine((val) => val !== undefined, {
        message: "Please select a valid category",
    }),

    // Goal Amount
    goalAmount: z.number().min(1, "Goal amount is required"),

    // End Date
    endDate: z.date().refine((val) => val !== undefined, {
        message: "Please select a valid end date",
    }),

    // Image URL
    imageUrl: z.string().url("Please enter a valid image URL"),

    // Owner
    owner: z.object({
        name: z.string().min(1, "Owner name is required"),
        email: z.string().email("Invalid email address"),
        stripeId: z.string().min(1, "Stripe ID is required"),
    }),
});



export default function CreateCampaignForm({ onBack, onClose, onCreateCampaign }: {
    onBack: () => void;
    onClose: () => void;
    onCreateCampaign: (campaignData: Omit<Campaign, "_id" | "amount_raised" | "createdAt">) => Promise<void>;
}) {
    const [activeTab, setActiveTab] = useState(0);
    const { currentDraft, saveDraft } = useCampaignStore();
    const [progress, setProgress] = useState(0);
    const [saving, setSaving] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isValid },
        reset,
    } = useForm<z.infer<typeof formSchema & { highlights: { description: string, id?: number }[]; additionalHighlights: { title: string, description?: string }[]; ourTeam: { name: string, position: string, avatar?: string, about?: string }[] }>>({
        resolver: zodResolver(formSchema),
        // defaultValues: currentDraft || undefined,
    });

    console.log(errors);

    const formValues = watch();

    useEffect(() => {
        // const requiredFields = [
        //     'title',
        //     'story',
        //     'resourceUrl',
        //     'category',
        //     'goalAmount',
        //     'currencyType',
        //     'owner.name',
        //     'owner.email',
        //     'owner.stripeId',
        //     // Add new required fields
        //     'businessName',
        //     'businessIdea',
        //     'valueProposition',
        //     'targetMarket',
        //     'marketSize',
        //     'competitiveAnalysis',
        //     'revenueStreams',
        //     'costStructure',
        //     'executiveSummary',
        //     'shortTermGoals',
        //     'longTermGoals',
        //     'marketingStrategy',
        //     'businessLocation',
        //     'technologyNeeds',
        //     'supplyChain',
        //     'teamMembers',
        //     'rolesResponsibilities',
        //     'startupCosts',
        //     'projectedRevenue',
        //     'breakEvenPoint',
        //     'fundingNeeded',
        //     'useOfFunds',
        //     'businessEntity',
        //     'licensesPermits',
        //     'risksAndChallenges',
        //     'keyMilestones',
        //     'metricsForSuccess',
        // ];

        const requiredFields = [
            'title',
            'story',
        ];

        const completedFields = requiredFields.filter(
            (field) => field.split('.').reduce((obj, key) => (obj as any)?.[key], formValues)
        );

        setProgress((completedFields.length / requiredFields.length) * 100);
    }, [formValues]);

    const {
        fields: highlightFields,
        append: appendHighlight,
        remove: removeHighlight,
    } = useFieldArray({
        control,
        name: 'highlights' as const,
    });

    const {
        fields: additionalHighlightFields,
        append: appendAdditionalHighlight,
        remove: removeAdditionalHighlight,
    } = useFieldArray({
        control,
        name: 'additionalHighlights' as const,
    });
    const {
        fields: teamFields,
        append: appendTeamMember,
        remove: removeTeamMember,
    } = useFieldArray({
        control,
        name: 'ourTeam' as const,
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        const campaign = {
            ...data,
            draftId: currentDraft?.id || crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            currentAmount: 0,
            favoritesCount: 0,
            contributions: [],
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            email: data.owner.email,
            goal_amount: data.goalAmount,
            end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            image_url: data.imageUrl,
            owner: JSON.stringify(data.owner),
            stripeId: data.owner.stripeId
        };
        onCreateCampaign(campaign);
        reset();
        onBack();
    };

    const handleSaveDraft = async () => {
        setSaving(true);
        await saveDraft({
            ...formValues,
            highlights: formValues.highlights?.map((highlight) => ({ description: highlight.description, id: highlight.id })),
            additionalHighlights: formValues.additionalHighlights?.map((highlight) => ({
                text: highlight,
                title: "", // Provide appropriate default value or mapping
                description: "" // Provide appropriate default value or mapping
            })),
            draftId: crypto.randomUUID(),
        });
        setSaving(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0">
            <div className="relative w-full h-[95vh] bg-background rounded-xl shadow-lg border animate-in slide-in-from-bottom-2">
                <div className="absolute right-4 top-4 z-50">
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex flex-col h-full">
                    <div className="p-6 border-b">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={onBack}>
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold">Create Campaign</h1>
                                <p className="text-muted-foreground">Fill in the details to launch your campaign</p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground mt-2">
                                {progress.toFixed(0)}% completed
                            </p>
                        </div>
                    </div>

                    <Tabs
                        value={TABS[activeTab].id}
                        onValueChange={(value) => setActiveTab(TABS.findIndex(tab => tab.id === value))}
                        className="flex-1 overflow-hidden"
                    >
                        <div className="border-b bg-muted/40">
                            <ScrollArea className="w-full">

                                <TabsList className="inline-flex h-16 items-center justify-start gap-4 px-6">
                                    {TABS.map((tab, index) => {
                                        const Icon = tab.icon;
                                        return (
                                            <TabsTrigger
                                                key={tab.id}
                                                value={tab.id}
                                                disabled={index > 0 && !isValid}
                                                className={cn(
                                                    "inline-flex items-center gap-2 px-3 py-3 rounded-lg transition-all",
                                                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                                                    "hover:bg-muted",
                                                    "border-2 border-transparent data-[state=active]:border-primary/20",
                                                    "shadow-sm data-[state=active]:shadow-md"
                                                )}
                                            >
                                                {/* <Icon className="h-5 w-5" /> */}
                                                <span className="font-small">{tab.label}</span>
                                            </TabsTrigger>
                                        );
                                    })}
                                </TabsList>
                            </ScrollArea>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-hidden">
                            <ScrollArea className="h-[calc(85vh-13rem)] px-6 py-4">

                                <TabsContent value="details" className="mt-0 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Campaign Title <span className="text-destructive">*</span></Label>
                                            <Input
                                                {...register('title', { required: 'Title is required' })}
                                                placeholder="Enter campaign title"
                                            />
                                            {errors.title && (
                                                <p className="text-sm text-destructive">{errors.title.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Category <span className="text-destructive">*</span></Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    setValue('category', value as 'CleanTech' | 'FinTech' | 'HealthTech' | 'EdTech' | 'AI/ML' | 'Blockchain' | 'IoT' | 'Other');
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CATEGORIES.map((category) => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.category && (
                                                <p className="text-sm text-destructive">{errors.category.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Story <span className="text-destructive">*</span></Label>
                                        <Textarea
                                            {...register('story', { required: 'Story is required' })}
                                            placeholder="Tell your campaign story"
                                            className="min-h-[150px]"
                                        />
                                        {errors.story && (
                                            <p className="text-sm text-destructive">{errors.story.message}</p>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Goal Amount <span className="text-destructive">*</span></Label>
                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                <Input
                                                    type="number"
                                                    {...register('goalAmount', {
                                                        required: 'Goal amount is required',
                                                        valueAsNumber: true,
                                                        min: { value: 1, message: 'Amount must be greater than 0' },
                                                    })}
                                                    className="pl-9"
                                                    placeholder="Enter goal amount"
                                                />
                                            </div>
                                            {errors.goalAmount && (
                                                <p className="text-sm text-destructive">{errors.goalAmount.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Currency Type <span className="text-destructive">*</span></Label>
                                            <Select
                                                onValueChange={(value) => {
                                                    setValue('currencyType', value as 'USD' | 'EUR' | 'GBP' | 'JPY');
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select currency type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CURRENCIES.map((currency) => (
                                                        <SelectItem key={currency} value={currency}>
                                                            {currency}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.currencyType && (
                                                <p className="text-sm text-destructive">{errors.currencyType.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Image URL <span className="text-destructive">*</span></Label>
                                        <div className="relative">
                                            <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                {...register('imageUrl', {
                                                    required: 'Image URL is required',
                                                    pattern: {
                                                        value: /^https?:\/\/.+/,
                                                        message: 'Please enter a valid URL',
                                                    },
                                                })}
                                                className="pl-9"
                                                placeholder="https://example.com/image"
                                            />
                                        </div>
                                        {errors.imageUrl && (
                                            <p className="text-sm text-destructive">{errors.imageUrl?.message as string}</p>
                                        )}
                                    </div>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Owner Name <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        {...register('owner.name', { required: 'Owner name is required' })}
                                                        placeholder="Enter owner name"
                                                    />
                                                    {errors.owner?.name && (
                                                        <p className="text-sm text-destructive">{errors.owner.name.message}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Owner Email <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        type="email"
                                                        {...register('owner.email', {
                                                            required: 'Owner email is required',
                                                            pattern: {
                                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                                message: 'Invalid email address',
                                                            },
                                                        })}
                                                        placeholder="Enter owner email"
                                                    />
                                                    {errors.owner?.email && (
                                                        <p className="text-sm text-destructive">{errors.owner.email.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="mt-4 space-y-2">
                                                    <Label>Stripe ID <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        {...register('owner.stripeId', { required: 'Stripe ID is required' })}
                                                        placeholder="Enter Stripe ID"
                                                    />
                                                    {errors.owner?.stripeId && (
                                                        <p className="text-sm text-destructive">{errors.owner.stripeId.message}</p>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label>End Date <span className="text-destructive">*</span></Label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            {...register('endDate', {
                                                                required: 'End Date is required',
                                                                valueAsDate: true,
                                                                validate: value => {
                                                                    if (!value) return 'End Date is required';
                                                                    const date = new Date(value);
                                                                    if (isNaN(date.getTime())) return 'Please enter a valid date';
                                                                    return true;
                                                                },
                                                            })}
                                                            type="date"
                                                            className="pl-9"
                                                        />
                                                    </div>
                                                    {errors.endDate && (
                                                        <p className="text-sm text-destructive">{errors.endDate?.message as string}</p>
                                                    )}
                                                </div>

                                            </div>

                                        </CardContent>
                                    </Card>

                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="publishedStatus"
                                            {...register('publishedStatus')}
                                        />
                                        <Label htmlFor="publishedStatus">Publish campaign immediately</Label>
                                    </div>
                                </TabsContent>

                                <TabsContent value="additional" className="mt-0 space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium">Highlights</h3>
                                                <Button
                                                    type="button"
                                                    onClick={() => appendHighlight({ id: Date.now(), description: '' })}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <PlusCircle className="h-4 w-4 mr-2" />
                                                    Add Highlight
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {highlightFields.map((field, index) => (
                                                    <div key={field.id} className="flex gap-2">
                                                        <Input
                                                            {...register(`highlights.${index}.description` as const)}
                                                            placeholder="Enter highlight description"
                                                        />
                                                        <Button
                                                            type="button"
                                                            onClick={() => removeHighlight(index)}
                                                            variant="ghost"
                                                            size="icon"
                                                            className="shrink-0"
                                                        >
                                                            <MinusCircle className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-medium">Additional Highlights</h3>
                                                <Button
                                                    type="button"
                                                    onClick={() => appendAdditionalHighlight({ title: '', description: '' })}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <PlusCircle className="h-4 w-4 mr-2" />
                                                    Add Additional Highlight
                                                </Button>
                                            </div>

                                            <div className="space-y-4">
                                                {additionalHighlightFields.map((field, index) => (
                                                    <div key={field.id} className="grid grid-cols-2 gap-2">
                                                        <Input
                                                            {...register(`additionalHighlights.${index}.title` as const)}
                                                            placeholder="Enter title"
                                                        />
                                                        <div className="flex gap-2">
                                                            <Input
                                                                {...register(`additionalHighlights.${index}.description` as const)}
                                                                placeholder="Enter description"
                                                            />
                                                            <Button
                                                                type="button"
                                                                onClick={() => removeAdditionalHighlight(index)}
                                                                variant="ghost"
                                                                size="icon"
                                                                className="shrink-0"
                                                            >
                                                                <MinusCircle className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <h3 className="text-lg font-medium mb-4">Valuation Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Current Valuation</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            {...register('valuation.currentValuation')}
                                                            className="pl-9"
                                                            placeholder="Enter current valuation"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Last Valuation</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            {...register('valuation.lastValuation')}
                                                            className="pl-9"
                                                            placeholder="Enter last valuation"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Currency Unit</Label>
                                                    <Select
                                                        onValueChange={(value) => {
                                                            register('valuation.currencyUnit').onChange({ target: { value } });
                                                        }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select currency" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {CURRENCIES.map((currency) => (
                                                                <SelectItem key={currency} value={currency}>
                                                                    {currency}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="team" className="mt-0 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium">Team Members</h3>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                appendTeamMember({
                                                    name: '',
                                                    position: '',
                                                    avatar: '',
                                                    about: ''
                                                })
                                            }
                                            variant="outline"
                                            size="sm"
                                        >
                                            <UserPlus className="h-4 w-4 mr-2" />
                                            Add Team Member
                                        </Button>
                                    </div>

                                    <div className="space-y-6">
                                        {teamFields.map((field, index) => (
                                            <Card key={field.id}>
                                                <CardContent className="pt-6">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="flex items-center gap-4">
                                                            <Avatar className="h-16 w-16">
                                                                <AvatarImage src={watch(`ourTeam.${index}.avatar`)} />
                                                                <AvatarFallback>
                                                                    {watch(`ourTeam.${index}.name`)?.charAt(0) || 'T'}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <h4 className="text-lg font-medium">Team Member {index + 1}</h4>
                                                                <p className="text-sm text-muted-foreground">
                                                                    {watch(`ourTeam.${index}.position`) || 'Position not set'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            onClick={() => removeTeamMember(index)}
                                                            variant="ghost"
                                                            size="icon"
                                                        >
                                                            <MinusCircle className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                        <div className="space-y-2">
                                                            <Label>Name <span className="text-destructive">*</span></Label>
                                                            <Input
                                                                {...register(`ourTeam.${index}.name` as const, {
                                                                    required: 'Name is required',
                                                                })}
                                                                placeholder="Enter team member name"
                                                            />
                                                            {errors.ourTeam?.[index]?.name && (
                                                                <p className="text-sm text-destructive">
                                                                    {errors.ourTeam[index].name.message}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2">
                                                            <Label>Position <span className="text-destructive">*</span></Label>
                                                            <Input
                                                                {...register(`ourTeam.${index}.position` as const, {
                                                                    required: 'Position is required',
                                                                })}
                                                                placeholder="Enter position"
                                                            />
                                                            {errors.ourTeam?.[index]?.position && (
                                                                <p className="text-sm text-destructive">
                                                                    {errors.ourTeam[index].position.message}
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 mb-6">
                                                        <Label>Avatar URL</Label>
                                                        <div className="relative">
                                                            <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                            <Input
                                                                {...register(`ourTeam.${index}.avatar` as const)}
                                                                className="pl-9"
                                                                placeholder="Enter avatar URL"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>About</Label>
                                                        <Textarea
                                                            {...register(`ourTeam.${index}.about` as const)}
                                                            className="min-h-[100px]"
                                                            placeholder="Enter team member description"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="pitch" className="mt-0 space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <Label>Campaign Pitch</Label>
                                                <Textarea
                                                    {...register('pitch')}
                                                    className="min-h-[400px]"
                                                    placeholder="Enter your campaign pitch..."
                                                />
                                                <p className="text-sm text-muted-foreground">
                                                    Write a compelling pitch that will convince investors to support your campaign.
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="business-concept" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Business Concept</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Business Name</Label>
                                                    <Input placeholder="Enter your business name" />
                                                </div>
                                                <div>
                                                    <Label>Business Idea</Label>
                                                    <Textarea
                                                        placeholder="Describe your product or service"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Value Proposition</Label>
                                                    <Textarea
                                                        placeholder="What makes your offering unique?"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-5 w-5" />
                                                <h2 className="text-xl font-semibold">Document Upload</h2>
                                            </div>
                                            <Separator />
                                            <div>
                                                <Label>Business Model Document</Label>
                                                <Input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                />
                                                <p>Upload your detailed business model (PDF, DOC, DOCX - Max 5MB)</p>
                                            </div>
                                            <div>
                                                <Label>Business Plan Document</Label>
                                                <Input
                                                    type="file"
                                                    accept=".pdf,.doc,.docx"
                                                />
                                                <p>Upload your complete business plan (PDF, DOC, DOCX - Max 5MB)</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="market-analysis" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Target className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Market Analysis</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Target Market</Label>
                                                    <Textarea
                                                        placeholder="Describe your target customers"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Market Size (in USD)</Label>
                                                    <Input type="number" placeholder="Estimated market size" />
                                                </div>
                                                <div>
                                                    <Label>Competitive Analysis</Label>
                                                    <Textarea
                                                        placeholder="Describe your competitors and SWOT analysis"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="business-model" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <LineChart className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Business Model</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Revenue Streams</Label>
                                                    <Textarea
                                                        placeholder="How will your business make money?"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Cost Structure</Label>
                                                    <Textarea
                                                        placeholder="Outline your fixed and variable costs"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="business-plan" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Business Plan</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Executive Summary</Label>
                                                    <Textarea
                                                        placeholder="Provide a brief overview of your business"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Short-term Goals</Label>
                                                    <Textarea
                                                        placeholder="List your goals for the next 1-2 years"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Long-term Goals</Label>
                                                    <Textarea
                                                        placeholder="List your goals for the next 3-5 years"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Marketing Strategy</Label>
                                                    <Textarea
                                                        placeholder="Describe your marketing and customer acquisition plans"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="operational" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Operational Plan</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Business Location</Label>
                                                    <Input placeholder="Where will your business operate?" />
                                                </div>
                                                <div>
                                                    <Label>Technology Needs</Label>
                                                    <Textarea
                                                        placeholder="List required technology and tools"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Supply Chain</Label>
                                                    <Textarea
                                                        placeholder="Describe your supply chain process"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="management-team" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Management Team</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Team Members</Label>
                                                    <Textarea
                                                        placeholder="Please list key team members"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Roles & Responsibilities</Label>
                                                    <Textarea
                                                        placeholder="Please outline roles and responsibilities"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="financial-projections" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Wallet className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Financial Projections</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Startup Costs (USD)</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            className="pl-9"
                                                            placeholder="Initial costs needed"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>Projected Annual Revenue (USD)</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            className="pl-9"
                                                            placeholder="Expected revenue"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>Break-even Point (months)</Label>
                                                    <div className="relative">
                                                        <Input
                                                            type="number"
                                                            className="pl-3"
                                                            placeholder="Months to break-even"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="funding-requirements" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <BadgeDollarSign className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Funding Requirements</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Funding Needed (USD)</Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            type="number"
                                                            className="pl-9"
                                                            placeholder="Amount of funding required"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label>Use of Funds</Label>
                                                    <Textarea
                                                        placeholder="How will the funds be used?"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="legal-structure" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Scale className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Legal Structure</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Business Entity Type</Label>
                                                    <Select>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select business entity type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="LLC">LLC</SelectItem>
                                                            <SelectItem value="Corporation">Corporation</SelectItem>
                                                            <SelectItem value="Partnership">Partnership</SelectItem>
                                                            <SelectItem value="Sole Proprietorship">Sole Proprietorship</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label>Licenses & Permits</Label>
                                                    <Textarea
                                                        placeholder="List required licenses and permits"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>


                                <TabsContent value="risks-milestones" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <AlertCircle className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Risks and Challenges</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Risks & Challenges</Label>
                                                    <Textarea
                                                        placeholder="Describe potential risks and mitigation strategies"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Milestone className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Milestones and Metrics</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Key Milestones</Label>
                                                    <Textarea
                                                        placeholder="List important milestones and timeline"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Metrics for Success</Label>
                                                    <Textarea
                                                        placeholder="Define how you'll measure success"
                                                        className="min-h-[100px]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                            </ScrollArea>

                            <div className="p-6 border-t bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 flex items-center justify-between sticky bottom-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleSaveDraft}
                                    disabled={saving}
                                    className="gap-2"
                                >
                                    <Save className="h-4 w-4" />
                                    {saving ? 'Saving...' : 'Save Draft'}
                                </Button>

                                <div className="flex gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                                        disabled={activeTab === 0}
                                        className="gap-2"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Previous
                                    </Button>
                                    {activeTab === TABS.length - 1 ? (
                                        <Button type="submit" disabled={!isValid} className="gap-2">
                                            <Sparkles className="h-4 w-4" />
                                            Submit For Approval
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => setActiveTab(Math.min(TABS.length - 1, activeTab + 1))}
                                            className="gap-2"
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </form>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
