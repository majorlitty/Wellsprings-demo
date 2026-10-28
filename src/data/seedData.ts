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

import HERO_IMAGE from '../assets/images/wellsprings_hero_villa_1793020981143.jpg';
import LEKKI_PROPERTY_IMAGE from '../assets/images/wellsprings_property_lekki_1793020981562.jpg';
import ABUJA_PROPERTY_IMAGE from '../assets/images/wellsprings_property_abuja_1793020981884.jpg';
import CONSTRUCTION_SITE_IMAGE from '../assets/images/wellsprings_construction_site_1793020982696.jpg';
import CLIENT_WOMAN_IMAGE from '../assets/images/diaspora_client_woman_1793057513675.jpg';
import CLIENT_MAN_IMAGE from '../assets/images/diaspora_client_man_1793057514379.jpg';

export {
  HERO_IMAGE,
  LEKKI_PROPERTY_IMAGE,
  ABUJA_PROPERTY_IMAGE,
  CONSTRUCTION_SITE_IMAGE,
  CLIENT_WOMAN_IMAGE,
  CLIENT_MAN_IMAGE,
};

// ============================================================================
// 1. THREE PROPERTY LISTINGS ACROSS ABUJA AND LAGOS
// ============================================================================
export const SEED_PROPERTIES: Property[] = [
  {
    id: 'prop-guzape-cliffcrest',
    title: 'The Guzape Cliffcrest Villa',
    tagline: 'Panoramic multi-level luxury residence overlooking Abuja city bowl',
    location: 'Guzape Hills District, Abuja, FCT',
    state: 'Abuja',
    priceNgn: 480_000_000,
    priceGbp: 240_000,
    priceUsd: 310_000,
    landPriceNgn: 130_000_000,
    estimatedConstructionPriceNgn: 350_000_000,
    category: 'Residential Villa',
    status: 'Under Development',
    bedrooms: 5,
    bathrooms: 6,
    landSizeSqm: 850,
    featured: true,
    image: ABUJA_PROPERTY_IMAGE,
    titleDeed: 'Certificate of Occupancy (C of O)',
    description:
      'Engineered specifically for diaspora homeowners demanding European finish standards combined with Abuja hill-elevation vistas. Features double-volume living galleries, infinity plunge pool, automated 25kVA hybrid solar system, and biometric perimeter access.',
    highlights: [
      'Verified FCDA Certificate of Occupancy with zero encumbrance',
      'Dual-source off-grid 25kVA Solar Micro-inverter installation',
      'Dedicated domestic staff quarters & 3-car subterranean garage',
      'Independent borehole water purification with reverse-osmosis filtration'
    ],
    infrastructure: [
      'Paved interlocked asphalt road network with storm drain integration',
      '24/7 Armed perimeter security patrol and fiber-optic CCTV surveillance',
      'Underground electrical distribution ducting'
    ]
  },
  {
    id: 'prop-lekki-solana',
    title: 'Solana Palmwater Residences',
    tagline: 'Contemporary seaside sanctuary in Lekki Phase 1, Lagos',
    location: 'Off Admiralty Way, Lekki Phase 1, Lagos State',
    state: 'Lagos',
    priceNgn: 395_000_000,
    priceGbp: 197_500,
    priceUsd: 255_000,
    landPriceNgn: 145_000_000,
    estimatedConstructionPriceNgn: 250_000_000,
    category: 'Residential Villa',
    status: 'Available',
    bedrooms: 4,
    bathrooms: 5,
    landSizeSqm: 620,
    featured: true,
    image: LEKKI_PROPERTY_IMAGE,
    titleDeed: 'Governor’s Consent',
    description:
      'A tropical modern 4-bedroom detached villa designed for seamless indoor-outdoor family entertaining. Features expansive floor-to-ceiling toughened glass, integrated smart home climate management, and private lap pool with outdoor dining terrace.',
    highlights: [
      'Clean Lagos State Lands Bureau Governor’s Consent',
      'Deep-piled reinforced foundation with saline-resistant waterproofing',
      'Private swimming pool and poolside pergola with bar counter',
      'Fitted Italian kitchen cabinetry with Bosch kitchen appliances'
    ],
    infrastructure: [
      'Independent power supply guaranteeing minimum 22 hours daily electricity',
      'Centralised water treatment plant delivering potable drinking water',
      'Monitored perimeter access control and visitor verification system'
    ]
  },
  {
    id: 'prop-epe-haven',
    title: 'The Haven Waterfront Parcels',
    tagline: 'Prime serviced residential land overlooking the Epe Lagoon basin',
    location: 'Lagoon Highway, Ketu-Epe Eco Corridor, Lagos State',
    state: 'Ogun / Epe',
    priceNgn: 75_000_000,
    priceGbp: 37_500,
    priceUsd: 48_500,
    landPriceNgn: 75_000_000,
    estimatedConstructionPriceNgn: 0,
    category: 'Serviced Plot',
    status: 'Available',
    landSizeSqm: 600,
    featured: true,
    image: HERO_IMAGE,
    titleDeed: 'Governor’s Consent',
    description:
      'High-yield dry land situated along the rapidly appreciating Epe commercial and logistical corridor. Designed for diaspora investors seeking to bank verified land or commission turn-key custom residential construction with Wellsprings.',
    highlights: [
      '100% Dry Table Land with immediate allocation and pegging',
      'Pre-approved residential architectural blueprints available',
      'Direct lagoon frontage with jetty access for marine transit',
      'Flexible 12-month milestone payment structure for diaspora buyers'
    ],
    infrastructure: [
      'Concrete perimeter boundary wall with electrification',
      'Underground drainage and graded gravel access roads',
      'Gated gatehouse with registered surveyor beacons'
    ]
  }
];

