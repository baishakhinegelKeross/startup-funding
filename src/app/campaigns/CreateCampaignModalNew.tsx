"use client"

import { nanoid } from 'nanoid';
import React, { 
    //useRef, 
    useEffect, 
    useState 
} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import {
    //PlusCircle,
    MinusCircle,
    AlertCircle,
    //Save,
    //ArrowLeft,
    X,
    //ChevronRight,
    //ChevronLeft,
    UserPlus,
    Sparkles,
    Target,
    Users,
    Link,
    DollarSign,
    Building2,
    //GraduationCap,
    //Briefcase,
    Milestone,
    Scale,
    //BadgeDollarSign,
    FileText,
    //LineChart,
    Wallet,
    Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
    Card, 
    CardContent, 
    //CardHeader, 
    //CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
//import { FormItem, FormMessage, FormDescription, FormLabel, FormField, FormControl } from '@/components/ui/form';
//import { Checkbox } from '@/components/ui/checkbox';
//import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
//import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useCampaignStore } from '@/store/campaign-store';
import type { 
    //Startup, 
    Currency, 
    Campaign 
} from '@/types';
//import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
////import PitchBuilder from '@/components/PitchBuilder/PitchBuilder';
import axios from 'axios';
import PitchbuilderV2 from '../detailCampaign/[id]/pitch_builderV2/page';
import { getPitch } from '../detailCampaign/[id]/pitch_builderV2/page';

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
        //{ id: 'additional', label: 'Additional Info', icon: Sparkles },
    { id: 'pitch', label: 'Campaign Pitch', icon: AlertCircle },
    { id: 'business-concept', label: 'Business Concept', icon: Building2 },
    { id: 'market-analysis', label: 'Market Analysis', icon: Target },
    { id: 'team', label: 'Team', icon: Users },
        //{ id: 'business-model', label: 'Business Model', icon: LineChart },
        //{ id: 'business-plan', label: 'Business Plan', icon: FileText },
        //{ id: 'management-team', label: 'Management Team', icon: Users },
        //{ id: 'funding-requirements', label: 'Funding Requirements', icon: BadgeDollarSign },
    { id: 'risks-milestones', label: 'Risks & Milestones', icon: Milestone },
    { id: 'financial-projections', label: 'Financial Projections', icon: Wallet },
    { id: 'operational', label: 'Operational Plan', icon: Building2 },
    { id: 'legal-structure', label: 'Legal Structure', icon: Scale }
];

//sessionStorage.setItem('campaignFileCount', '4');
let campaignFileCount = 4;

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

const MAX_FILE_SIZE2 = 2000000; // 2MB
const ACCEPTED_FILE_TYPES2 = [
    ".png",
    ".jpeg",
    ".gif",
    ".jpg"
];

type categoryType =  'CleanTech' | 'FinTech' | 'HealthTech' | 'EdTech' | 'AI/ML' | 'Blockchain' | 'IoT' | 'Other'; 

const fileSchema = z
  .custom<File>((file) => file instanceof File, "File is required")
  .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 5MB")
  .refine((file) => ACCEPTED_FILE_TYPES.includes(file.type), "Only .pdf, .doc, and .docx files are accepted");

const imageSchema = z
  .custom<File>((file) => file instanceof File, "Image file is required")
  .refine((file) => !!file, "Image file is required") // Checks if file is present
  .refine((file) => file.size <= MAX_FILE_SIZE2, "Max file size is 2MB")
  .refine((file) => ACCEPTED_FILE_TYPES2.includes(file.type), "Only .png, .jpeg, .jpg, and .gif files are accepted");

