// Updated form schema with missing fields added

import * as z from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];

export const formSchema = z.object({
  highlights: z.array(z.object({ description: z.string() })).optional(),
  ourTeam: z.array(z.object({
    name: z.string(),
    position: z.string(),
    avatar: z.string().optional(),
    about: z.string().optional(),
    experience: z.array(z.string()).optional(), // Added experience field
  })).optional(),
  // Existing Fields
  title: z.string().min(1, "Title is required"),
  story: z.string().min(10, "Story is required"),
  resourceUrl: z.string().url("Please enter a valid URL"),
  category: z.enum([
    'CleanTech',
    'FinTech',
    'HealthTech',
    'EdTech',
    'AI/ML',
    'Blockchain',
    'IoT',
    'Other',
  ], { required_error: "Category is required" }),
  goalAmount: z.number().min(1, "Amount must be greater than 0"),
  currencyType: z.enum(['USD', 'EUR', 'GBP', 'JPY'], { required_error: "Currency type is required" }),
  owner: z.object({
    name: z.string().min(1, "Owner name is required"),
    email: z.string().email("Invalid email address"),
    stripeId: z.string().min(1, "Stripe ID is required"),
  }),
  publishedStatus: z.boolean().optional(),

  additionalHighlights: z.array(z.object({
    title: z.string(),
    description: z.string().optional()
  })).optional(),

  // New Fields
  // Business Concept
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  businessIdea: z.string().min(10, "Please provide a detailed business idea"),
  valueProposition: z.string().min(10, "Please describe your value proposition"),
  businessModelDoc: z
    .instanceof(FileList)
    .optional(),
  businessPlanDoc: z
    .instanceof(FileList)
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

  // Valuation Details
  valuation: z.object({
    currentValuation: z.number().min(0, "Current valuation must be positive"),
    lastValuation: z.number().min(0, "Last valuation must be positive"),
    currencyUnit: z.enum(['USD', 'EUR', 'GBP', 'JPY'], { required_error: "Currency unit is required" }),
  }).optional(),

  // Campaign Pitch
  pitch: z.string().min(10, "Campaign pitch is required").optional(),
});