// ============================================================================
// 2. ONE SAMPLE CUSTOMER
// ============================================================================
export const SEED_CUSTOMER: Customer = {
  id: 'cust-adeyemi-01',
  clientCode: 'WSP-CLT-UK8842',
  fullName: 'Dr. & Mrs. Olanrewaju Adeyemi',
  title: 'Consultant Neurosurgeon & Health Systems Director',
  email: 'o.adeyemi@wellsprings-client.co.uk',
  phone: '+44 7911 204918',
  diasporaCountry: 'United Kingdom',
  diasporaCity: 'London',
  residentialAddressOverseas: '42 Richmond Hill, London SW15 6TL, United Kingdom',
  preferredCurrency: 'GBP',
  profileAvatarUrl: CLIENT_MAN_IMAGE,
  relationshipManager: 'Tola Adebayo (London Diaspora Desk)',
  joinedDate: '12 March 2025'
};

// ============================================================================
// 3. SAMPLE RESIDENTIAL HOUSE PROJECT IN ABUJA (With separate budgets)
// ============================================================================
export const SEED_PROJECT: Project = {
  id: 'proj-adeyemi-guzape',
  projectCode: 'WSP-2025-GZ04',
  customerId: 'cust-adeyemi-01',
  propertyId: 'prop-guzape-cliffcrest',
  title: 'Adeyemi Guzape Hillside Residence',
  propertyType: '5-Bedroom Contemporary Hillside Villa',
  location: 'Plot 418, Guzape Hills District, Abuja',
  district: 'Guzape Hills Phase II',
  state: 'Abuja',
  status: 'in_progress',
  currentMilestoneId: 'ms-2-blockwork',
  currentMilestoneName: 'Blockwork & Superstructure Decking',
  overallProgressPercentage: 58,
  startDate: '14 May 2025',
  targetCompletionDate: '28 February 2027',
  siteSupervisorName: 'Engr. Babatunde Fashina',
  siteSupervisorCredentials: 'MNSE, COREN Reg. #31821 (Structural Engineering)',
  cctvFeedAvailable: true,

  // Separate land and construction budgets
  landBudgetNgn: 120_000_000, // ₦120M
  constructionBudgetNgn: 330_000_000, // ₦330M
  totalBudgetNgn: 450_000_000, // ₦450M total (~£225,000)

  landPaidNgn: 120_000_000, // 100% paid for land
  constructionPaidNgn: 172_500_000, // Foundation (₦82.5M) + Blockwork tranche (₦90M)
  totalPaidNgn: 292_500_000, // ₦292.5M (~£146,250)

  landRemainingNgn: 0,
  constructionRemainingNgn: 157_500_000,
  totalRemainingNgn: 157_500_000, // ~£78,750

  lastInspectionDate: '22 October 2026',
  notes:
    'All title acquisition completed with registered FCDA Certificate of Occupancy. Construction active on first-floor slab pour.'
};

