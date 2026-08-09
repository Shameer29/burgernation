export interface FranchiseTier {
  id: string;
  name: string;
  badge?: string;
  franchiseFee: string;
  setupCost: string;
  totalInvestment: string;
  royaltyFee: string;
  marketingFee: string;
  spaceRequired: string;
  minSqFt: number;
  mode: string;
  roi: string;
  description: string;
  features: string[];
}

export interface DiscoveryStep {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface LeaderProfile {
  name: string;
  title: string;
  email: string;
  phone?: string;
  bio: string[];
  stats: { label: string; value: string }[];
  skills: { name: string; percentage: number }[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Financials" | "Setup" | "Marketing";
}

export interface CustomerReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export const FRANCHISE_TIERS: FranchiseTier[] = [
  {
    id: "satellite",
    name: "SATELLITE",
    badge: "Express Kiosk / Takeaway",
    franchiseFee: "£15,000",
    setupCost: "£60,000",
    totalInvestment: "£75,000",
    royaltyFee: "8%",
    marketingFee: "3%",
    spaceRequired: "250 Sq. Feet",
    minSqFt: 250,
    mode: "FOCO / FOFO",
    roi: "24 Months",
    description: "Compact cloud kitchen & express takeaway unit designed for high-density delivery zones, retail parks, and transit hubs.",
    features: [
      "Optimized 250 sq.ft minimal footprint",
      "Focus on fast takeaway & delivery orders",
      "Low operational expenditure & staff requirement",
      "Fastest setup timeline (30-45 days)",
      "High profit margin on QSR volume"
    ]
  },
  {
    id: "high-street",
    name: "HIGH STREET / PRIME AREAS",
    badge: "Popular Choice",
    franchiseFee: "£15,000",
    setupCost: "£80,000",
    totalInvestment: "£100,000",
    royaltyFee: "8%",
    marketingFee: "3%",
    spaceRequired: "700 Sq. Feet",
    minSqFt: 700,
    mode: "FOCO / FOFO",
    roi: "24 Months",
    description: "Ideal footprint for high-footfall high streets, shopping parades, and retail hubs with self-service dining.",
    features: [
      "700 sq.ft prime commercial space",
      "Seating capacity for 20-30 guests",
      "Integrated delivery & dine-in layout",
      "Balanced capex and quick break-even",
      "Full menu offering including signature shakes"
    ]
  },
  {
    id: "premium",
    name: "PREMIUM",
    badge: "High Growth",
    franchiseFee: "£15,000",
    setupCost: "£100,000",
    totalInvestment: "£130,000",
    royaltyFee: "8%",
    marketingFee: "4%",
    spaceRequired: "1,000 Sq. Feet",
    minSqFt: 1000,
    mode: "FOCO / FOFO",
    roi: "24 Months",
    description: "Full-scale QSR restaurant offering spacious comfort, full dine-in experience, and high throughput operations.",
    features: [
      "1,000 sq.ft spacious dining space",
      "Seating for 40+ guests with ambient decor",
      "Dedicated order counter & pickup zone",
      "Comprehensive kitchen with double line fryers",
      "Multi-channel marketing drive included"
    ]
  },
  {
    id: "elite",
    name: "ELITE",
    badge: "Flagship Destination",
    franchiseFee: "£15,000",
    setupCost: "£140,000",
    totalInvestment: "£170,000",
    royaltyFee: "8%",
    marketingFee: "4%",
    spaceRequired: "1,500 Sq. Feet",
    minSqFt: 1500,
    mode: "FOCO / FOFO",
    roi: "24 Months",
    description: "The ultimate BURGER NATION flagship dining lounge built to captivate food lovers with premium ambiance and live burger counters.",
    features: [
      "1,500 sq.ft grand flagship destination",
      "Seating capacity for 60+ guests",
      "VIP lounge aesthetic with Instagrammable photo zones",
      "Maximum order output capacity",
      "Priority corporate marketing & influencer launch"
    ]
  }
];

export const DISCOVERY_STEPS: DiscoveryStep[] = [
  {
    step: 1,
    title: "Submit Request Form",
    subtitle: "Step 01",
    description: "Fill out the initial Franchise Interest / RFC Form on our official portal to register your profile.",
    icon: "ClipboardDocumentCheckIcon"
  },
  {
    step: 2,
    title: "Dev Team Contact",
    subtitle: "Step 02",
    description: "A senior member of the BURGER NATION Development Team reaches out for an introductory call & initial screening.",
    icon: "PhoneArrowUpRightIcon"
  },
  {
    step: 3,
    title: "Complete RFC",
    subtitle: "Step 03",
    description: "Provide detailed location preferences, financial capability, and background in the Request for Consideration.",
    icon: "DocumentTextIcon"
  },
  {
    step: 4,
    title: "Submit Application",
    subtitle: "Step 04",
    description: "Formal submission of the Franchise Application along with preferred site details.",
    icon: "PaperAirplaneIcon"
  },
  {
    step: 5,
    title: "Review FDD Document",
    subtitle: "Step 05",
    description: "Review our comprehensive Franchise Disclosure Document detailing terms, ops, and brand commitments.",
    icon: "BookOpenIcon"
  },
  {
    step: 6,
    title: "Conduct Due Diligence",
    subtitle: "Step 06",
    description: "Interact with existing BURGER NATION franchise owners to understand ground reality & support.",
    icon: "UserGroupIcon"
  },
  {
    step: 7,
    title: "Submit Management Plan",
    subtitle: "Step 07",
    description: "Present your operational and store management plan for approval by the executive board.",
    icon: "ChartBarSquareIcon"
  },
  {
    step: 8,
    title: "Agreement & Launch",
    subtitle: "Step 08",
    description: "Execute the Franchise Agreement, initiate turnkey vendor build-out, staff training, and grand opening!",
    icon: "RocketLaunchIcon"
  }
];

export const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    name: "RAHIM",
    title: "Founder & CEO",
    email: "rahim@burgernation.co.uk",
    bio: [
      "A visionary leader with phenomenal experience in the field of F&B & Hospitality industries across the UK market.",
      "Expertise in franchises, food outlets, business expansion & leadership. Proven entrepreneurial skills to mobilize leadership teams nationwide.",
      "Founded and built BURGER NATION from the ground up, growing it into a multi-outlet franchise across London.",
      "A dedicated philanthropist committed to making a positive impact by supporting causes that matter to society."
    ],
    stats: [
      { label: "London Outlets", value: "15+" },
      { label: "Team Strength", value: "250+" },
      { label: "Years in F&B", value: "20+" }
    ],
    skills: [
      { name: "Leadership", percentage: 99 },
      { name: "Vision", percentage: 100 },
      { name: "Planning", percentage: 95 },
      { name: "Business Development", percentage: 95 },
      { name: "Initiative", percentage: 100 },
      { name: "Social Responsibility", percentage: 100 }
    ]
  },
  {
    name: "AZEEM",
    title: "Operations Director",
    email: "azeem@burgernation.co.uk",
    bio: [
      "Oversees day-to-day operations across all BURGER NATION outlets, ensuring consistency in quality, service, and brand standards nationwide.",
      "Expertise in franchise operations, site acquisitions, vendor management, and staff training programs.",
      "Works directly with franchise partners to streamline launches and maintain operational excellence post-opening.",
      "A dedicated philanthropist committed to making a positive impact by supporting causes that matter to society."
    ],
    stats: [
      { label: "London Outlets", value: "15+" },
      { label: "Team Strength", value: "250+" },
      { label: "Years in F&B", value: "20+" }
    ],
    skills: [
      { name: "Operations", percentage: 99 },
      { name: "Leadership", percentage: 95 },
      { name: "Delegation", percentage: 95 },
      { name: "Vendor Management", percentage: 95 },
      { name: "Staff Training", percentage: 100 },
      { name: "Quality Control", percentage: 100 }
    ]
  }
];