const formSchema = z.object({
    // highlights: z.array(z.object({ description: z.string() })).optional(),
    // highlights: z.array(z.object({
    //     description: z.string(),
    //     id: z.number().optional()
    // })).optional(),
    ourTeam: z.array(z.object({
        name: z.string(),
        position: z.string(),
        avatar: z.string().optional(),
        about: z.string().optional(),
        linkedIn: z.string().optional(),
        cv: z.array(fileSchema).optional()
        // cv: z
        // .instanceof(FileList)
        // .refine((files) => files?.length === 1, "Please upload cv")
        // .refine(
        //     (files) => files?.[0]?.size <= MAX_FILE_SIZE,
        //     "Max file size is 5MB"
        // )
        // .refine(
        //     (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
        //     "Only .pdf, .doc, and .docx files are accepted"
        // )
        // .optional()

    })).optional(),
    // Existing Fields from CreateCampaignModalNew.tsx
    title: z.string().min(1, "Title is required"),
    story: z.string().min(10, "Story is required"),
    //imageUrl: z.string().url("Please enter a valid image URL"),
    //resourceUrl: z.string().url("Please enter a valid URL"),
    // imageUrl: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Please upload campaign image")
    //     .refine(
    //         (files) => files?.[0]?.size <= MAX_FILE_SIZE2,
    //         "Max file size is 2MB"
    //     )
    //     .refine(
    //         (files) => ACCEPTED_FILE_TYPES2.includes(files?.[0]?.type),
    //         "Only .pdf, .doc, and .docx files are accepted"
    //     )
    //     .optional(),
    //image_url_: z.array(imageSchema),
    image_url_: z.array(imageSchema),
    image_url: z.string(),
    end_date: z.string().min(1, 'End date is required'),
    category: z.enum([
        'CleanTech',
        'FinTech',
        'HealthTech',
        'EdTech',
        'AI/ML',
        'Blockchain',
        'IoT',
        'Other',
    ]).superRefine((val, ctx) => {
        if (!val) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a valid category",
            });
        }
    }),


    goal_amount: z.string().min(1, "Amount must be greater than 0"),
    currencyType: z.enum([
        'USD', 
        'EUR', 
        'GBP', 
        'JPY'
    ]).superRefine((val, ctx) => {
        if (!val) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please select a valid currency",
            });
        }
    }),


    owner: z.object({
        name: z.string().min(1, "Owner name is required"),
        email: z.string().email("Invalid email address"),
        //stripeId: z.string().min(1, "Stripe ID is required"),
    }),
    published: z.boolean().optional(),

    // additionalHighlights: z.array(z.string()).optional(),

    // additionalHighlights: z.array(z.object({
    //     title: z.string(),
    //     description: z.string().optional()
    // })).optional(),

    // New Fields from CreateCampaignFields.tsx
    pitch: z.any(),

    // Business Concept
    businessName: z.string(),
    //.min(2, "Business name must be at least 2 characters").optional(),
    businessIdea: z.string(),
    //.min(10, "Please provide a detailed business idea").optional(),
    valueProposition: z.string(),
    //.min(10, "Please describe your value proposition").optional(),
    // businessModelDoc: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Business model document is required")
    //     .refine(
    //         (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //         "Max file size is 5MB"
    //     )
    //     .refine(
    //         (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //         "Only .pdf, .doc, and .docx files are accepted"
    //     )
    //     .optional(),
    // businessPlanDoc: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Business plan document is required")
    //     .refine(
    //         (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //         "Max file size is 5MB"
    //     )
    //     .refine(
    //         (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //         "Only .pdf, .doc, and .docx files are accepted"
    //     )
    //     .optional(),

    //businessModelDoc: z.string().min(2, "Please upload business doc"),

    //businessPlanDoc: z.string().min(2, "Please upload business plan doc"),

    // businessModelDoc: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Please upload business doc")
    //     .refine(
    //         (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //         "Max file size is 5MB"
    //     )
    //     .refine(
    //         (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //         "Only .pdf, .doc, and .docx files are accepted"
    //     )
    //     .optional(),

    // businessPlanDoc: z
    //     .instanceof(FileList)
    //     .refine((files) => files?.length === 1, "Please upload business plan doc")
    //     .refine(
    //         (files) => files?.[0]?.size <= MAX_FILE_SIZE,
    //         "Max file size is 5MB"
    //     )
    //     .refine(
    //         (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
    //         "Only .pdf, .doc, and .docx files are accepted"
    //     )
    //     .optional(),

    // Market Analysis
    businessModelDoc: z.array(fileSchema),
    businessPlanDoc: z.array(fileSchema),
    businessModelDocName: z.string().optional(),
    businessModelPlanName: z.string().optional(),
    targetMarket: z.string(),
    //.min(10, "Please describe your target market").optional(),
    marketSize: z.string(),
    //.min(1, "Please estimate your market size").optional(),
    competitiveAnalysis: z.string(),
    //.min(10, "Please provide competitive analysis").optional(),

    // Business Model
    //revenueStreams: z.string().min(10, "Please describe your revenue streams"),
    //costStructure: z.string().min(10, "Please outline your cost structure"),

    // Business Plan
    //executiveSummary: z.string().min(10, "Please provide an executive summary"),
    //shortTermGoals: z.string().min(10, "Please list your short-term goals"),
    //longTermGoals: z.string().min(10, "Please list your long-term goals"),
    //marketingStrategy: z.string().min(10, "Please describe your marketing strategy"),

    // Operational Plan
    businessLocation: z.string().min(2, "Please specify your business location"),
    technologyNeeds: z.string(),
    //.min(10, "Please list your technology needs").optional(),
    supplyChain: z.string(),
    //.min(10, "Please describe your supply chain").optional(),

    // Management Team
    //teamMembers: z.string().min(10, "Please list key team members"),
    //rolesResponsibilities: z.string().min(10, "Please outline roles and responsibilities"),

    // Financial Projections
    startupCosts: z.string().min(1, "Please estimate your startup costs"),
    projectedRevenue: z.string().min(1, "Please provide projected revenue"),
    breakEvenPoint: z.string().min(1, "Please estimate break-even point"),

    // Funding Requirements
    //fundingNeeded: z.string().min(1, "Please specify funding needed"),
    //useOfFunds: z.string().min(10, "Please detail use of funds"),

    // Legal Structure
    businessEntity: z.string(),
    //.min(2, "Please select business entity type").optional(),
    licensesPermits: z.string(),
    //.min(10, "Please list required licenses and permits").optional(),

    // Risks and Challenges
    risksAndChallenges: z.string(),
    //.min(10, "Please describe potential risks and challenges").optional(),

    // Milestones and Metrics
    keyMilestones: z.string(),
    //.min(10, "Please list key milestones").optional(),
    //metricsForSuccess: z.string().min(10, "Please specify metrics for success"),

    // Valuation
    // valuation: z.object({
    //     currentValuation: z.number().optional(),
    //     lastValuation: z.number().optional(),
    //     currencyUnit: z.enum(['USD', 'EUR', 'GBP', 'JPY', 'INR']).optional(),
    // }).optional(),
    userId: z.string()
});

// const formSchema = z.object({
//     ourTeam: z.array(z.object({
//         name: z.string(),
//         position: z.string(),
//         avatar: z.string().optional(),
//         about: z.string().optional(),
//     })).optional(),
//     additionalHighlights: z.array(z.object({
//         title: z.string(),
//         description: z.string().optional(),
//     })).optional(),
//     // Currency Type
//     currencyType: z.enum(['USD', 'EUR', 'GBP', 'JPY']).refine((val) => val !== undefined, {
//         message: "Please select a valid currency",
//     }),
//     // Highlights
//     highlights: z.array(z.object({
//         description: z.string(),
//         id: z.number().optional()
//     })).optional(),

//     // Title
//     title: z.string().min(10, "Title is required"),