// ============================================================================
// 4. FIVE CONSTRUCTION MILESTONES (Foundation, Blockwork, Roofing, Finishes, Completion)
// ============================================================================
export const SEED_MILESTONES: ConstructionMilestone[] = [
  {
    id: 'ms-1-foundation',
    projectId: 'proj-adeyemi-guzape',
    stepNumber: 1,
    milestoneCode: 'foundation',
    name: 'Foundation',
    title: 'Site Excavation & Deep Raft Foundation',
    phaseSummary:
      'Core soil testing, anti-termite treatment, high-tensile steel reinforcement cage, and C30/37 marine-grade concrete raft pour.',
    status: 'completed',
    progressPercentage: 100,
    plannedStartDate: '14 May 2025',
    plannedEndDate: '20 August 2025',
    actualStartDate: '14 May 2025',
    actualEndDate: '18 August 2025',
    allocatedConstructionBudgetNgn: 82_500_000,
    disbursedAmountNgn: 82_500_000,
    keyEngineeringDeliverables: [
      'Core rotary borehole soil drill testing to 14m depth',
      'Anti-termite ground chemical barrier application',
      'High-yield BS 4449 steel reinforcement cage installation',
      'Continuous ready-mix concrete pour for 850sqm raft footprint',
      '28-day concrete cube crush test certification (34.2 N/mm²)'
    ],
    engineerSignOff: {
      certified: true,
      engineerName: 'Engr. Babatunde Fashina',
      corenRegistration: 'COREN #31821',
      signOffDate: '18 August 2025',
      cubeStrengthMpa: 34.2
    }
  },
  {
    id: 'ms-2-blockwork',
    projectId: 'proj-adeyemi-guzape',
    stepNumber: 2,
    milestoneCode: 'blockwork',
    name: 'Blockwork',
    title: 'Superstructure Columns, Masonry & Suspended Slab',
    phaseSummary:
      'Erection of reinforced high-yield tensile columns, vibrated sandcrete load-bearing walls, cantilever formwork shuttering, and first-floor deck casting.',
    status: 'in_progress',
    progressPercentage: 80,
    plannedStartDate: '01 September 2025',
    plannedEndDate: '15 November 2026',
    actualStartDate: '01 September 2025',
    allocatedConstructionBudgetNgn: 90_000_000,
    disbursedAmountNgn: 90_000_000,
    keyEngineeringDeliverables: [
      'Ground floor reinforced concrete columns & shear walls',
      '9-inch vibrated sandcrete solid block masonry with mortar bonding',
      'Marine-ply shuttering and falsework staging for suspended deck',
      'Cantilever first-floor terrace rebar installation and inspection',
      'Second ready-mix pour staging and slump test verification'
    ],
    engineerSignOff: {
      certified: true,
      engineerName: 'Engr. Babatunde Fashina',
      corenRegistration: 'COREN #31821',
      signOffDate: '22 October 2026',
      cubeStrengthMpa: 32.8
    }
  },
  {
    id: 'ms-3-roofing',
    projectId: 'proj-adeyemi-guzape',
    stepNumber: 3,
    milestoneCode: 'roofing',
    name: 'Roofing',
    title: 'Roof Trusses, Parapets & Water Retention System',
    phaseSummary:
      'Fabrication of structural galvanized light-gauge steel trusses, Gerard stone-coated aluminum roofing sheets, and torch-on bitumen waterproofing for flat concrete parapet decks.',
    status: 'upcoming',
    progressPercentage: 0,
    plannedStartDate: '20 November 2026',
    plannedEndDate: '20 January 2027',
    allocatedConstructionBudgetNgn: 55_000_000,
    disbursedAmountNgn: 0,
    keyEngineeringDeliverables: [
      'Galvanized light-gauge structural steel roof truss framing',
      '0.55mm stone-coated volcanic granule roofing tiles (50-yr warranty)',
      'Dual-layer torch-on bitumen felt parapet waterproofing membrane',
      'Concealed rainwater downpipe drainage channels'
    ],
    engineerSignOff: {
      certified: false,
      engineerName: 'Engr. Babatunde Fashina',
      corenRegistration: 'COREN #31821'
    }
  },
  {
    id: 'ms-4-finishes',
    projectId: 'proj-adeyemi-guzape',
    stepNumber: 4,
    milestoneCode: 'finishes',
    name: 'Finishes',
    title: 'MEP Services, Screeding, Porcelain Tiling & Glazing',
    phaseSummary:
      'British Standard BS 7671 electrical wiring, concealed PEX plumbing, acoustic double-glazed curtain walls, Italian porcelain floor tiling, and custom kitchen joinery.',
    status: 'upcoming',
    progressPercentage: 0,
    plannedStartDate: '25 January 2027',
    plannedEndDate: '15 April 2027',
    allocatedConstructionBudgetNgn: 70_000_000,
    disbursedAmountNgn: 0,
    keyEngineeringDeliverables: [
      'BS 7671 certified flame-retardant wiring and sub-distribution panels',
      'Acoustic double-glazed tempered aluminum sliding doors and windows',
      'Italian 1200x600 rectified porcelain tiling with waterproof grouting',
      'Solid mahogany interior doors, architraves, and fitted wardrobes',
      'German sanitary fixtures and concealed cistern installations'
    ],
    engineerSignOff: {
      certified: false,
      engineerName: 'Arch. Zainab Al-Hassan & Engr. K. Nnamdi',
      corenRegistration: 'COREN #35104'
    }
  },
  {
    id: 'ms-5-completion',
    projectId: 'proj-adeyemi-guzape',
    stepNumber: 5,
    milestoneCode: 'completion',
    name: 'Completion',
    title: 'Testing, Commissioning, Snagging & Diaspora Handover',
    phaseSummary:
      'Solar microgrid commissioning, borehole reverse-osmosis water testing, snagging clearance audit, legal title handover, and virtual/physical key presentation.',
    status: 'upcoming',
    progressPercentage: 0,
    plannedStartDate: '20 April 2027',
    plannedEndDate: '28 May 2027',
    allocatedConstructionBudgetNgn: 32_500_000,
    disbursedAmountNgn: 0,
    keyEngineeringDeliverables: [
      '25kVA hybrid solar inverter and lithium storage stress-test',
      'Whole-house reverse-osmosis water purification lab certification',
      'Independent punch-list & snagging resolution audit',
      'Digital operational manual and warranties handover',
      'Official key handover ceremony with diaspora remote video stream'
    ],
    engineerSignOff: {
      certified: false,
      engineerName: 'Wellsprings Executive Quality Board',
      corenRegistration: 'COREN Institutional Certification'
    }
  }
];