export const REQUIRED_LICENSES = [
  { id: "06", name: "Companies House Registration", icon: "TrophyIcon" },
  { id: "07", name: "Food Hygiene Rating (FSA)", icon: "SignalIcon" },
  { id: "08", name: "Premises License", icon: "BuildingStorefrontIcon" },
  { id: "09", name: "HMRC / VAT Registration", icon: "AcademicCapIcon" },
  { id: "10", name: "Fire Safety Certificate", icon: "ShieldCheckIcon" }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    name: "Mobi Khan",
    rating: 5,
    comment: "FRIES ARE TO DIE FOR 🍟 The burgers here are genuinely different to anything else nearby — amazing, unique taste.",
    date: "Reviewed on Google",
    verified: true
  },
  {
    name: "Elliyas Mohammed",
    rating: 5,
    comment: "New burger shop in town. Love their burgers and signature house sauces!",
    date: "Reviewed on Google",
    verified: true
  },
  {
    name: "Sankar Pandey",
    rating: 5,
    comment: "Excellent and fresh burgers. Good ambiance and explanation of each item. Loved it and strongly recommend it.",
    date: "Reviewed on Google",
    verified: true
  },
  {
    name: "Rajesh Rajkumar",
    rating: 5,
    comment: "Visited Burger Nation for dinner and had an amazing time. The service, food, quality, cleanliness – everything was top-notch. Would definitely recommend!",
    date: "Reviewed on Google",
    verified: true
  },
  {
    name: "Dr. Vidhya Ravi",
    rating: 5,
    comment: "The interiors were cozy, classy, and welcoming. A good burger after a long time. Milkshake lovers don't miss the milkshake. Highlight is that they give kid meals in a box!",
    date: "Reviewed on Google",
    verified: true
  },
  {
    name: "Yuvraj Chandrasekar",
    rating: 5,
    comment: "Had a good time with family at Burger Nation. Very good ambiance. Had a real burger bite, tasty and meaty. Kids loved the juicy cheesy.",
    date: "Reviewed on Google",
    verified: true
  }
];

