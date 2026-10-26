export type NavScreen =
  | 'home'
  | 'listings'
  | 'property-detail'
  | 'customer-dashboard'
  | 'construction-progress'
  | 'financial-overview'
  | 'staff-management';

export type PortalMode = 'public' | 'customer' | 'staff';

export interface Property {
  id: string;
  title: string;
  tagline: string;
  location: string;
  state: 'Lagos' | 'Abuja' | 'Ogun / Epe' | 'Oyo';
  priceNgn: number;
  priceGbp: number;
  priceUsd: number;
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

export interface Milestone {
  id: string;
  stepNumber: number;
  title: string;
  phase: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  completionPercentage: number;
  targetDate: string;
  completionDate?: string;
  siteEngineer: string;
  summary: string;
  recentLog: string;
  photosCount: number;
  inspectorApproved: boolean;
}

export interface FinancialMilestone {
  id: string;
  trancheNumber: number;
  title: string;
  description: string;
  amountNgn: number;
  amountGbp: number;
  status: 'paid' | 'due' | 'upcoming' | 'in_escrow';
  invoiceRef: string;
  dueDate: string;
  paidDate?: string;
}

export interface CustomerProject {
  id: string;
  projectCode: string;
  title: string;
  propertyType: string;
  location: string;
  clientName: string;
  clientLocation: string; // e.g. London, United Kingdom
  clientEmail: string;
  startDate: string;
  estimatedHandover: string;
  overallProgress: number; // percentage
  currentMilestoneStage: string;
  siteSupervisor: string;
  cctvLiveAvailable: boolean;
  totalBudgetNgn: number;
  totalBudgetGbp: number;
  paidToDateNgn: number;
  paidToDateGbp: number;
  pendingDueNgn: number;
  pendingDueGbp: number;
  lastInspectionDate: string;
}

export interface StaffProjectSummary {
  id: string;
  projectCode: string;
  clientName: string;
  diasporaCity: string;
  projectTitle: string;
  location: string;
  stage: string;
  progressPercent: number;
  health: 'On Track' | 'Attention Required' | 'Ahead of Schedule';
  assignedEngineer: string;
  lastUpdateDate: string;
  nextMilestoneDeadline: string;
  unpaidMilestoneNgn: number;
}