// ============================================================================
// 5. PROGRESS UPDATES & PHOTO REFERENCES
// ============================================================================
export const SEED_PROGRESS_UPDATES: ProgressUpdate[] = [
  {
    id: 'upd-04-slab-formwork',
    projectId: 'proj-adeyemi-guzape',
    milestoneId: 'ms-2-blockwork',
    milestoneName: 'Blockwork',
    updateDate: '22 October 2026',
    title: 'First-Floor Slab & Suspended Cantilever Formwork Audit',
    narrative:
      'Lead engineer verified structural shuttering, reinforcement spacing, and bar-bending schedule for the first-floor suspended deck. Ready-mix concrete delivery scheduled for Wednesday 08:00 WAT with test cylinders staged for 7-day and 28-day crushing tests.',
    engineerName: 'Engr. Babatunde Fashina',
    engineerRole: 'Lead Structural Consultant (COREN #31821)',
    inspectionType: 'Reinforced Column & Blockwork Audit',
    qaStatus: 'Passed',
    photoReferences: [
      {
        id: 'photo-01',
        url: CONSTRUCTION_SITE_IMAGE,
        caption: 'Surveyor tripod verification and structural column rebar alignment at Plot 418 Guzape',
        timestamp: '22 Oct 2026, 09:42 WAT',
        tags: ['Surveying', 'Rebar', 'Superstructure'],
        gpsLocation: '9.0234° N, 7.5189° E (Guzape Hills)'
      },
      {
        id: 'photo-02',
        url: ABUJA_PROPERTY_IMAGE,
        caption: 'Architectural massing benchmark for Adeyemi Residence terraces',
        timestamp: '22 Oct 2026, 11:15 WAT',
        tags: ['Architecture', 'Elevation', 'Abuja'],
        gpsLocation: '9.0234° N, 7.5189° E'
      }
    ]
  },
  {
    id: 'upd-03-blockwork-columns',
    projectId: 'proj-adeyemi-guzape',
    milestoneId: 'ms-2-blockwork',
    milestoneName: 'Blockwork',
    updateDate: '28 September 2026',
    title: 'Ground Floor Load-Bearing Masonry & Column Casting Completed',
    narrative:
      'All perimeter and internal ground-floor solid vibrated 9-inch block walls erected to lintel level. 16 heavy-duty reinforced columns poured and water-cured for 14 continuous days. Alignment tolerance is well within British Standard 1mm per meter margin.',
    engineerName: 'Engr. Babatunde Fashina',
    engineerRole: 'Lead Structural Consultant (COREN #31821)',
    inspectionType: 'Reinforced Column & Blockwork Audit',
    qaStatus: 'Passed',
    photoReferences: [
      {
        id: 'photo-03',
        url: CONSTRUCTION_SITE_IMAGE,
        caption: 'Column curing and masonry inspection overview',
        timestamp: '28 Sep 2026, 14:20 WAT',
        tags: ['Columns', 'Curing', 'Blockwork'],
        gpsLocation: '9.0234° N, 7.5189° E'
      }
    ]
  },
  {
    id: 'upd-02-raft-crush-test',
    projectId: 'proj-adeyemi-guzape',
    milestoneId: 'ms-1-foundation',
    milestoneName: 'Foundation',
    updateDate: '18 August 2025',
    title: 'Raft Foundation 28-Day Concrete Cube Strength Lab Results (34.2 N/mm²)',
    narrative:
      'Laboratory compressive strength test certificates received from certified material testing lab. 28-day crushing strength recorded at 34.2 N/mm², surpassing the contractually specified C30 mix requirement by 14%. Raft slab passed for superstructure loading.',
    engineerName: 'Engr. Babatunde Fashina',
    engineerRole: 'Lead Structural Consultant (COREN #31821)',
    inspectionType: 'Soil & Raft Foundation Verification',
    qaStatus: 'Passed',
    photoReferences: [
      {
        id: 'photo-04',
        url: CONSTRUCTION_SITE_IMAGE,
        caption: 'Cured foundation slab certified ready for superstructure column starters',
        timestamp: '18 Aug 2025, 16:00 WAT',
        tags: ['Lab Test', 'Foundation', 'QA Certification'],
        gpsLocation: '9.0234° N, 7.5189° E'
      }
    ]
  },
  {
    id: 'upd-01-title-beacon-demarcation',
    projectId: 'proj-adeyemi-guzape',
    milestoneId: 'ms-1-foundation',
    milestoneName: 'Foundation',
    updateDate: '10 June 2025',
    title: 'FCDA Title Verification, Boundary Beacons & Topographical Survey',
    narrative:
      'Federal Capital Development Authority cadastral boundary survey completed. Concrete boundary pillars placed by registered surveyor. AGIS legal search certificate verified zero third-party claims or ancestral encumbrance.',
    engineerName: 'Barr. Folake Adeleke & Surveyor O. Okon',
    engineerRole: 'Lead Conveyancing Counsel & Registered Surveyor',
    inspectionType: 'Soil & Raft Foundation Verification',
    qaStatus: 'Passed',
    photoReferences: [
      {
        id: 'photo-05',
        url: HERO_IMAGE,
        caption: 'Initial topographical layout and boundary charter',
        timestamp: '10 Jun 2025, 10:30 WAT',
        tags: ['Title Deed', 'AGIS Search', 'Survey Beacons'],
        gpsLocation: '9.0234° N, 7.5189° E'
      }
    ]
  }
];

