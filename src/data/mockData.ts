import { Property, CustomerProject, Milestone, FinancialMilestone, StaffProjectSummary } from '../types';

export const HERO_IMAGE = '/src/assets/images/wellsprings_hero_villa_1793020981143.jpg';
export const LEKKI_PROPERTY_IMAGE = '/src/assets/images/wellsprings_property_lekki_1793020981562.jpg';
export const ABUJA_PROPERTY_IMAGE = '/src/assets/images/wellsprings_property_abuja_1793020981884.jpg';
export const CONSTRUCTION_SITE_IMAGE = '/src/assets/images/wellsprings_construction_site_1793020982696.jpg';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-guzape-heights',
    title: 'The Guzape Cliffcrest Villa',
    tagline: 'Panoramic multi-level luxury residence overlooking Abuja city bowl',
    location: 'Guzape Hills, Federal Capital Territory, Abuja',
    state: 'Abuja',
    priceNgn: 480_000_000,
    priceGbp: 240_000,
    priceUsd: 310_000,
    category: 'Residential Villa',
    status: 'Under Development',
    bedrooms: 5,
    bathrooms: 6,
    landSizeSqm: 850,
    featured: true,
    image: ABUJA_PROPERTY_IMAGE,
    titleDeed: 'Certificate of Occupancy (C of O)',
    description:
      'Engineered specifically for diaspora homeowners demanding European finish standards combined with Abuja hill-elevation vistas. Features double-volume living galleries, infinity plunge pool, automated solar inverter hybrid system, and biometric perimeter access.',
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
    tagline: 'Contemporary seaside sanctuary in Lekki Phase 1',
    location: 'Off Admiralty Way, Lekki Phase 1, Lagos State',
    state: 'Lagos',
    priceNgn: 395_000_000,
    priceGbp: 198_000,
    priceUsd: 255_000,
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
    id: 'prop-epe-waterfront',
    title: 'The Haven Waterfront Parcels',
    tagline: 'Prime serviced residential land overlooking the Epe Lagoon basin',
    location: 'Lagoon Highway, Ketu-Epe Eco Corridor, Lagos State',
    state: 'Ogun / Epe',
    priceNgn: 75_000_000,
    priceGbp: 38_000,
    priceUsd: 48_500,
    category: 'Serviced Plot',
    status: 'Available',
    landSizeSqm: 600,
    featured: true,
    image: HERO_IMAGE,
    titleDeed: 'Governor’s Consent',
    description:
      'High-yield dry land situated along the rapidly appreciating Epe commercial and logistical corridor. Designed for diaspora investors seeking to bank verified land or commission turn-key custom residential construction with Wellsprings.',
    highlights: [
      '100% 100% Dry Table Land with immediate allocation and pegging',
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

export const CURRENT_CUSTOMER_PROJECT: CustomerProject = {
  id: 'proj-adeyemi-guzape',
  projectCode: 'WSP-2025-GZ04',
  title: 'Adeyemi Guzape Hillside Residence',
  propertyType: '5-Bedroom Contemporary Hillside Villa',
  location: 'Plot 418, Guzape Hills District, Abuja',
  clientName: 'Dr. & Mrs. Olanrewaju Adeyemi',
  clientLocation: 'London, United Kingdom (Diaspora Account #UK-8842)',
  clientEmail: 'o.adeyemi@wellsprings-client.co.uk',
  startDate: '14 May 2025',
  estimatedHandover: '28 February 2027',
  overallProgress: 64,
  currentMilestoneStage: 'Phase 3: Superstructure Concrete & First-Floor Slab Pour',
  siteSupervisor: 'Engr. Babatunde Fashina (MNSE, COREN)',
  cctvLiveAvailable: true,
  totalBudgetNgn: 450_000_000,
  totalBudgetGbp: 225_000,
  paidToDateNgn: 292_500_000,
  paidToDateGbp: 146_250,
  pendingDueNgn: 45_000_000,
  pendingDueGbp: 22_500,
  lastInspectionDate: '22 October 2026'
};

export const PROJECT_MILESTONES: Milestone[] = [
  {
    id: 'm-1',
    stepNumber: 1,
    title: 'Site Acquisition & Legal Title Verification',
    phase: 'Land & Pre-Development',
    status: 'completed',
    completionPercentage: 100,
    targetDate: '15 June 2025',
    completionDate: '10 June 2025',
    siteEngineer: 'Barr. Folake Adeleke (Legal) & Surveyor O. Okon',
    summary: 'Full FCDA title search completed, registered boundary beacon coordinates chartered and certified with Governor’s consent.',
    recentLog: 'Original C of O verified at Abuja Geographic Information Systems (AGIS). Deeds registered with zero third-party claims.',
    photosCount: 8,
    inspectorApproved: true
  },
  {
    id: 'm-2',
    stepNumber: 2,
    title: 'Soil Testing, Excavation & Deep Foundation',
    phase: 'Substructure',
    status: 'completed',
    completionPercentage: 100,
    targetDate: '20 August 2025',
    completionDate: '18 August 2025',
    siteEngineer: 'Engr. Babatunde Fashina, COREN',
    summary: 'Core rotary soil drill to 14 meters. Reinforced cast-in-situ concrete raft foundation poured with C30/37 marine-grade mix.',
    recentLog: 'Independent cube test laboratory report certified 28-day crushing strength at 34.2 N/mm² (exceeds specification).',
    photosCount: 16,
    inspectorApproved: true
  },
  {
    id: 'm-3',
    stepNumber: 3,
    title: 'Superstructure Framing & Suspended First-Floor Slab',
    phase: 'Structural Framework',
    status: 'in_progress',
    completionPercentage: 75,
    targetDate: '15 November 2026',
    siteEngineer: 'Engr. Babatunde Fashina, COREN',
    summary: 'Erection of reinforced high-yield tensile columns, cantilever formwork shuttering, and first-floor deck reinforcement.',
    recentLog: 'Formwork inspection approved by lead structural consultant. Second pour scheduled for Wednesday 08:00 WAT.',
    photosCount: 24,
    inspectorApproved: true
  },
  {
    id: 'm-4',
    stepNumber: 4,
    title: 'Roof Trusses, Parapet Decking & Waterproof Membrane',
    phase: 'Enclosure',
    status: 'upcoming',
    completionPercentage: 0,
    targetDate: '15 January 2027',
    siteEngineer: 'Engr. Babatunde Fashina, COREN',
    summary: 'Structural galvanized light-gauge steel roof truss installation, Gerard roofing sheets with stone granules, torch-on bitumen felt.',
    recentLog: 'Materials requisition placed. Steel shipment cleared and staged at site depot.',
    photosCount: 0,
    inspectorApproved: false
  },
  {
    id: 'm-5',
    stepNumber: 5,
    title: 'Mechanical, Electrical & Plumbing (MEP) First Fix',
    phase: 'Services',
    status: 'upcoming',
    completionPercentage: 0,
    targetDate: '28 February 2027',
    siteEngineer: 'Engr. Kingsley Nnamdi (Services)',
    summary: 'Concealed copper piping, PEX drainage lines, fire alarm conduits, structured Cat6 Ethernet and inverter trunking.',
    recentLog: 'MEP schematics approved against British Standard BS 7671 electrical safety regulations.',
    photosCount: 0,
    inspectorApproved: false
  },
  {
    id: 'm-6',
    stepNumber: 6,
    title: 'Interior Plastering, Porcelain Tiling & Glazing',
    phase: 'Finishes & Fit-Out',
    status: 'upcoming',
    completionPercentage: 0,
    targetDate: '15 April 2027',
    siteEngineer: 'Arch. Zainab Al-Hassan',
    summary: 'Screeding, Italian porcelain 1200x600 floor tiles, double-glazed acoustic aluminum curtain walls, and solid mahogany doors.',
    recentLog: 'Tile sample batch and sanitary ware catalog dispatched to client in London for sign-off.',
    photosCount: 0,
    inspectorApproved: false
  },
  {
    id: 'm-7',
    stepNumber: 7,
    title: 'External Landscaping, Testing & Diaspora Handover',
    phase: 'Commissioning & Handover',
    status: 'upcoming',
    completionPercentage: 0,
    targetDate: '28 May 2027',
    siteEngineer: 'Wellsprings Executive Quality Board',
    summary: 'Full snagging audit, MEP pressure testing, smart-home automation handover, legal title handover and physical key ceremony.',
    recentLog: 'Diaspora remote handover live-stream protocol established.',
    photosCount: 0,
    inspectorApproved: false
  }
];

export const FINANCIAL_MILESTONES: FinancialMilestone[] = [
  {
    id: 'fin-1',
    trancheNumber: 1,
    title: 'Initial Land Verification & Mobilisation Deposit (25%)',
    description: 'Title verification at FCDA/AGIS, site topography survey, perimeter fencing, soil test and site mobilization.',
    amountNgn: 112_500_000,
    amountGbp: 56_250,
    status: 'paid',
    invoiceRef: 'INV-WSP-2025-0104',
    dueDate: '20 May 2025',
    paidDate: '18 May 2025'
  },
  {
    id: 'fin-2',
    trancheNumber: 2,
    title: 'Foundation & Substructure Raft Completion (20%)',
    description: 'Excavation, anti-termite treatment, steel reinforcement cage, ready-mix concrete raft and ground beams.',
    amountNgn: 90_000_000,
    amountGbp: 45_000,
    status: 'paid',
    invoiceRef: 'INV-WSP-2025-0219',
    dueDate: '25 July 2025',
    paidDate: '24 July 2025'
  },
  {
    id: 'fin-3',
    trancheNumber: 3,
    title: 'Ground Floor Columns & First-Floor Suspended Slab (20%)',
    description: 'Column erection, timber falsework, first-floor deck casting, and curing period structural tests.',
    amountNgn: 90_000_000,
    amountGbp: 45_000,
    status: 'paid',
    invoiceRef: 'INV-WSP-2025-0391',
    dueDate: '10 October 2025',
    paidDate: '09 October 2025'
  },
  {
    id: 'fin-4',
    trancheNumber: 4,
    title: 'Roofing, Parapets & Perimeter Enclosure (10%)',
    description: 'Steel roof trusses, insulation, stone-coated aluminum roofing sheets, parapet waterproofing.',
    amountNgn: 45_000_000,
    amountGbp: 22_500,
    status: 'due',
    invoiceRef: 'INV-WSP-2026-0412',
    dueDate: '05 November 2026'
  },
  {
    id: 'fin-5',
    trancheNumber: 5,
    title: 'Mechanical, Electrical & First-Fix Piping (10%)',
    description: 'Conduit work, sanitary rough-in, electrical cable installation, solar battery storage room prep.',
    amountNgn: 45_000_000,
    amountGbp: 22_500,
    status: 'upcoming',
    invoiceRef: 'INV-WSP-2026-0520',
    dueDate: '15 January 2027'
  },
  {
    id: 'fin-6',
    trancheNumber: 6,
    title: 'Interior Joinery, Glazing, Tiling & Sanitary (10%)',
    description: 'Floor and wall porcelain tiling, kitchen installation, European bathroom sets, aluminum glazing.',
    amountNgn: 45_000_000,
    amountGbp: 22_500,
    status: 'upcoming',
    invoiceRef: 'INV-WSP-2026-0618',
    dueDate: '25 March 2027'
  },
  {
    id: 'fin-7',
    trancheNumber: 7,
    title: 'Final Quality Audit, Snagging Clearance & Handover (5%)',
    description: 'Snag list resolution, final certificate of occupancy transfer, keys and warranty issuance.',
    amountNgn: 22_500_000,
    amountGbp: 11_250,
    status: 'upcoming',
    invoiceRef: 'INV-WSP-2026-0700',
    dueDate: '28 May 2027'
  }
];

export const STAFF_PROJECTS: StaffProjectSummary[] = [
  {
    id: 'staff-proj-1',
    projectCode: 'WSP-2025-GZ04',
    clientName: 'Dr. & Mrs. Olanrewaju Adeyemi',
    diasporaCity: 'London, UK',
    projectTitle: 'Guzape Hillside Residence (5-Bed Villa)',
    location: 'Guzape District, Abuja',
    stage: 'Phase 3: Suspended First-Floor Slab',
    progressPercent: 64,
    health: 'On Track',
    assignedEngineer: 'Engr. Babatunde Fashina',
    lastUpdateDate: 'Today, 09:30 WAT',
    nextMilestoneDeadline: '15 Nov 2026',
    unpaidMilestoneNgn: 45_000_000
  },
  {
    id: 'staff-proj-2',
    projectCode: 'WSP-2025-LK09',
    clientName: 'Engr. Emeka & Chidinma Okonkwo',
    diasporaCity: 'Houston, Texas, USA',
    projectTitle: 'Solana Palmwater Duplex',
    location: 'Lekki Phase 1, Lagos',
    stage: 'Phase 5: MEP First-Fix & Solar Inverter Cabling',
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
    stage: 'Phase 2: Raft Foundation Curing',
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
    stage: 'Phase 6: Final Snagging & Custom Joinery',
    progressPercent: 94,
    health: 'On Track',
    assignedEngineer: 'Arch. Zainab Al-Hassan',
    lastUpdateDate: '25 Oct 2026',
    nextMilestoneDeadline: '18 Nov 2026',
    unpaidMilestoneNgn: 28_000_000
  }
];

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
