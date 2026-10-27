import {
  AppDemoData,
  Property,
  Customer,
  Project,
  PaymentPlan,
  PaymentRecord,
  ConstructionMilestone,
  ProgressUpdate,
  PropertyEnquiry,
} from '../types';

import {
  HERO_IMAGE,
  LEKKI_PROPERTY_IMAGE,
  ABUJA_PROPERTY_IMAGE,
  CONSTRUCTION_SITE_IMAGE,
  CLIENT_WOMAN_IMAGE,
  CLIENT_MAN_IMAGE,
  SEED_PROPERTIES,
  SEED_CUSTOMER,
  SEED_PROJECT,
  SEED_MILESTONES,
  SEED_PROGRESS_UPDATES,
  SEED_PAYMENT_PLAN,
  SEED_PAYMENT_RECORDS,
  SEED_ENQUIRIES,
  INITIAL_DEMO_DATA,
} from './seedData';

export {
  HERO_IMAGE,
  LEKKI_PROPERTY_IMAGE,
  ABUJA_PROPERTY_IMAGE,
  CONSTRUCTION_SITE_IMAGE,
  CLIENT_WOMAN_IMAGE,
  CLIENT_MAN_IMAGE,
  SEED_PROPERTIES,
  SEED_CUSTOMER,
  SEED_PROJECT,
  SEED_MILESTONES,
  SEED_PROGRESS_UPDATES,
  SEED_PAYMENT_PLAN,
  SEED_PAYMENT_RECORDS,
  SEED_ENQUIRIES,
  INITIAL_DEMO_DATA,
};

// Aliases for compatibility with existing components
export const PROPERTIES = SEED_PROPERTIES;
export const CURRENT_CUSTOMER_PROJECT = SEED_PROJECT;
export const PROJECT_MILESTONES = SEED_MILESTONES;
export const FINANCIAL_MILESTONES = SEED_PAYMENT_PLAN.schedule;

export const DIASPORA_SERVICES = [
  {
    step: '01',
    title: 'Verified Land Acquisition',
    description:
      'We eliminate traditional land risks. Every parcel undergoes forensic title vetting at state land registries (Lagos Lands Bureau or AGIS Abuja) with verified Governors Consent or Certificate of Occupancy before purchase.'
  },
  {
    step: '02',
    title: 'Diaspora-Spec Architectural Design',
    description:
      'Custom architectural and engineering design optimized for international diaspora lifestyles — high ceilings, natural ventilation, modern open-plan kitchens, and robust off-grid solar and water backup.'
  },
  {
    step: '03',
    title: 'Milestone-Based Construction & Escrow',
    description:
      'Zero upfront lump sums. Construction proceeds strictly according to contractual engineering milestones. You only disburse funds after our independent QA engineer verifies and uploads timestamped site logs.'
  },
  {
    step: '04',
    title: 'Live Remote Dashboard & Video Audits',
    description:
      'Monitor your site in real time from London, Atlanta, Toronto, or Dubai. Access bi-weekly drone footage, engineer test lab certifications, financial expenditure receipts, and live milestone updates.'
  }
];

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

export const STAFF_PROJECTS: StaffProjectSummary[] = [
  {
    id: 'staff-proj-1',
    projectCode: 'WSP-2025-GZ04',
    clientName: 'Dr. & Mrs. Olanrewaju Adeyemi',
    diasporaCity: 'London, UK',
    projectTitle: 'Guzape Hillside Residence (5-Bed Villa)',
    location: 'Guzape District, Abuja',
    stage: 'Milestone 2: Blockwork & Superstructure Decking',
    progressPercent: 58,
    health: 'On Track',
    assignedEngineer: 'Engr. Babatunde Fashina',
    lastUpdateDate: 'Today, 09:30 WAT',
    nextMilestoneDeadline: '15 Nov 2026',
    unpaidMilestoneNgn: 55_000_000
  },
  {
    id: 'staff-proj-2',
    projectCode: 'WSP-2025-LK09',
    clientName: 'Engr. Emeka & Chidinma Okonkwo',
    diasporaCity: 'Houston, Texas, USA',
    projectTitle: 'Solana Palmwater Duplex',
    location: 'Lekki Phase 1, Lagos',
    stage: 'Milestone 4: Finishes & MEP Services',
    progressPercent: 78,
    health: 'Ahead of Schedule',
    assignedEngineer: 'Engr. Kingsley Nnamdi',
    lastUpdateDate: 'Yesterday, 16:15 WAT',
    nextMilestoneDeadline: '10 Nov 2026',
    unpaidMilestoneNgn: 0
  },
  {
    id: 'staff-proj-3',
    projectCode: 'WSP-2025-EP12',
    clientName: 'Barrister Tunde Balogun',
    diasporaCity: 'Toronto, Canada',
    projectTitle: 'The Haven Waterfront Country Villa',
    location: 'Ketu-Epe Eco Zone, Lagos',
    stage: 'Milestone 1: Raft Foundation Curing',
    progressPercent: 32,
    health: 'Attention Required',
    assignedEngineer: 'Engr. T. Salami',
    lastUpdateDate: '24 Oct 2026',
    nextMilestoneDeadline: '02 Nov 2026',
    unpaidMilestoneNgn: 35_000_000
  },
  {
    id: 'staff-proj-4',
    projectCode: 'WSP-2025-IK02',
    clientName: 'Dr. (Mrs) Amina Bello',
    diasporaCity: 'Dubai, UAE',
    projectTitle: 'Ikoyi Waterway Luxury Penthouse Fit-Out',
    location: 'Banana Island Road, Ikoyi, Lagos',
    stage: 'Milestone 5: Final Snagging & Commissioning',
    progressPercent: 94,
    health: 'On Track',
    assignedEngineer: 'Arch. Zainab Al-Hassan',
    lastUpdateDate: '25 Oct 2026',
    nextMilestoneDeadline: '18 Nov 2026',
    unpaidMilestoneNgn: 28_000_000
  }
];