// ============================================================================
// 6. PAYMENT PLAN & SCHEDULE (Separate Land and Construction Budgets)
// ============================================================================
export const SEED_PAYMENT_PLAN: PaymentPlan = {
  id: 'plan-adeyemi-01',
  projectId: 'proj-adeyemi-guzape',
  totalAmountNgn: 450_000_000,
  landPortionNgn: 120_000_000,
  constructionPortionNgn: 330_000_000,
  totalTranches: 6,
  currencyPreference: 'GBP',
  escrowPolicyNotes:
    'Illustrative sample schedule. Land acquisition funds are disbursed upon verified title registration. Construction funds are disbursed strictly after each milestone achieves COREN engineering certification.',
  schedule: [
    {
      id: 'tranche-lnd-01',
      trancheNumber: 1,
      category: 'land',
      title: 'Land Acquisition & FCDA C of O Title Transfer',
      milestoneTrigger: 'AGIS title clearance, deed registration, boundary survey beacons',
      percentageOfBudget: 26.67,
      amountNgn: 120_000_000,
      amountGbp: 60_000,
      dueDate: '15 May 2025',
      paidDate: '14 May 2025',
      status: 'paid',
      invoiceReference: 'INV-WSP-2025-LND01'
    },
    {
      id: 'tranche-cst-01',
      trancheNumber: 2,
      category: 'construction',
      title: 'Milestone 1: Foundation & Substructure Raft (25%)',
      milestoneTrigger: 'Excavation, anti-termite, rebar cage, concrete raft pour & 28-day test',
      percentageOfBudget: 18.33,
      amountNgn: 82_500_000,
      amountGbp: 41_250,
      dueDate: '10 July 2025',
      paidDate: '08 July 2025',
      status: 'paid',
      invoiceReference: 'INV-WSP-2025-CST01'
    },
    {
      id: 'tranche-cst-02',
      trancheNumber: 3,
      category: 'construction',
      title: 'Milestone 2: Blockwork & Suspended Slab (27.3%)',
      milestoneTrigger: 'Ground floor columns, load-bearing blockwork, first floor deck formwork',
      percentageOfBudget: 20.0,
      amountNgn: 90_000_000,
      amountGbp: 45_000,
      dueDate: '05 October 2025',
      paidDate: '03 October 2025',
      status: 'paid',
      invoiceReference: 'INV-WSP-2025-CST02'
    },
    {
      id: 'tranche-cst-03',
      trancheNumber: 4,
      category: 'construction',
      title: 'Milestone 3: Roofing & Parapet Enclosure (16.7%)',
      milestoneTrigger: 'Light-gauge steel trusses, stone-coated aluminum, bitumen waterproofing',
      percentageOfBudget: 12.22,
      amountNgn: 55_000_000,
      amountGbp: 27_500,
      dueDate: '15 November 2026',
      status: 'due',
      invoiceReference: 'INV-WSP-2026-CST03'
    },
    {
      id: 'tranche-cst-04',
      trancheNumber: 5,
      category: 'construction',
      title: 'Milestone 4: Finishes, MEP & Porcelain Tiling (21.2%)',
      milestoneTrigger: 'BS 7671 wiring, plumbing rough-in, Italian porcelain tiling, glazing',
      percentageOfBudget: 15.56,
      amountNgn: 70_000_000,
      amountGbp: 35_000,
      dueDate: '20 February 2027',
      status: 'upcoming',
      invoiceReference: 'INV-WSP-2027-CST04'
    },
    {
      id: 'tranche-cst-05',
      trancheNumber: 6,
      category: 'construction',
      title: 'Milestone 5: Commissioning, Snagging & Keys (9.8%)',
      milestoneTrigger: 'Solar microgrid test, reverse osmosis certification, keys handover',
      percentageOfBudget: 7.22,
      amountNgn: 32_500_000,
      amountGbp: 16_250,
      dueDate: '28 May 2027',
      status: 'upcoming',
      invoiceReference: 'INV-WSP-2027-CST05'
    }
  ]
};

