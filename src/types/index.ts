export type NavScreen =
  | 'home'
  | 'listings'
  | 'property-detail'
  | 'customer-dashboard'
  | 'construction-progress'
  | 'financial-overview'
  | 'staff-management';

export type PortalMode = 'public' | 'customer' | 'staff';

// ============================================================================
// 1. PROPERTY TYPE
// ============================================================================
export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  state: 'Lagos' | 'Abuja' | 'Ogun / Epe' | 'Oyo';
  priceNgn: number;
  priceGbp: number;
  priceUsd: number;
  landPriceNgn: number;
  estimatedConstructionPriceNgn: number;
  category: 'Residential Villa' | 'Serviced Plot' | 'Waterfront Mansion' | 'Semi-Detached Duplex';
  status: 'Available' | 'Under Development' | 'Off-Plan' | 'Sold Out';
  bedrooms?: number;
  bathrooms?: number;
  landSizeSqm: number;
  featured: boolean;
  image: string;
  titleDeed: 'Governor’s Consent' | 'Certificate of Occupancy (C of O)' | 'Gazette & Registered Survey';
  description: string;
  highlights: string[];
  infrastructure: string[];
}

// ============================================================================
// 2. CUSTOMER TYPE
// ============================================================================
export interface Customer {
  id: string;
  clientCode: string;
  fullName: string;
  title: string;
  email: string;
  phone: string;
  diasporaCountry: string; // e.g. "United Kingdom"
  diasporaCity: string; // e.g. "London"
  residentialAddressOverseas: string;
  preferredCurrency: 'NGN' | 'GBP' | 'USD';
  profileAvatarUrl?: string;
  relationshipManager: string;
  joinedDate: string;
}

// ============================================================================
// 3. PROJECT TYPE (with separate land and construction budgets)
// ============================================================================
export interface Project {
  id: string;
  projectCode: string;
  customerId: string;
  propertyId: string;
  title: string;
  propertyType: string;
  location: string;
  district: string;
  state: 'Abuja' | 'Lagos' | 'Ogun / Epe';
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  currentMilestoneId: string;
  currentMilestoneName: string;
  overallProgressPercentage: number;
  startDate: string;
  targetCompletionDate: string;
  siteSupervisorName: string;
  siteSupervisorCredentials: string;
  cctvFeedAvailable: boolean;

  // Separate land & construction budgets (as required by prompt)
  landBudgetNgn: number;
  constructionBudgetNgn: number;
  totalBudgetNgn: number;

  landPaidNgn: number;
  constructionPaidNgn: number;
  totalPaidNgn: number;

  landRemainingNgn: number;
  constructionRemainingNgn: number;
  totalRemainingNgn: number;

  lastInspectionDate: string;
  notes: string;
}

// ============================================================================
// 4. PAYMENT PLAN TYPE
// ============================================================================
export interface PaymentScheduleItem {
  id: string;
  trancheNumber: number;
  category: 'land' | 'construction';
  title: string;
  milestoneTrigger: string;
  percentageOfBudget: number;
  amountNgn: number;
  amountGbp: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'due' | 'upcoming';
  invoiceReference: string;
}

export interface PaymentPlan {
  id: string;
  projectId: string;
  totalAmountNgn: number;
  landPortionNgn: number;
  constructionPortionNgn: number;
  totalTranches: number;
  currencyPreference: 'NGN' | 'GBP' | 'USD';
  schedule: PaymentScheduleItem[];
  escrowPolicyNotes: string;
}

// ============================================================================
// 5. PAYMENT RECORD TYPE
// ============================================================================
export interface PaymentRecord {
  id: string;
  paymentReference: string;
  projectId: string;
  customerId: string;
  category: 'land' | 'construction';
  trancheNumber?: number;
  milestoneTitle: string;
  amountNgn: number;
  amountGbp: number;
  amountUsd: number;
  paymentDate: string;
  paymentMethod:
    | 'UK Direct Bank Wire (GBP)'
    | 'US International Wire (USD)'
    | 'CBN Nostro FX Remittance'
    | 'Standard Chartered Escrow Transfer'
    | 'Zenith Bank Diaspora Direct Transfer';
  originatingBank: string;
  beneficiaryAccount: string;
  channelReference: string;
  receiptNumber: string;
  status: 'confirmed_cleared' | 'processing_in_escrow' | 'pending_verification';
  certifiedBy: string;
  illustrativeNote: string;
}

// ============================================================================
// 6. CONSTRUCTION MILESTONE TYPE (The 5 Milestones: Foundation, Blockwork, Roofing, Finishes, Completion)
// ============================================================================
export type MilestoneCode =
  | 'foundation'
  | 'blockwork'
  | 'roofing'
  | 'finishes'
  | 'completion';

export interface ConstructionMilestone {
  id: string;
  projectId: string;
  stepNumber: number; // 1 to 5
  milestoneCode: MilestoneCode;
  name: 'Foundation' | 'Blockwork' | 'Roofing' | 'Finishes' | 'Completion';
  title: string;
  phaseSummary: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  progressPercentage: number; // 0 to 100
  plannedStartDate: string;
  plannedEndDate: string;
  actualStartDate?: string;
  actualEndDate?: string;
  allocatedConstructionBudgetNgn: number;
  disbursedAmountNgn: number;
  keyEngineeringDeliverables: string[];
  engineerSignOff: {
    certified: boolean;
    engineerName: string;
    corenRegistration: string;
    signOffDate?: string;
    cubeStrengthMpa?: number; // e.g. 34.2
  };
}

// ============================================================================
// 7. PROGRESS UPDATE & PHOTO REFERENCES
// ============================================================================
export interface ProgressPhoto {
  id: string;
  url: string;
  caption: string;
  timestamp: string;
  tags: string[];
  gpsLocation: string;
}

export interface ProgressUpdate {
  id: string;
  projectId: string;
  milestoneId: string;
  milestoneName: string;
  updateDate: string;
  title: string;
  narrative: string;
  engineerName: string;
  engineerRole: string;
  inspectionType:
    | 'Soil & Raft Foundation Verification'
    | 'Reinforced Column & Blockwork Audit'
    | 'Roof Truss & Membrane Inspection'
    | 'Mechanical & Electrical Rough-In Inspection'
    | 'Finishing & Pre-Handover Snagging';
  photoReferences: ProgressPhoto[];
  qaStatus: 'Passed' | 'Action Item Resolved' | 'Under Observation';
}

// ============================================================================
// 8. PROPERTY ENQUIRY TYPE
// ============================================================================
export interface PropertyEnquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  fullName: string;
  email: string;
  phone: string;
  diasporaCountry: string;
  diasporaCity?: string;
  interestType: 'Outright Purchase & Construction' | 'Land Acquisition Only' | 'Custom Villa Build';
  proposedTimeline: string;
  budgetRange?: string;
  paymentPreference?: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed' | 'consultation_scheduled' | 'dossier_sent';
  notes?: string;
}

// ============================================================================
// COMPLETE SHARED APP DEMO STATE
// ============================================================================
export interface AppDemoData {
  properties: Property[];
  customer: Customer;
  project: Project;
  paymentPlan: PaymentPlan;
  paymentRecords: PaymentRecord[];
  milestones: ConstructionMilestone[];
  progressUpdates: ProgressUpdate[];
  enquiries: PropertyEnquiry[];
  isDemoData: boolean;
  illustrativeDisclaimer: string;
  lastUpdated: string;
}