//     // Story
//     story: z.string().min(100, "Story must have at least 100 characters"),

//     // Category
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

//     // Goal Amount
//     goalAmount: z.number().min(1, "Goal amount is required"),

//     // End Date
//     endDate: z.date().refine((val) => val !== undefined, {
//         message: "Please select a valid end date",
//     }),

//     // Image URL
//     imageUrl: z.string().url("Please enter a valid image URL"),
//     owner: z.object({
//         name: z.string().min(1, "Owner name is required"),
//         email: z.string().email("Invalid email address"),
//         stripeId: z.string().min(1, "Stripe ID is required"),
//     }),
//     publishedStatus: z.boolean().optional(),

// });

interface User {
    id: string;
    username: string;
    email: string;
}

export default function CreateCampaignForm({ onClose, onCreateCampaign, currentUser }: {
    onClose: () => void;
    onCreateCampaign: (campaignData: Omit<Campaign, "_id"  | "createdAt">) => Promise<void>;
    currentUser: User | null
}) {
    //const [activeTab, setActiveTab] = useState('details');
    //const [activeTab, setActiveTab] = useState("details");
    // const [showLeftScroll, setShowLeftScroll] = useState(false);
    // const [showRightScroll, setShowRightScroll] = useState(false);
    //const tabsContainerRef = useRef<HTMLDivElement>(null);
    const { 
        currentDraft, 
        //saveDraft 
    } = useCampaignStore();
    const [progress, setProgress] = useState(0);
    // const [
    //     saving, 
    //     setSaving
    // ] = useState(false);
    // const [
    //     isMobileView, 
    //     setIsMobileView
    // ] = useState(false);

    //const [category, setCategory] = useState<categoryType>("CleanTech");
    //const [currencyType, setCurrencyType] = useState("USD");
    // Store selected files in local state
    const [selectedFiles, setSelectedFiles] = useState<{ [key: string]: string }>({});
    const [pitchComponents, setPitchComponents] = useState<any[] | undefined>(undefined)
        
    const userName = currentUser?.username;
    const userEmail = currentUser?.email;
    const userId = currentUser?.id;

    const pitchSet = (pitchComponents: React.SetStateAction<any[] | undefined>)=>{
        debugger
        setPitchComponents(pitchComponents)
    }

    const pitchSet = (pitchComponents: React.SetStateAction<any[] | undefined>)=>{
        debugger
        setPitchComponents(pitchComponents)
    }

    const {
        register,
        //handleSubmit,
        control,
        watch,
        setValue,
        formState: { 
            errors,
            isValid 
        },
        trigger
        //reset,
    } = useForm<z.infer<typeof formSchema> 
    // & { 
    //     ourTeam: { 
    //         name: string, 
    //         position: string, 
    //         avatar?: string, 
    //         about?: string 
    //     }[]; 
    //     valuation: { 
    //         currentValuation?: number, 
    //         lastValuation?: number, 
    //         currencyUnit?: 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' 
    //     } 
    // }
    >({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ourTeam: [],
            //image_url_: [],
            //businessModelDoc: [],
            //businessPlanDoc: [],
            //category: category
        },
        mode: 'onChange',
        // defaultValues: currentDraft || undefined,
    });

    // Handle file selection
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (event.target.files?.length) {
          const file = event.target.files[0];
      
          // Update local state to display filename
          setSelectedFiles((prev) => ({
            ...prev,
            [fieldName]: file.name,
          }));
      
          // Update React Hook Form value
          setValue(fieldName, [file]); 
        }
      };
      
    // Ensure form values persist when switching tabs
    // useEffect(() => {
    //     Object.entries(files).forEach(([key, file]) => {
    //         setValue(key, file ? [file] : undefined);
    //     });
    // }, [files, setValue]);

    const buildFormData = (formValues: { title: string; story: string; image_url: string; end_date: Date; category: "CleanTech" | "FinTech" | "HealthTech" | "EdTech" | "AI/ML" | "Blockchain" | "IoT" | "Other"; goal_amount: number; currencyType: "USD" | "EUR" | "GBP" | "JPY"; owner: { name: string; email: string; }; businessName: string; businessIdea: string; valueProposition: string; businessModelDocName: string; businessModelPlanName: string; targetMarket: string; marketSize: string; competitiveAnalysis: string; businessLocation: string; startupCosts: string; projectedRevenue: string; breakEvenPoint: string; risksAndChallenges: string; keyMilestones: string; userId: string; pitch?: any | undefined; ourTeam?: { name: string; position: string; avatar?: string | undefined; about?: string | undefined; linkedIn?: string | undefined; cv?: File[] | undefined; }[] | undefined; image_url_?: File[] | undefined; published?: boolean | undefined; businessModelDoc?: File[] | undefined; businessPlanDoc?: File[] | undefined; technologyNeeds?: string | undefined; supplyChain?: string | undefined; businessEntity?: string | undefined; licensesPermits?: string | undefined; }) => {
        const formData = new FormData();

        const files = [];
    
        // Append file fields. Assume each field contains a FileList or an array of Files.
        if (formValues.image_url_ && formValues.image_url_.length > 0) {
          // For a single file input, append the first file.

            files.push(formValues.image_url_[0]);
            //formData.append('imageUrl', formValues.imageUrl[0]);
        }

        if (formValues.businessModelDoc && formValues.businessModelDoc.length > 0) {
            files.push(formValues.businessModelDoc[0]);
            //formData.append('businessModelDoc', formValues.businessModelDoc[0]);
        }

        if (formValues.businessPlanDoc && formValues.businessPlanDoc.length > 0) {
            files.push(formValues.businessPlanDoc[0]);
            //formData.append('businessPlanDoc', formValues.businessPlanDoc[0]);
        }
      
        // Append files inside an array (for example, team member CVs)
        if (formValues.ourTeam && Array.isArray(formValues.ourTeam)) {
          formValues.ourTeam.forEach((member: { cv: string | any[]; }, index: any) => {
            // For the CV file (assuming it's a FileList/array)
            if (member.cv && member.cv.length > 0) {
                files.push(member.cv[0]);
                //formData.append(`ourTeam[${index}][cv]`, member.cv[0]);
            }
          });
        }

        files.forEach((file)=>{
            formData.append('files',file);
        });
      
        return formData;
      };


    const handleFileSubmit = async function(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        debugger;

        try {
            console.log('Validation errors: ', errors);

            const formData = buildFormData(formValues);
            //console.log(formData);
            // formData.forEach((value, key) => {
            //     console.log(key + ': ' + value);
            // }); 

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/api/uploadMultiple`,
                formData
            );

            if (response.status === 200) {
                alert('Files uploaded successfully!');
                //formRef.current?.reset();

                // If files are uploaded then submit the form
                //handleSubmit(onSubmit);
                onSubmit(formValues);
            } else {
                alert('Failed to upload files.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            alert('An error occurred while uploading files.');
        }
    }

    // const handleCategoryChange = function(value: string){
    //     setCategory(value as categoryType);
    // }

    //debugger;
    //console.log("Current User: ", currentUser);

    //console.log(errors);

    console.log("-- Rendered --");

    const formValues = watch();

    // const checkScroll = () => {
    //     if (tabsContainerRef.current) {
    //         const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
    //         setShowLeftScroll(scrollLeft > 0);
    //         setShowRightScroll(scrollLeft < scrollWidth - clientWidth);
    //     }
    // };

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
            'category',
            'end_date',
            'breakEvenPoint',
            'projectedRevenue',
            'startupCosts',
            'businessLocation',
            //'pitch',
            'goal_amount',
            'image_url_',
            'currencyType',
            'owner'
        ];

        debugger;

        console.log('FormValues: ', formValues);

        const completedFields = requiredFields.filter(
            (field) => field.split('.').reduce((obj, key) => (obj as any)?.[key], formValues)
        );
        
        
        //setPitchComponents(getPitch() as any[])

        setProgress((completedFields.length / requiredFields.length) * 100);
    }, [formValues]);

    // useEffect(() => {
    //     const checkMobileView = () => {
    //         setIsMobileView(window.innerWidth < 768);
    //     };

    //     checkMobileView();
    //     window.addEventListener('resize', checkMobileView);
    //     return () => window.removeEventListener('resize', checkMobileView);
    // }, []);

    // useEffect(() => {
    //     checkScroll();
    //     window.addEventListener('resize', checkScroll);
    //     return () => window.removeEventListener('resize', checkScroll);
    // }, []);

    // const scroll = (direction: 'left' | 'right') => {
    //     if (tabsContainerRef.current) {
    //         const scrollAmount = tabsContainerRef.current.clientWidth * 0.75;
    //         const targetScroll = tabsContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
    //         tabsContainerRef.current.scrollTo({
    //             left: targetScroll,
    //             behavior: 'smooth'
    //         });
    //     }
    // };

    // const scrollToTab = (tabId: string) => {
    //     const tabElement = document.getElementById(`tab-${tabId}`);
    //     if (tabElement && tabsContainerRef.current) {
    //         const container = tabsContainerRef.current;
    //         const tabRect = tabElement.getBoundingClientRect();
    //         const containerRect = container.getBoundingClientRect();

    //         if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
    //             tabElement.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'nearest',
    //                 inline: 'center'
    //             });
    //         }
    //     }
    // };

    // useEffect(() => {
    //     scrollToTab(TABS[activeTab].id);
    // }, [activeTab]);

    // const {
    //     fields: highlightFields,
    //     append: appendHighlight,
    //     remove: removeHighlight,
    // } = useFieldArray({
    //     control,
    //     name: 'highlights' as const,
    // });

    // const {
    //     fields: additionalHighlightFields,
    //     append: appendAdditionalHighlight,
    //     remove: removeAdditionalHighlight,
    // } = useFieldArray({
    //     control,
    //     name: 'additionalHighlights' as const,
    // });
    const {
        fields: teamFields,
        append: appendTeamMember,
        remove: removeTeamMember,
    } = useFieldArray({
        control,
        name: 'ourTeam' as const,
    });

    // const onSubmit_OG = async (data: z.infer<typeof formSchema>) => {
    //     console.log(data);
    //     const campaign = {
    //         ...data,
    //         draftId: currentDraft?.id || nanoid(),
    //         createdAt: new Date().toISOString(),
    //         currentAmount: 0,
    //         favoritesCount: 0,
    //         contributions: [],
    //         endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    //         email: data.owner.email,
    //         goal_amount: data.goalAmount,
    //         end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    //         image_url: data.imageUrl,
    //         owner: JSON.stringify(data.owner),
    //         stripeId: data.owner.stripeId
    //     };
    //     onCreateCampaign(campaign);
    //     reset();
    // };

    const handleOnValueChange = function(value: string){
        setValue('businessEntity', value);
        trigger('businessEntity')
    }

    const handleOnValueChange2 = function(value: "USD" | "EUR" | "GBP" | "JPY"){
        setValue('currencyType', value);
        trigger('currencyType');
    }

    const handleOnValueChange3 = function(value: categoryType){
        setValue('category', value);
        trigger('category');
    }

    const savePitchToSchema = async ()=>{
        const response = await fetch(
            
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pitch/createPitch`,
            {
              method: "POST",
              credentials: "include", 
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(pitchComponents),
            }
          );
        return response.data._id.toString()

    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        debugger;


        // const pitchId = await savePitchToSchema()

        // data.pitch = {pitchComponents: pitchComponents, pitchId: pitchId}

        const campaignData = {
            ...data,
            draftId: currentDraft?.id || nanoid(),
            createdAt: new Date().toISOString(),
            currentAmount: 0,
            favoritesCount: 0,
            contributions: [],
            //endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            email: data.owner.email,
            //goal_amount: data.goalAmount,
            //end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            //image_url: data.imageUrl,
            owner: data.owner,
            //stripeId: data.owner.stripeId,
            //currencyType: currencyType,
            //category: category,
            campaignFileCount: campaignFileCount,
            userId: userId
        };

        campaignData.businessModelDocName = campaignData.businessModelDoc ? campaignData.businessModelDoc[0].name : '';
        campaignData.businessModelPlanName = campaignData.businessPlanDoc ? campaignData.businessPlanDoc[0].name : '';
        campaignData.image_url = campaignData.image_url_ ? campaignData.image_url_[0].name : '';

        console.log(campaignData);

        onCreateCampaign(campaignData);
        onClose()
        //reset();
    };

    // const handleSaveDraft = async () => {
    //     setSaving(true);
    //     await saveDraft({
    //         ...formValues,
    //         highlights: formValues.highlights?.map((highlight) => ({ description: highlight.description, id: highlight.id })),
    //         additionalHighlights: formValues.additionalHighlights?.map((highlight) => ({
    //             text: highlight,
    //             title: "", // Provide appropriate default value or mapping
    //             description: "" // Provide appropriate default value or mapping
    //         })),
    //         draftId: crypto.randomUUID(),
    //     });
    //     setSaving(false);
    // };

    // Debugging Logs
    console.log('Errors:', errors);
    console.log('Is Valid:', isValid);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/80 backdrop-blur-sm animate-in fade-in-0">
            <div className="relative w-full h-[98vh] sm:h-[95vh] bg-background rounded-lg sm:rounded-xl shadow-lg border animate-in slide-in-from-bottom-2">
                <div className="absolute right-2 sm:right-4 top-2 sm:top-4 z-50">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-11 w-11 sm:h-10 sm:w-10"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <div className="flex flex-col h-full">
                    <div className="p-4 sm:p-6 border-b">
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="flex-1 min-w-0">
                                <h1 className="text-lg sm:text-xl font-bold truncate">Create Campaign</h1>
                                <p className="text-sm text-muted-foreground">Fill in the details to launch your campaign</p>
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
                        defaultValue='details'
                        //value={TABS[activeTab].id}
                        //onValueChange={(value) => setActiveTab(TABS.findIndex(tab => tab.id === value))}
                        //value={activeTab} 
                        //onValueChange={setActiveTab}
                        className="flex-1 overflow-auto"
                    >
                        <TabsList className="mx-4 grid grid-cols-9">
                            {
                                TABS.length > 0 ? (
                                    TABS.map((tab)=>(
                                        <TabsTrigger key={tab.id} id={tab.id} value={tab.id} className='bg-transparent'>
                                            {tab.label}
                                        </TabsTrigger>
                                    ))
                                ) : null
                            }
                        </TabsList>

                       
                        <form onSubmit={handleFileSubmit} /*action={handleFileSubmit}*/ /*onSubmit={ handleSubmit(onSubmit)}*/ className="flex-1 overflow-hidden" encType='multipart/form-data'>
                            <div className="h-[calc(100vh-18rem)] sm:h-[100vh] px-3 sm:px-6 py-4 overflow-y-auto" /*className="h-[calc(100vh-18rem)] sm:h-[calc(85vh-13rem)] px-3 sm:px-6 py-4 overflow-y-auto"*/>
                                <TabsContent key="details" value="details" className="mt-0 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Campaign Title <span className="text-destructive">*</span></Label>
                                            <Input
                                                {...register('title'
                                                    //, { required: true }
                                                )}
                                                placeholder="Enter campaign title"
                                                className='text-white bg-[#1e293b]'
                                            />
                                            {errors.title && (
                                                <p className="text-sm text-white">{errors.title.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Category <span className="text-destructive">*</span></Label>
                                            <Select
                                                // onValueChange={(value) => {
                                                //     setValue('category', value as 'CleanTech' | 'FinTech' | 'HealthTech' | 'EdTech' | 'AI/ML' | 'Blockchain' | 'IoT' | 'Other');
                                                // }}
                                                //value={category}
                                                //onValueChange={handleCategoryChange}
                                                onValueChange={handleOnValueChange3}
                                            >
                                                <SelectTrigger className='bg-[#1e293b]'>
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
                                            
                                        </div>
                                        {errors.category && (
                                            <p className="text-sm text-destructive">{errors.category?.message as string}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Story <span className="text-destructive">*</span></Label>
                                        <Textarea
                                            {...register('story'
                                                //, { required: true }
                                            )}
                                            placeholder="Tell your campaign story"
                                            className="min-h-[150px] text-white bg-[#1e293b]"
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
                                                    {...register('goal_amount'
                                                        // , {
                                                        //     required: true,
                                                        //     valueAsNumber: true,
                                                        //     min: { value: 1, message: 'Amount must be greater than 0' },
                                                        // }   
                                                    )}
                                                    className="pl-9 text-white bg-[#1e293b]"
                                                    placeholder="Enter goal amount"
                                                />
                                            </div>
                                            {errors.goal_amount && (
                                                <p className="text-sm text-destructive">{errors.goal_amount.message}</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Currency Type <span className="text-destructive">*</span></Label>
                                            <Select
                                                //value={currencyType}
                                                onValueChange={handleOnValueChange2}
                                                // onValueChange={(value) => {
                                                //     setValue('currencyType', value as 'USD' | 'EUR' | 'GBP' | 'JPY');
                                                // }}
                                            >
                                                <SelectTrigger className='bg-[#1e293b]'>
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
                                            {/* {errors.currencyType && (
                                                <p className="text-sm text-destructive">{errors.currencyType.message}</p>
                                            )} */}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Image URL <span className="text-destructive">*</span></Label>
                                        <div className="relative grid grid-cols-2">
                                            <Link className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                            {/* <Input
                                                {...register('imageUrl', {
                                                    required: 'Image URL is required',
                                                    pattern: {
                                                        value: /^https?:\/\/.+/,
                                                        message: 'Please enter a valid URL',
                                                    },
                                                })}
                                                className="pl-9 text-white"
                                                placeholder="https://example.com/image"
                                            /> */}
                                            <Input 
                                                {...register('image_url_'
                                                    // , 
                                                    // {
                                                    //     required: 'please upload campaign image'
                                                    // }
                                                )}
                                                type='file'
                                                name='files'
                                                className='pl-9 text-white bg-[#1e293b]'
                                                placeholder='Upload campaign image'
                                                onChange={(e)=>{ handleFileChange(e, 'image_url_'); } }
                                            />
                                        </div>
                                        {
                                            selectedFiles["image_url_"] && 
                                                <p>Selected: {selectedFiles["image_url_"]}</p>
                                        }
                                        {errors.image_url_ && (
                                            <p className="text-sm text-destructive">{errors.image_url_?.message as string}</p>
                                        )}
                                    </div>

                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label>Owner Name <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        {...register('owner.name'
                                                            //, { required: true }
                                                        )}
                                                        placeholder="Enter owner name"
                                                        className='text-white bg-[#1e293b]'
                                                        defaultValue={userName}
                                                        disabled
                                                    />
                                                    {errors.owner?.name && (
                                                        <p className="text-sm text-destructive">{errors.owner.name.message}</p>
                                                    )}
                                                </div>

                                                <div className="space-y-2">
                                                    <Label>Owner Email <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        type="email"
                                                        {...register('owner.email'
                                                            // , {
                                                            //     required: true,
                                                            //     pattern: {
                                                            //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            //         message: 'Invalid email address',
                                                            //     },
                                                            // }
                                                        )}
                                                        className='text-white bg-[#1e293b]'
                                                        placeholder="Enter owner email"
                                                        defaultValue={userEmail}
                                                        disabled
                                                    />
                                                    {errors.owner?.email && (
                                                        <p className="text-sm text-destructive">{errors.owner.email.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* <div className="mt-4 space-y-2">
                                                    <Label>Stripe ID <span className="text-destructive">*</span></Label>
                                                    <Input
                                                        {...register('owner.stripeId', { required: 'Stripe ID is required' })}
                                                        placeholder="Enter Stripe ID"
                                                    />
                                                    {errors.owner?.stripeId && (
                                                        <p className="text-sm text-destructive">{errors.owner.stripeId.message}</p>
                                                    )}
                                                </div> */}
                                                <div className="space-y-2">
                                                    <Label>End Date <span className="text-destructive">*</span></Label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            {...register('end_date'
                                                                // , 
                                                                // {
                                                                //     required: true,
                                                                //     valueAsDate: true,
                                                                //     validate: value => {
                                                                //         if (!value) return 'End Date is required';
                                                                //         const date = new Date(value);
                                                                //         if (isNaN(date.getTime())) return 'Please enter a valid date';
                                                                //         return true;
                                                                //     },
                                                                // }
                                                            )}
                                                            type="date"
                                                            className="pl-9 mb-0 text-white bg-[#1e293b]"
                                                        />
                                                    </div>
                                                    {errors.end_date && (
                                                        <p className="text-sm text-destructive">{errors.end_date?.message as string}</p>
                                                    )}
                                                </div>

                                            </div>

                                        </CardContent>
                                    </Card>

                                    {/* <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="publishedStatus"
                                            {...register('publishedStatus')}
                                        />
                                        <Label htmlFor="publishedStatus">Publish campaign immediately</Label>
                                    </div> */}
                                </TabsContent>

                                <TabsContent key="team" value="team" className="mt-0 space-y-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium">Team Members</h3>
                                        <Button
                                            type="button"
                                            onClick={() =>{
                                                ++campaignFileCount;

                                                return appendTeamMember({
                                                    name: '',
                                                    position: '',
                                                    avatar: '',
                                                    about: ''
                                                })    
                                            }}
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
                                                            onClick={() =>{
                                                                --campaignFileCount;
                                                                removeTeamMember(index)
                                                            }}
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
                                                                    required: true,
                                                                })}
                                                                placeholder="Enter team member name"
                                                                className='text-white bg-[#1e293b]'
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
                                                                    required: true,
                                                                })}
                                                                placeholder="Enter position"
                                                                className='text-white bg-[#1e293b]'
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
                                                                className="pl-9 text-white bg-[#1e293b]"
                                                                placeholder="Enter avatar URL"
                                                                
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2 mb-6">
                                                        <Label>About</Label>
                                                        <Textarea
                                                            {...register(`ourTeam.${index}.about` as const)}
                                                            className="min-h-[100px] text-white bg-[#1e293b]"
                                                            placeholder="Enter team member description"
                                                        />
                                                    </div>

                                                    <div className="space-y-2 mb-6">
                                                        <Label>LinkedIn Profile</Label>
                                                        <Input
                                                            {...register(`ourTeam.${index}.linkedIn` as const,{
                                                                pattern: {
                                                                value: /^https?:\/\/.+/,
                                                                message: 'Please enter a valid linkedIn URL',
                                                            }
                                                            })}
                                                            className="pl-9 text-white bg-[#1e293b]"
                                                            placeholder="Enter avatar URL"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label>CV</Label>
                                                        <Input
                                                            {...register(`ourTeam.${index}.cv` as const)}
                                                            type='file'
                                                            name='files'
                                                            className="pl-9 text-white bg-[#1e293b]"
                                                            placeholder="Upload CV"
                                                            onChange={(e)=>{ handleFileChange(e, `ourTeam.${index}.cv`) }}
                                                        />
                                                        {selectedFiles[`ourTeam.${index}.cv`] && (
                                                            <p>Selected: {selectedFiles[`ourTeam.${index}.cv`]}</p>
                                                        )}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent key="pitch" value="pitch" className="mt-0 space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <Label>Campaign Pitch <span className="text-destructive">*</span></Label>
                                                 {/* <Textarea
                                                    {...register('pitch', { required: true })}
                                                    className="min-h-[400px] text-white bg-[#1e293b]"
                                                    placeholder="Enter your campaign pitch..."
                                                />  */}
                                                {/* <PitchBuilder /> */}
                                                {<PitchbuilderV2 onPitchSet={pitchSet} pitch_={pitchComponents}/>}
                                            </div>
                                            {errors.pitch && (
                                                <p className="text-sm text-destructive">{errors.pitch?.message as string}</p>
                                            )}
                                        </CardContent>
                                    </Card>
                                    
                                </TabsContent>

                                <TabsContent key="business-concept" value="business-concept" className="space-y-6">
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
                                                    <Input 
                                                        {...register('businessName'
                                                            //, { required: 'Businessname is required' }
                                                        )}
                                                        className='text-white bg-[#1e293b]'
                                                        placeholder="Enter your business name"

                                                    />
                                                        {/* {errors.businessName && (
	                                                        <p className="text-sm text-destructive">{errors.businessName.message}</p>
                                                        )} */}
                                                </div>
                                                <div>
                                                    <Label>Business Idea</Label>
                                                    <Textarea
                                                        {...register('businessIdea'
                                                            //, { required: 'Businessidea is required' }
                                                        )}
                                                        placeholder="Describe your product or service"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                    {/* {errors.businessIdea && (
	                                                    <p className="text-sm text-destructive">{errors.businessIdea.message}</p>
                                                    )} */}
                                                </div>
                                                <div>
                                                    <Label>Value Proposition</Label>
                                                    <Textarea
                                                        {...register('valueProposition'
                                                            //, { required: 'Value proposition is required' }
                                                        )}
                                                        placeholder="What makes your offering unique?"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                    {/* {errors.valueProposition && (
	                                                    <p className="text-sm text-destructive">{errors.valueProposition.message}</p>
                                                    )} */}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card>
                                        <CardContent className="pt-6 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-5 w-5" />
                                                <h2 className="text-xl font-semibold">Document Upload</h2>
                                            </div>
                                            <Separator />
                                                <div>
                                                    <Label>Business Model Document ( Upload your detailed business model (PDF, DOC, DOCX - Max 5MB) )</Label>
                                                    <Input
                                                        {...register('businessModelDoc')}
                                                        type="file"
                                                        name='files'
                                                        //accept=".pdf,.doc,.docx"
                                                        accept={ACCEPTED_FILE_TYPES.join(',')}
                                                        className='text-white bg-[#1e293b]'
                                                        onChange={(e)=>{ handleFileChange(e, 'businessModelDoc') }}
                                                    />
                                                    {/* <p>Upload your detailed business model (PDF, DOC, DOCX - Max 5MB)</p> */}
                                                    {selectedFiles["businessModelDoc"] && <p>Selected: {selectedFiles["businessModelDoc"]}</p>}
                                                </div>
                                                <div>
                                                    <Label>Business Plan Document ( Upload your complete business plan (PDF, DOC, DOCX - Max 5MB) )</Label>
                                                    <Input
                                                        {...register('businessPlanDoc')}
                                                        type="file"
                                                        name='files'
                                                        //accept=".pdf,.doc,.docx"
                                                        accept={ACCEPTED_FILE_TYPES.join(',')}
                                                        className='text-white bg-[#1e293b]'
                                                        onChange={(e)=>{ handleFileChange(e, 'businessPlanDoc') }}
                                                    />
                                                    {/* <p>Upload your complete business plan (PDF, DOC, DOCX - Max 5MB)</p> */}
                                                    {selectedFiles["businessPlanDoc"] && <p>Selected: {selectedFiles["businessPlanDoc"]}</p>}
                                                </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent> 

                                <TabsContent key="market-analysis" value="market-analysis" className="space-y-6">
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
                                                        {...register('targetMarket'
                                                            //, { required: true }
                                                        )}
                                                        placeholder="Describe your target customers"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                    {/* {errors.targetMarket && (
	                                                        <p className="text-sm text-destructive">{errors.targetMarket.message}</p>
                                                        )} */}
                                                </div>
                                                <div>
                                                    <Label>Market Size (in USD)</Label>
                                                    <Input 
                                                        {...register('marketSize'
                                                            //, { required: true }
                                                        )}
                                                        type="number" 
                                                        placeholder="Estimated market size" 
                                                        className='text-white bg-[#1e293b]'
                                                    />
                                                    {/* {errors.marketSize && (
	                                                    <p className="text-sm text-destructive">{errors.marketSize.message}</p>
                                                    )} */}
                                                </div>
                                                <div>
                                                    <Label>Competitive Analysis</Label>
                                                    <Textarea
                                                        {...register('competitiveAnalysis'
                                                            //, { required: 'competitiveAnalysis is required' }
                                                        )}
                                                        placeholder="Describe your competitors"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                    {/* {errors.competitiveAnalysis && (
	                                                    <p className="text-sm text-destructive">{errors.competitiveAnalysis.message}</p>
                                                    )} */}
                                                </div>
                                                <div className='hidden'>
                                                    <Label>SWOT Analysis</Label>
                                                    <Textarea
                                                        placeholder="SWOT analysis"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent key="operational" value="operational" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Building2 className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Operational Plan</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Business Location <span className="text-destructive">*</span></Label>
                                                    <Input {...register('businessLocation', {required: true})} placeholder="Where will your business operate?" className='text-white bg-[#1e293b]' />
                                                </div>
                                                {errors.businessLocation && (
                                                    <p className="text-sm text-destructive">{errors.businessLocation?.message as string}</p>
                                                )}
                                                <div>
                                                    <Label>Technology Needs</Label>
                                                    <Textarea
                                                        {...register('technologyNeeds')}
                                                        placeholder="List required technology and tools"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                </div>
                                                <div>
                                                    <Label>Supply Chain</Label>
                                                    <Textarea
                                                        {...register('supplyChain')}
                                                        placeholder="Describe your supply chain process"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent key="financial-projections" value="financial-projections" className="space-y-6">
                                    <Card>
                                        <CardContent className="pt-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Wallet className="h-5 w-5" />
                                                    <h2 className="text-xl font-semibold">Financial Projections</h2>
                                                </div>
                                                <Separator />
                                                <div>
                                                    <Label>Startup Costs (USD) <span className="text-destructive">*</span></Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            {...register('startupCosts', {required: true})}
                                                            type="number"
                                                            className="pl-9 text-white bg-[#1e293b]"
                                                            placeholder="Initial costs needed"
                                                        />
                                                    </div>
                                                    {errors.startupCosts && (
                                                        <p className="text-sm text-destructive">{errors.startupCosts?.message as string}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label>Projected Annual Revenue (USD) <span className="text-destructive">*</span></Label>
                                                    <div className="relative">
                                                        <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input
                                                            {...register('projectedRevenue', {required: true})}
                                                            type="number"
                                                            className="pl-9 text-white bg-[#1e293b]"
                                                            placeholder="Expected revenue"
                                                        />
                                                    </div>
                                                    {errors.projectedRevenue && (
                                                        <p className="text-sm text-destructive">{errors.projectedRevenue?.message as string}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <Label>Break-even Point (months) <span className="text-destructive">*</span></Label>
                                                    <div className="relative">
                                                        <Input
                                                            {...register('breakEvenPoint', {required: true})}
                                                            type="number"
                                                            className="pl-3 text-white bg-[#1e293b]"
                                                            placeholder="Months to break-even"
                                                        />
                                                    </div>
                                                    {errors.breakEvenPoint && (
                                                        <p className="text-sm text-destructive">{errors.breakEvenPoint?.message as string}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent key="legal-structure" value="legal-structure" className="space-y-6">
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
                                                    <Select onValueChange={handleOnValueChange}>
                                                        <SelectTrigger className='bg-[#1e293b]'>
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
                                                        {...register('licensesPermits')}
                                                        placeholder="List required licenses and permits"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={Object.keys(errors).length>0}
                                            className="h-11 sm:h-10 gap-2 flex-1 sm:flex-initial"
                                        >
                                            <Sparkles className="h-4 w-4 flex-shrink-0" />
                                            <span>Submit</span>
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent key="risks-milestones" value="risks-milestones" className="space-y-6">
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
                                                        {...register('risksAndChallenges', { required: 'Title is required' })}
                                                        placeholder="Describe potential risks and mitigation strategies"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
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
                                                        {...register('keyMilestones', { required: 'keyMilestones is required' })}
                                                        placeholder="List important milestones and timeline"
                                                        className="min-h-[100px] text-white bg-[#1e293b]"
                                                    />
                                                </div>
                                                {/* <div>
                                                    <Label>Metrics for Success</Label>
                                                    <Textarea
                                                        {...register('metricsForSuccess', { required: 'Title is required' })}
                                                        placeholder="Define how you'll measure success"
                                                        className="min-h-[100px]"
                                                    />
                                                </div> */}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </div>

                            


                            {/* <div className="p-3 sm:p-6 border-t bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 sticky bottom-0">
                                <Button
                                    type="button"
                                    variant="outline"
                                    //onClick={handleSaveDraft}
                                    disabled={saving}
                                    className="h-11 sm:h-10 gap-2 w-full sm:w-auto"
                                >
                                    <Save className="h-4 w-4 flex-shrink-0" />
                                    <span className="flex-1 sm:flex-initial">{saving ? 'Saving...' : 'Save Draft'}</span>
                                </Button>

                                <div className="flex gap-2 flex-1 sm:flex-initial">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                                        disabled={activeTab === 0}
                                        className="h-11 sm:h-10 gap-2 flex-1 sm:flex-initial"
                                    >
                                        <ChevronLeft className="h-4 w-4 flex-shrink-0" />
                                        <span>Previous</span>
                                    </Button>
                                    {activeTab === TABS.length - 1 ? (
                                        <Button
                                            type="submit"
                                            disabled={!isValid}
                                            className="h-11 sm:h-10 gap-2 flex-1 sm:flex-initial"
                                        >
                                            <Sparkles className="h-4 w-4 flex-shrink-0" />
                                            <span>Submit</span>
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={() => setActiveTab(Math.min(TABS.length - 1, activeTab + 1))}
                                            className="h-11 sm:h-10 gap-2 flex-1 sm:flex-initial"
                                        >
                                            <span>Next</span>
                                            <ChevronRight className="h-4 w-4 flex-shrink-0" />
                                        </Button>
                                    )}
                                </div>
                            </div> */}

                        </form>

                    </Tabs>
                </div>
            </div>
        </div>
    );
}