export const FRANCHISE_FAQS: FAQItem[] = [
  {
    category: "Setup",
    question: "How do I begin the BURGER NATION Franchise application process?",
    answer: "Fill out the online Franchise Application form on this website or contact our development team at corporate@burgernation.co.uk. Our team will get in touch with you for initial evaluation."
  },
  {
    category: "Setup",
    question: "Will BURGER NATION help with finding and assessing a location?",
    answer: "Yes! BURGER NATION provides data-driven location selection based on footfall analysis, market competition, accessibility, and online delivery sales data."
  },
  {
    category: "Setup",
    question: "Who carries out the store fit-out and project setup?",
    answer: "The outlet setup and interior design work is carried out exclusively by BURGER NATION-approved turnkey vendors with global brand experience. Itemized cost estimates are transparently shared."
  },
  {
    category: "Setup",
    question: "Can I do the store project setup on my own?",
    answer: "To maintain global quality standards, uniform branding, and kitchen ergonomics, setup must be executed by BURGER NATION-approved vendors with proven experience."
  },
  {
    category: "Financials",
    question: "What are the Royalty fees associated with running a BURGER NATION restaurant?",
    answer: "Franchisees pay a standard royalty fee of 8% of monthly net sales for ongoing operations, recipes, menu updates, and brand management."
  },
  {
    category: "Marketing",
    question: "What is the fee for Advertising & Digital Marketing?",
    answer: "Franchisees contribute 3% to 4% (depending on store tier) of sales to the centralized BURGER NATION Marketing Fund. Our in-house marketing team manages Zomato/Swiggy campaigns, Instagram/Facebook ads, Google search ads, and local offline promotions."
  },
  {
    category: "Setup",
    question: "How long does it take from signing to store launch?",
    answer: "The timeline to make the outlet fully operational is 60 to 70 days (approx. 2.5 months) once the Franchise Agreement is executed and location is finalized."
  },
  {
    category: "General",
    question: "Who is the primary target audience for BURGER NATION?",
    answer: "Our core target audience spans middle-class and affluent consumers aged 14 to 50, with high concentration among college students, young working professionals, and families."
  },
  {
    category: "Financials",
    question: "What is the expected ROI (Return on Investment)?",
    answer: "ROI depends on parameters like location, rental terms, and operational efficiency. However, based on our unit economics, franchisees typically achieve full payback within 24 months."
  }
];