// ============================================================================
// 7. SAMPLE LAND AND CONSTRUCTION PAYMENT RECORDS
// ============================================================================
export const SEED_PAYMENT_RECORDS: PaymentRecord[] = [
  {
    id: 'pay-01-land',
    paymentReference: 'PAY-WSP-2025-LND01',
    projectId: 'proj-adeyemi-guzape',
    customerId: 'cust-adeyemi-01',
    category: 'land',
    trancheNumber: 1,
    milestoneTitle: 'Land Acquisition & FCDA C of O Legal Conveyance',
    amountNgn: 120_000_000,
    amountGbp: 60_000,
    amountUsd: 77_400,
    paymentDate: '14 May 2025',
    paymentMethod: 'UK Direct Bank Wire (GBP)',
    originatingBank: 'Standard Chartered Bank UK (London)',
    beneficiaryAccount: 'Zenith Bank PLC (Nostro Escrow Acc #1019842100)',
    channelReference: 'SCB-LON-FX-992144',
    receiptNumber: 'RCP-WSP-2025-0012',
    status: 'confirmed_cleared',
    certifiedBy: 'Barr. Folake Adeleke (Conveyancing Counsel)',
    illustrativeNote:
      'Illustrative sample record. Simulates UK GBP wire transfer converted via official CBN FX window.'
  },
  {
    id: 'pay-02-foundation',
    paymentReference: 'PAY-WSP-2025-CST01',
    projectId: 'proj-adeyemi-guzape',
    customerId: 'cust-adeyemi-01',
    category: 'construction',
    trancheNumber: 2,
    milestoneTitle: 'Milestone 1: Foundation & Substructure Raft (25%)',
    amountNgn: 82_500_000,
    amountGbp: 41_250,
    amountUsd: 53_200,
    paymentDate: '08 July 2025',
    paymentMethod: 'Standard Chartered Escrow Transfer',
    originatingBank: 'Standard Chartered Bank UK (London)',
    beneficiaryAccount: 'Wellsprings Project Escrow (Guzape 418)',
    channelReference: 'SCB-ESC-TRF-44102',
    receiptNumber: 'RCP-WSP-2025-0104',
    status: 'confirmed_cleared',
    certifiedBy: 'Engr. Babatunde Fashina (Lead Structural QA)',
    illustrativeNote:
      'Illustrative sample record. Released upon independent foundation cube test certification.'
  },
  {
    id: 'pay-03-blockwork',
    paymentReference: 'PAY-WSP-2025-CST02',
    projectId: 'proj-adeyemi-guzape',
    customerId: 'cust-adeyemi-01',
    category: 'construction',
    trancheNumber: 3,
    milestoneTitle: 'Milestone 2: Blockwork & First-Floor Slab (27.3%)',
    amountNgn: 90_000_000,
    amountGbp: 45_000,
    amountUsd: 58_000,
    paymentDate: '03 October 2025',
    paymentMethod: 'UK Direct Bank Wire (GBP)',
    originatingBank: 'Standard Chartered Bank UK (London)',
    beneficiaryAccount: 'Zenith Bank PLC (Nostro Escrow Acc #1019842100)',
    channelReference: 'SCB-LON-FX-104928',
    receiptNumber: 'RCP-WSP-2025-0319',
    status: 'confirmed_cleared',
    certifiedBy: 'Engr. Babatunde Fashina (Lead Structural QA)',
    illustrativeNote:
      'Illustrative sample record. Disbursed upon ground-floor column alignment sign-off.'
  }
];

// ============================================================================
// 8. SAMPLE PROPERTY ENQUIRIES
// ============================================================================
export const SEED_ENQUIRIES: PropertyEnquiry[] = [
  {
    id: 'enq-01-adeleke',
    propertyId: 'prop-guzape-cliffcrest',
    propertyTitle: 'The Guzape Cliffcrest Villa',
    fullName: 'Dr. Dayo Adeleke',
    email: 'dayo.adeleke@nhs.net',
    phone: '+44 7911 384021',
    diasporaCountry: 'United Kingdom',
    diasporaCity: 'London',
    interestType: 'Outright Purchase & Construction',
    proposedTimeline: 'Within 3 months',
    budgetRange: '£200k - £250k',
    paymentPreference: 'Milestone Escrow Tranches (GBP)',
    message:
      'We are looking for a hilltop residence in Abuja with independent solar power and verified FCDA title. Please send the survey beacon plan and milestone payment terms.',
    submittedAt: '24 Oct 2026, 14:15 BST',
    status: 'consultation_scheduled',
    notes: 'Virtual Zoom consultation scheduled with London Diaspora Director on Thursday.'
  },
  {
    id: 'enq-02-nwosu',
    propertyId: 'prop-lekki-solana',
    propertyTitle: 'Solana Palmwater Residences',
    fullName: 'Mrs. Chioma Nwosu',
    email: 'c.nwosu@techcorp-atlanta.com',
    phone: '+1 404 892 1194',
    diasporaCountry: 'United States',
    diasporaCity: 'Atlanta, GA',
    interestType: 'Custom Villa Build',
    proposedTimeline: '6 - 12 months',
    budgetRange: '$250k - $300k',
    paymentPreference: 'Staged Construction Drawdowns (USD)',
    message:
      'Interested in the 4-bedroom detached villa in Lekki Phase 1. Would like to review the Governor’s Consent dossier and understand the remote drone inspection schedule.',
    submittedAt: '25 Oct 2026, 09:30 EST',
    status: 'dossier_sent',
    notes: 'Legal dossier and 3D architectural deck dispatched via secure email.'
  },
  {
    id: 'enq-03-alabi',
    propertyId: 'prop-epe-haven',
    propertyTitle: 'The Haven Waterfront Parcels',
    fullName: 'Mr. Rotimi Alabi',
    email: 'rotimi.alabi@baystreetlaw.ca',
    phone: '+1 416 555 0198',
    diasporaCountry: 'Canada',
    diasporaCity: 'Toronto, ON',
    interestType: 'Land Acquisition Only',
    proposedTimeline: 'Immediate purchase',
    budgetRange: 'CAD 60k - 80k',
    paymentPreference: 'Outright Wire Transfer (CAD)',
    message:
      'Seeking to bank 2 waterfront serviced plots in Epe for future residential construction. Please confirm allocation timeline and perimeter fencing status.',
    submittedAt: '26 Oct 2026, 11:05 EDT',
    status: 'new',
    notes: 'New enquiry awaiting assignment to diaspora conveyancing manager.'
  }
];

// ============================================================================
// COMPLETE SEED DEMO DATA BUNDLE
// ============================================================================
export const INITIAL_DEMO_DATA: AppDemoData = {
  properties: SEED_PROPERTIES,
  customer: SEED_CUSTOMER,
  project: SEED_PROJECT,
  paymentPlan: SEED_PAYMENT_PLAN,
  paymentRecords: SEED_PAYMENT_RECORDS,
  milestones: SEED_MILESTONES,
  progressUpdates: SEED_PROGRESS_UPDATES,
  enquiries: SEED_ENQUIRIES,
  isDemoData: true,
  illustrativeDisclaimer:
    'Illustrative Demonstration Data — All figures, milestone records, and payment receipts are simulated for demonstration purposes. No real monetary transactions or live construction events are recorded.',
  lastUpdated: new Date().toISOString()
};
