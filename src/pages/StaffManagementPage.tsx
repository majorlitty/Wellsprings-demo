import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { STAFF_PROJECTS, CONSTRUCTION_SITE_IMAGE, ABUJA_PROPERTY_IMAGE, HERO_IMAGE } from '../data/mockData';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency } from '../utils/formatters';
import { PropertyEnquiry, ConstructionMilestone, ProgressPhoto, PaymentRecord } from '../types';
import {
  Shield,
  HardHat,
  Users,
  Search,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Layers,
  Globe,
  Sparkles,
  Clock,
  MessageSquare,
  Building2,
  CreditCard,
  Landmark,
  Calendar,
  Check,
  X,
  ArrowRight,
  Filter,
  DollarSign,
  Phone,
  Mail,
  Receipt,
  ExternalLink,
  Plus,
  Edit3,
  Camera,
  Upload,
  Info,
  CheckCircle,
} from 'lucide-react';

export const StaffManagementPage: React.FC = () => {
  const {
    navigateTo,
    currency,
    project,
    milestones,
    progressUpdates,
    paymentRecords,
    enquiries,
    updateEnquiryStatus,
    updateMilestone,
    addProgressUpdate,
    addPaymentRecord,
    updatePaymentRecord,
  } = useApp();

  // Active Main Tab
  const [activeStaffTab, setActiveStaffTab] = useState<'enquiries' | 'milestones' | 'add_update' | 'payments' | 'portfolio'>('enquiries');

  // Universal Feedback Toast
  const [statusFeedback, setStatusFeedback] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  // --------------------------------------------------------------------------
  // ENQUIRY MANAGEMENT STATE
  // --------------------------------------------------------------------------
  const [enquirySearchQuery, setEnquirySearchQuery] = useState<string>('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<'all' | 'new' | 'contacted' | 'qualified' | 'closed'>('all');
  const [selectedEnquiryModal, setSelectedEnquiryModal] = useState<PropertyEnquiry | null>(null);

  // --------------------------------------------------------------------------
  // 1. CONSTRUCTION MILESTONE MANAGEMENT STATE (Requirement 1)
  // --------------------------------------------------------------------------
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>(
    milestones.find((m) => m.status === 'in_progress')?.id || milestones[1].id
  );

  const selectedMilestone = useMemo(() => {
    return milestones.find((m) => m.id === selectedMilestoneId) || milestones[0];
  }, [milestones, selectedMilestoneId]);

  // Form state for editing milestone
  const [milestoneStatus, setMilestoneStatus] = useState<'completed' | 'in_progress' | 'upcoming'>(
    selectedMilestone.status
  );
  const [milestonePercentage, setMilestonePercentage] = useState<number>(
    selectedMilestone.progressPercentage
  );
  const [milestonePlannedEndDate, setMilestonePlannedEndDate] = useState<string>(
    selectedMilestone.plannedEndDate
  );
  const [milestoneActualEndDate, setMilestoneActualEndDate] = useState<string>(
    selectedMilestone.actualEndDate || ''
  );
  const [milestoneValidationError, setMilestoneValidationError] = useState<string | null>(null);

  // Sync edit form whenever selected milestone changes
  const handleSelectMilestoneForEdit = (m: ConstructionMilestone) => {
    setSelectedMilestoneId(m.id);
    setMilestoneStatus(m.status);
    setMilestonePercentage(m.progressPercentage);
    setMilestonePlannedEndDate(m.plannedEndDate);
    setMilestoneActualEndDate(m.actualEndDate || '');
    setMilestoneValidationError(null);
  };

  // Preview projected overall progress if this milestone is saved
  const previewProjectedOverall = useMemo(() => {
    const totalBudget = project.constructionBudgetNgn || 330_000_000;
    const projectedEarned = milestones.reduce((sum, m) => {
      const pct = m.id === selectedMilestoneId ? milestonePercentage : m.progressPercentage;
      return sum + (pct / 100) * m.allocatedConstructionBudgetNgn;
    }, 0);
    return Math.round((projectedEarned / totalBudget) * 100);
  }, [milestones, selectedMilestoneId, milestonePercentage, project]);

  // Save Milestone Update with strict consistency validation
  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    setMilestoneValidationError(null);

    // Validate percentage range
    if (isNaN(milestonePercentage) || milestonePercentage < 0 || milestonePercentage > 100) {
      setMilestoneValidationError('Completion percentage must be a number between 0 and 100.');
      return;
    }

    // Validate status and percentage consistency
    if (milestoneStatus === 'completed' && milestonePercentage !== 100) {
      setMilestoneValidationError('A Completed milestone must have 100% completion percentage.');
      return;
    }
    if (milestoneStatus === 'upcoming' && milestonePercentage !== 0) {
      setMilestoneValidationError('An Upcoming milestone must have 0% completion percentage.');
      return;
    }
    if (milestoneStatus === 'in_progress' && (milestonePercentage <= 0 || milestonePercentage >= 100)) {
      setMilestoneValidationError('An In-Progress milestone must have a completion percentage between 1% and 99%.');
      return;
    }

    // Save update via AppContext
    updateMilestone(selectedMilestone.id, {
      status: milestoneStatus,
      progressPercentage: milestonePercentage,
      plannedEndDate: milestonePlannedEndDate,
      actualEndDate: milestoneStatus === 'completed' ? (milestoneActualEndDate || '28 Oct 2026') : undefined,
    });

    setStatusFeedback({
      message: `Stage 0${selectedMilestone.stepNumber} (${selectedMilestone.name}) updated successfully! Overall progress reconciled to ${previewProjectedOverall}%.`,
      type: 'success',
    });
    setTimeout(() => setStatusFeedback(null), 4500);
  };

  // --------------------------------------------------------------------------
  // 2. ADD CONSTRUCTION PROGRESS UPDATE STATE (Requirement 2)
  // --------------------------------------------------------------------------
  const [newUpdateDate, setNewUpdateDate] = useState<string>('28 Oct 2026');
  const [newUpdateMilestoneId, setNewUpdateMilestoneId] = useState<string>(
    milestones.find((m) => m.status === 'in_progress')?.id || milestones[1].id
  );
  const [newUpdateTitle, setNewUpdateTitle] = useState<string>('');
  const [newUpdateNarrative, setNewUpdateNarrative] = useState<string>('');
  const [newUpdateInspectionType, setNewUpdateInspectionType] = useState<
    | 'Reinforced Column & Blockwork Audit'
    | 'Soil & Raft Foundation Verification'
    | 'Roof Truss & Membrane Inspection'
    | 'Mechanical & Electrical Rough-In Inspection'
    | 'Finishing & Pre-Handover Snagging'
  >('Reinforced Column & Blockwork Audit');
  const [newUpdateQaStatus, setNewUpdateQaStatus] = useState<'Passed' | 'Action Item Resolved' | 'Under Observation'>('Passed');
  const [newUpdateEngineerName, setNewUpdateEngineerName] = useState<string>('Engr. Babatunde Fashina');
  const [newUpdateEngineerRole, setNewUpdateEngineerRole] = useState<string>('Lead Structural QA (COREN #31821 · Simulated)');
  const [newUpdateInspectionNotes, setNewUpdateInspectionNotes] = useState<string>('');
  
  // Photo reference options
  const [photoOption, setPhotoOption] = useState<'preset_site' | 'preset_decking' | 'preset_survey' | 'custom_file' | 'none'>('preset_site');
  const [customFileUrl, setCustomFileUrl] = useState<string>('');
  const [photoCaption, setPhotoCaption] = useState<string>('First-floor rebar alignment and suspended column inspection');
  const [photoGps, setPhotoGps] = useState<string>('9.0234° N, 7.5189° E · Guzape Hills, Abuja');
  const [photoTags, setPhotoTags] = useState<string>('Inspection, Superstructure, Rebar');

  const [updateValidationErrors, setUpdateValidationErrors] = useState<Record<string, string>>({});
  const [updateSuccessBanner, setUpdateSuccessBanner] = useState<boolean>(false);

  // Handle custom file upload preview
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomFileUrl(reader.result);
          setPhotoOption('custom_file');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save new progress update
  const handleAddProgressUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!newUpdateDate.trim()) errors.date = 'Update date is required.';
    if (!newUpdateTitle.trim() || newUpdateTitle.trim().length < 5) {
      errors.title = 'Title must be at least 5 characters long.';
    }
    if (!newUpdateNarrative.trim() || newUpdateNarrative.trim().length < 15) {
      errors.narrative = 'Description must provide at least 15 characters describing site observations.';
    }

    if (Object.keys(errors).length > 0) {
      setUpdateValidationErrors(errors);
      return;
    }
    setUpdateValidationErrors({});

    const milestoneObj = milestones.find((m) => m.id === newUpdateMilestoneId) || milestones[0];

    // Build photo references
    const photos: ProgressPhoto[] = [];
    let photoUrl = '';
    if (photoOption === 'preset_site') photoUrl = CONSTRUCTION_SITE_IMAGE;
    else if (photoOption === 'preset_decking') photoUrl = ABUJA_PROPERTY_IMAGE;
    else if (photoOption === 'preset_survey') photoUrl = HERO_IMAGE;
    else if (photoOption === 'custom_file' && customFileUrl) photoUrl = customFileUrl;

    if (photoUrl && photoOption !== 'none') {
      photos.push({
        id: `photo-${Date.now()}`,
        url: photoUrl,
        caption: photoCaption || `${milestoneObj.name} inspection preview`,
        timestamp: `${newUpdateDate}, 10:00 WAT`,
        tags: photoTags.split(',').map((t) => t.trim()).filter(Boolean),
        gpsLocation: photoGps,
      });
    }

    // Combine narrative with optional inspection notes
    let fullNarrative = newUpdateNarrative;
    if (newUpdateInspectionNotes.trim()) {
      fullNarrative += ` Inspection Notes: ${newUpdateInspectionNotes.trim()}`;
    }

    addProgressUpdate({
      projectId: project.id,
      milestoneId: milestoneObj.id,
      milestoneName: milestoneObj.name,
      updateDate: newUpdateDate,
      title: newUpdateTitle,
      narrative: fullNarrative,
      engineerName: newUpdateEngineerName,
      engineerRole: newUpdateEngineerRole,
      inspectionType: newUpdateInspectionType,
      photoReferences: photos,
      qaStatus: newUpdateQaStatus,
    });

    setUpdateSuccessBanner(true);
    setStatusFeedback({
      message: 'New site progress update logged successfully! It now appears on Screens 4 & 5.',
      type: 'success',
    });

    setNewUpdateTitle('');
    setNewUpdateNarrative('');
    setNewUpdateInspectionNotes('');
    setCustomFileUrl('');
  };

  // --------------------------------------------------------------------------
  // 3. SIMULATED PAYMENT MANAGEMENT STATE (Section 5 Requirement)
  // --------------------------------------------------------------------------
  const [newPayAmount, setNewPayAmount] = useState<string>('55000000');
  const [newPayDate, setNewPayDate] = useState<string>('28 Oct 2026');
  const [newPayCategory, setNewPayCategory] = useState<'land' | 'construction'>('construction');
  const [newPayMethod, setNewPayMethod] = useState<
    | 'UK Direct Bank Wire (GBP)'
    | 'US International Wire (USD)'
    | 'CBN Nostro FX Remittance'
    | 'Standard Chartered Escrow Transfer'
    | 'Zenith Bank Diaspora Direct Transfer'
  >('UK Direct Bank Wire (GBP)');
  const [newPayReference, setNewPayReference] = useState<string>('WPD-WIRE-2026-088');
  const [newPayStatus, setNewPayStatus] = useState<
    'confirmed_cleared' | 'processing_in_escrow' | 'pending_verification'
  >('confirmed_cleared');
  const [newPayMilestoneTitle, setNewPayMilestoneTitle] = useState<string>(
    'Tranche 4: Stage 03 Roofing & Structural Enclosure'
  );
  const [newPayOriginatingBank, setNewPayOriginatingBank] = useState<string>(
    'Barclays Bank UK PLC (London)'
  );
  const [newPayBeneficiaryAccount, setNewPayBeneficiaryAccount] = useState<string>(
    'Stanbic IBTC Diaspora Escrow NGN'
  );
  const [newPayNotes, setNewPayNotes] = useState<string>(
    'Simulated client milestone drawdown authorization for roofing timber and aluminum truss work.'
  );

  const [payValidationErrors, setPayValidationErrors] = useState<Record<string, string>>({});
  const [paySuccessBanner, setPaySuccessBanner] = useState<boolean>(false);

  // --------------------------------------------------------------------------
  // PAYMENT STATUS UPDATE MODAL STATE (Targeted Fix Requirement)
  // --------------------------------------------------------------------------
  const [selectedPaymentForStatusModal, setSelectedPaymentForStatusModal] = useState<PaymentRecord | null>(null);
  const [paymentNewStatus, setPaymentNewStatus] = useState<PaymentRecord['status']>('confirmed_cleared');
  const [paymentUpdateNote, setPaymentUpdateNote] = useState<string>('');

  const handleOpenUpdatePaymentModal = (record: PaymentRecord) => {
    setSelectedPaymentForStatusModal(record);
    setPaymentNewStatus(record.status);
    setPaymentUpdateNote(record.illustrativeNote || '');
  };

  const handleSavePaymentStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentForStatusModal) return;

    const validStatuses: PaymentRecord['status'][] = [
      'pending_verification',
      'processing_in_escrow',
      'confirmed_cleared',
    ];
    if (!validStatuses.includes(paymentNewStatus)) {
      return;
    }

    const prevStatus = selectedPaymentForStatusModal.status;
    updatePaymentRecord(selectedPaymentForStatusModal.id, {
      status: paymentNewStatus,
      illustrativeNote: paymentUpdateNote.trim() || selectedPaymentForStatusModal.illustrativeNote,
    });

    const statusLabels: Record<PaymentRecord['status'], string> = {
      confirmed_cleared: 'Confirmed & Cleared',
      processing_in_escrow: 'Processing in Escrow',
      pending_verification: 'Pending Bank Verification',
    };

    let financialEffect = '';
    if (prevStatus !== 'confirmed_cleared' && paymentNewStatus === 'confirmed_cleared') {
      financialEffect = ` Paid totals increased by +₦${selectedPaymentForStatusModal.amountNgn.toLocaleString('en-NG')}.`;
    } else if (prevStatus === 'confirmed_cleared' && paymentNewStatus !== 'confirmed_cleared') {
      financialEffect = ` Paid totals decreased by -₦${selectedPaymentForStatusModal.amountNgn.toLocaleString('en-NG')}.`;
    }

    setStatusFeedback({
      message: `Payment ${selectedPaymentForStatusModal.paymentReference} status updated from "${statusLabels[prevStatus]}" to "${statusLabels[paymentNewStatus]}".${financialEffect} Reconciled dynamically across Screens 4, 6 & 7.`,
      type: 'success',
    });

    setSelectedPaymentForStatusModal(null);
  };

  // Reconciled Payment Metrics for Staff Tab & Fiduciary Inspection
  const staffPaymentMetrics = useMemo(() => {
    const cleared = paymentRecords.filter((r) => r.status === 'confirmed_cleared');
    const clearedLand = cleared
      .filter((r) => r.category === 'land')
      .reduce((sum, r) => sum + r.amountNgn, 0);
    const clearedConstruction = cleared
      .filter((r) => r.category === 'construction')
      .reduce((sum, r) => sum + r.amountNgn, 0);
    const totalCleared = clearedLand + clearedConstruction;

    const unconfirmed = paymentRecords.filter((r) => r.status !== 'confirmed_cleared');
    const unconfirmedTotal = unconfirmed.reduce((sum, r) => sum + r.amountNgn, 0);

    return {
      clearedCount: cleared.length,
      clearedLand,
      clearedConstruction,
      totalCleared,
      unconfirmedCount: unconfirmed.length,
      unconfirmedTotal,
    };
  }, [paymentRecords]);

  // Load preset demo payments for fast testing
  const handleLoadPaymentPreset = (preset: 'tranche4' | 'tranche5' | 'landPerfection' | 'unconfirmedWire') => {
    setPayValidationErrors({});
    if (preset === 'tranche4') {
      setNewPayAmount('55000000');
      setNewPayCategory('construction');
      setNewPayMilestoneTitle('Tranche 4: Stage 03 Roofing & Structural Enclosure');
      setNewPayMethod('UK Direct Bank Wire (GBP)');
      setNewPayReference(`WPD-WIRE-2026-${Math.floor(100 + Math.random() * 900)}`);
      setNewPayStatus('confirmed_cleared');
      setNewPayOriginatingBank('Barclays Bank UK PLC (London)');
      setNewPayBeneficiaryAccount('Stanbic IBTC Diaspora Escrow NGN');
      setNewPayNotes('Milestone 3 certified by QA. ₦55M drawdown released from client escrow.');
    } else if (preset === 'tranche5') {
      setNewPayAmount('70000000');
      setNewPayCategory('construction');
      setNewPayMilestoneTitle('Tranche 5: Stage 04 Mechanical, Electrical & Finishes');
      setNewPayMethod('Standard Chartered Escrow Transfer');
      setNewPayReference(`WPD-WIRE-2026-${Math.floor(100 + Math.random() * 900)}`);
      setNewPayStatus('processing_in_escrow');
      setNewPayOriginatingBank('Standard Chartered Bank London (UK)');
      setNewPayBeneficiaryAccount('Stanbic IBTC Diaspora Escrow NGN');
      setNewPayNotes('Pre-deposit held in escrow awaiting stage 4 rough-in completion.');
    } else if (preset === 'landPerfection') {
      setNewPayAmount('15000000');
      setNewPayCategory('land');
      setNewPayMilestoneTitle('Land Perfection & Guzape Hill Top Title Supplemental');
      setNewPayMethod('Zenith Bank Diaspora Direct Transfer');
      setNewPayReference(`WPD-WIRE-2026-${Math.floor(100 + Math.random() * 900)}`);
      setNewPayStatus('confirmed_cleared');
      setNewPayOriginatingBank('Zenith Bank UK (Mayfair, London)');
      setNewPayBeneficiaryAccount('Zenith Bank Escrow NGN');
      setNewPayNotes('Supplemental statutory cadastral survey and AGIS registration clearance.');
    } else if (preset === 'unconfirmedWire') {
      setNewPayAmount('30000000');
      setNewPayCategory('construction');
      setNewPayMilestoneTitle('Diaspora Advance Construction Deposit (Unconfirmed)');
      setNewPayMethod('CBN Nostro FX Remittance');
      setNewPayReference(`WPD-WIRE-2026-${Math.floor(100 + Math.random() * 900)}`);
      setNewPayStatus('pending_verification');
      setNewPayOriginatingBank('JPMorgan Chase Bank (New York, US)');
      setNewPayBeneficiaryAccount('Stanbic IBTC Diaspora Escrow NGN');
      setNewPayNotes('Nostro foreign exchange wire received at intermediary, pending CBN reconciliation.');
    }
  };

  // Record simulated payment submit handler with strict validation
  const handleRecordPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    const cleanAmountStr = String(newPayAmount).replace(/,/g, '').trim();
    const parsedAmount = parseFloat(cleanAmountStr);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      errors.amount = 'Payment amount must be a valid number greater than zero (₦0).';
    }

    const trimmedRef = newPayReference.trim();
    if (!trimmedRef) {
      errors.reference = 'Payment reference is required.';
    } else {
      // Prevent accidental duplicate references
      const isDuplicate = paymentRecords.some(
        (p) => p.paymentReference.trim().toLowerCase() === trimmedRef.toLowerCase()
      );
      if (isDuplicate) {
        errors.reference = `Duplicate reference error: "${trimmedRef}" is already registered in the ledger. Please specify a unique reference.`;
      }
    }

    if (!newPayDate.trim()) {
      errors.date = 'Payment date is required.';
    }

    if (!newPayMilestoneTitle.trim()) {
      errors.milestoneTitle = 'Milestone or tranche description is required.';
    }

    if (Object.keys(errors).length > 0) {
      setPayValidationErrors(errors);
      return;
    }
    setPayValidationErrors({});

    // Approximate FX conversion for display
    const amountGbp = Math.round(parsedAmount / 2000);
    const amountUsd = Math.round(parsedAmount / 1550);
    const receiptNum = `RCP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    addPaymentRecord({
      paymentReference: trimmedRef,
      projectId: project.id,
      customerId: project.customerId || 'cust-diaspora-01',
      category: newPayCategory,
      milestoneTitle: newPayMilestoneTitle,
      amountNgn: parsedAmount,
      amountGbp,
      amountUsd,
      paymentDate: newPayDate,
      paymentMethod: newPayMethod,
      originatingBank: newPayOriginatingBank,
      beneficiaryAccount: newPayBeneficiaryAccount,
      channelReference: `FT${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      receiptNumber: receiptNum,
      status: newPayStatus,
      certifiedBy: 'Chief Financial Controller · Wellsprings Diaspora Escrow (Simulated)',
      illustrativeNote:
        newPayNotes.trim() || 'Simulated diaspora client transfer recorded through Staff Demo Interface.',
    });

    setPaySuccessBanner(true);
    setStatusFeedback({
      message: `Simulated payment of ₦${parsedAmount.toLocaleString('en-NG')} (${
        newPayStatus === 'confirmed_cleared'
          ? 'Confirmed & Cleared — Paid Total Updated'
          : newPayStatus === 'processing_in_escrow'
          ? 'Processing in Escrow — Ledger Logged'
          : 'Pending Verification — Unconfirmed'
      }) successfully recorded!`,
      type: 'success',
    });

    // Auto-advance to a fresh unique reference number for subsequent entries
    const nextRandomRefNum = Math.floor(100 + Math.random() * 900);
    setNewPayReference(`WPD-WIRE-2026-${nextRandomRefNum}`);
    setNewPayNotes('');
  };

  // --------------------------------------------------------------------------
  // PORTFOLIO FILTERING
  // --------------------------------------------------------------------------
  const [portfolioHealthFilter, setPortfolioHealthFilter] = useState<string>('All');
  const [portfolioSearchQuery, setPortfolioSearchQuery] = useState<string>('');

  const filteredProjects = STAFF_PROJECTS.filter((proj) => {
    const matchesHealth = portfolioHealthFilter === 'All' || proj.health === portfolioHealthFilter;
    const matchesQuery =
      proj.clientName.toLowerCase().includes(portfolioSearchQuery.toLowerCase()) ||
      proj.projectCode.toLowerCase().includes(portfolioSearchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(portfolioSearchQuery.toLowerCase());
    return matchesHealth && matchesQuery;
  });

  // --------------------------------------------------------------------------
  // ENQUIRY FILTERING & STATUS RESOLUTION
  // --------------------------------------------------------------------------
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enq) => {
      let matchesStatus = true;
      if (enquiryStatusFilter === 'new') {
        matchesStatus = enq.status === 'new';
      } else if (enquiryStatusFilter === 'contacted') {
        matchesStatus = enq.status === 'contacted';
      } else if (enquiryStatusFilter === 'qualified') {
        matchesStatus =
          enq.status === 'qualified' ||
          enq.status === 'consultation_scheduled' ||
          enq.status === 'dossier_sent';
      } else if (enquiryStatusFilter === 'closed') {
        matchesStatus = enq.status === 'closed';
      }

      const query = enquirySearchQuery.toLowerCase();
      const matchesQuery =
        !query ||
        enq.fullName.toLowerCase().includes(query) ||
        enq.email.toLowerCase().includes(query) ||
        enq.phone.toLowerCase().includes(query) ||
        enq.propertyTitle.toLowerCase().includes(query) ||
        enq.diasporaCountry.toLowerCase().includes(query) ||
        (enq.budgetRange && enq.budgetRange.toLowerCase().includes(query)) ||
        (enq.paymentPreference && enq.paymentPreference.toLowerCase().includes(query));

      return matchesStatus && matchesQuery;
    });
  }, [enquiries, enquiryStatusFilter, enquirySearchQuery]);

  const getStatusBadge = (status: PropertyEnquiry['status']) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
            New
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
            <Check className="w-3 h-3 text-blue-600" />
            Contacted
          </span>
        );
      case 'qualified':
      case 'consultation_scheduled':
      case 'dossier_sent':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Qualified
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-stone-700 bg-stone-200 px-2.5 py-0.5 rounded-full border border-stone-300">
            Closed
          </span>
        );
      default:
        return null;
    }
  };

  const getSelectableStatus = (status: PropertyEnquiry['status']): 'new' | 'contacted' | 'qualified' | 'closed' => {
    if (status === 'new') return 'new';
    if (status === 'contacted') return 'contacted';
    if (status === 'closed') return 'closed';
    return 'qualified';
  };

  const handleEnquiryStatusChange = (enquiryId: string, clientName: string, newStatus: 'new' | 'contacted' | 'qualified' | 'closed') => {
    updateEnquiryStatus(enquiryId, newStatus);
    setStatusFeedback({
      message: `Updated ${clientName} to "${newStatus.toUpperCase()}"`,
      type: 'success',
    });
    setTimeout(() => setStatusFeedback(null), 3500);
  };

  // --------------------------------------------------------------------------
  // OVERVIEW CALCULATIONS
  // --------------------------------------------------------------------------
  const overviewStats = useMemo(() => {
    const totalConstructionBudget = project.constructionBudgetNgn || 330_000_000;
    const totalEarnedNgn = milestones.reduce(
      (sum, m) => sum + (m.progressPercentage / 100) * m.allocatedConstructionBudgetNgn,
      0
    );
    const progressPercent = totalConstructionBudget > 0
      ? Math.round((totalEarnedNgn / totalConstructionBudget) * 100)
      : 0;

    const activeMilestone = milestones.find((m) => m.status === 'in_progress') || milestones[1];

    const counts = {
      new: enquiries.filter((e) => e.status === 'new').length,
      contacted: enquiries.filter((e) => e.status === 'contacted').length,
      qualified: enquiries.filter(
        (e) =>
          e.status === 'qualified' ||
          e.status === 'consultation_scheduled' ||
          e.status === 'dossier_sent'
      ).length,
      closed: enquiries.filter((e) => e.status === 'closed').length,
    };

    const latestUpdate = progressUpdates && progressUpdates.length > 0 ? progressUpdates[0] : null;

    const cleared = paymentRecords.filter((r) => r.status === 'confirmed_cleared');
    const totalCleared = cleared.reduce((sum, r) => sum + r.amountNgn, 0);

    return {
      progressPercent,
      activeMilestone,
      counts,
      latestUpdate,
      totalCleared,
      clearedCount: cleared.length,
    };
  }, [project, milestones, enquiries, progressUpdates, paymentRecords]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={7}
        screenName="Staff Project Management"
        roleScope="Simulated Staff Interface"
        description="The internal operational command console for Wellsprings project directors, resident site engineers, and diaspora relationship managers. Used to oversee site progress, track field audits, and triage inbound diaspora enquiries."
        currentFoundationFeatures={[
          'Milestone management: Select any milestone, update status/percentage/target date with 0-100% validation',
          'Add site progress updates: Date, milestone, description, notes, and safe demo photo references',
          'Instant cross-screen synchronization: Updates appear on Customer Dashboard (Screen 4) and Construction Progress (Screen 5)',
          `Inbound diaspora enquiry triage: Filter and update status for ${enquiries.length} leads in shared state`,
          'Consistent earned value construction calculations preserved across all screens'
        ]}
        subsequentPromptRoadmap={[
          'Contractor tender and work-order assignment portal with milestone retentions',
          'Automated WhatsApp/Email dispatch of bi-weekly drone logs to overseas clients',
          'Digital bill of quantities (BOQ) variation approval engine'
        ]}
        nextSuggestedScreen={{ id: 'home', label: '1. Public Home Page' }}
      />

      {/* Staff Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>Developer Internal Management Console</span>
            <span aria-hidden="true">·</span>
            <span>Wellsprings Operations Desk</span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Shared Demo State
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1 font-display">
            Staff Operations, Milestone Control & Site Updates
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time management interface for client enquiries, construction progress editing, and verified site updates.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200 text-xs sm:text-sm self-start md:self-auto max-w-full overflow-x-auto">
          <button
            onClick={() => setActiveStaffTab('enquiries')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeStaffTab === 'enquiries'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Enquiries ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveStaffTab('milestones')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeStaffTab === 'milestones'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            <Edit3 className="w-4 h-4 text-amber-400" />
            <span>Milestone Management</span>
          </button>

          <button
            onClick={() => setActiveStaffTab('add_update')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeStaffTab === 'add_update'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Log Site Update</span>
          </button>

          <button
            onClick={() => setActiveStaffTab('payments')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeStaffTab === 'payments'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Payment Records</span>
          </button>

          <button
            onClick={() => setActiveStaffTab('portfolio')}
            className={`px-3.5 py-2 rounded-lg font-semibold transition cursor-pointer flex items-center gap-2 ${
              activeStaffTab === 'portfolio'
                ? 'bg-neutral-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-400" />
            <span>Active Portfolio ({STAFF_PROJECTS.length})</span>
          </button>
        </div>
      </div>

      {/* Global Status Feedback Toast */}
      {statusFeedback && (
        <div
          className={`border px-4 py-3 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between shadow-xs animate-in fade-in duration-200 ${
            statusFeedback.type === 'success'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-amber-50 border-amber-300 text-amber-900'
          }`}
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{statusFeedback.message}</span>
          </div>
          <button
            onClick={() => setStatusFeedback(null)}
            className="p-1 hover:opacity-80 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* =========================================================================
          STAFF OVERVIEW (Requirement 1: Shared Application Data)
          ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Featured Project & Reconciled Construction Progress */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Featured Project Progress
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <HardHat className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {overviewStats.progressPercent}%
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Earned Value
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-900 mt-1 truncate">
              {project.title}
            </p>
            <p className="text-xs text-stone-500 truncate">
              {project.location}
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-600 font-medium truncate mr-1">
              {overviewStats.activeMilestone.name}: {overviewStats.activeMilestone.progressPercentage}%
            </span>
            <button
              onClick={() => setActiveStaffTab('milestones')}
              className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-0.5 cursor-pointer shrink-0"
            >
              <span>Edit</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 2: Total Enquiries & Status Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Total Inbound Enquiries
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {enquiries.length}
              </span>
              <span className="text-xs font-semibold text-stone-600">
                Diaspora Leads
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 mt-2 text-[11px] font-medium">
              <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                New: {overviewStats.counts.new}
              </span>
              <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                Contacted: {overviewStats.counts.contacted}
              </span>
              <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                Qualified: {overviewStats.counts.qualified}
              </span>
              <span className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded">
                Closed: {overviewStats.counts.closed}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Auto-synced from Screen 3</span>
            <button
              onClick={() => setActiveStaffTab('enquiries')}
              className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <span>View Table</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 3: Latest Construction Update */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Latest Site Update
            </span>
            <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div>
            {overviewStats.latestUpdate ? (
              <>
                <p className="text-xs font-mono text-stone-500 font-medium flex items-center gap-1">
                  <span>{overviewStats.latestUpdate.updateDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-emerald-700 font-bold">QA {overviewStats.latestUpdate.qaStatus}</span>
                </p>
                <p className="text-sm font-bold text-neutral-900 mt-1 line-clamp-2 leading-snug">
                  {overviewStats.latestUpdate.title}
                </p>
                <p className="text-xs text-stone-500 mt-0.5 truncate">
                  {overviewStats.latestUpdate.engineerName}
                </p>
              </>
            ) : (
              <p className="text-xs text-stone-500">No updates logged yet.</p>
            )}
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Stage: Blockwork Decking</span>
            <button
              onClick={() => setActiveStaffTab('add_update')}
              className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <span>+ Add Update</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Metric 4: Total Recorded Payments (Clearly Identified as Demo Records) */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Total Recorded Payments
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
              <Landmark className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {formatCurrency(overviewStats.totalCleared, currency)}
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              {overviewStats.clearedCount} Cleared Escrow Tranches
            </p>
            <div className="mt-1.5">
              <span className="bg-amber-100 text-amber-900 text-[11px] font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1 border border-amber-200">
                <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
                Illustrative Demo Records
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
            <span className="text-stone-500">Land + Stages 1 & 2</span>
            <button
              onClick={() => navigateTo('financial-overview')}
              className="text-amber-800 hover:text-amber-950 font-bold flex items-center gap-0.5 cursor-pointer"
            >
              <span>Screen 6</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: ENQUIRY MANAGEMENT
          ========================================================================= */}
      {activeStaffTab === 'enquiries' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-600" />
                  <span>Inbound Diaspora Investor Enquiries</span>
                </h2>
                <span className="text-xs bg-emerald-50 text-emerald-800 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {filteredEnquiries.length} Displayed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Submissions from Screen 3 appear here automatically. Staff can triage and change enquiry statuses directly below.
              </p>
            </div>

            {/* Search and Status Filters */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={enquirySearchQuery}
                  onChange={(e) => setEnquirySearchQuery(e.target.value)}
                  placeholder="Search name, country, budget..."
                  className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              {/* Status Segmented Filter */}
              <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs">
                {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => setEnquiryStatusFilter(statusKey)}
                    className={`px-2.5 py-1 rounded-md font-semibold capitalize transition cursor-pointer ${
                      enquiryStatusFilter === statusKey
                        ? 'bg-white text-neutral-900 shadow-2xs'
                        : 'text-stone-600 hover:text-neutral-900'
                    }`}
                  >
                    {statusKey === 'all' ? 'All' : statusKey}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EMPTY STATE HANDLING */}
          {enquiries.length === 0 ? (
            <div className="text-center py-16 px-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-xs">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-display">
                No Enquiries in System
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                There are currently no customer enquiries in the shared state. Test the public enquiry workflow by visiting any property page on Screen 3.
              </p>
              <button
                onClick={() => navigateTo('listings')}
                className="mt-3 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
              >
                <span>Browse Listings & Submit Test Enquiry</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-12 px-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <p className="text-sm font-bold text-neutral-900">No enquiries match your filter</p>
              <p className="text-xs text-stone-500">
                Try searching for a different keyword or reset the status filter.
              </p>
              <button
                onClick={() => {
                  setEnquirySearchQuery('');
                  setEnquiryStatusFilter('all');
                }}
                className="mt-2 text-xs font-semibold text-amber-800 hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            /* ENQUIRY TABLE & LIST */
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3 px-4">Customer & Contact</th>
                    <th className="py-3 px-4">Country & Location</th>
                    <th className="py-3 px-4">Preferred Property</th>
                    <th className="py-3 px-4">Budget & Preference</th>
                    <th className="py-3 px-4">Submitted Date</th>
                    <th className="py-3 px-4">Current Status</th>
                    <th className="py-3 px-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {filteredEnquiries.map((enq) => {
                    const selectableValue = getSelectableStatus(enq.status);

                    return (
                      <tr key={enq.id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="py-4 px-4">
                          <button
                            onClick={() => setSelectedEnquiryModal(enq)}
                            className="font-bold text-neutral-900 hover:text-amber-800 text-left transition block cursor-pointer"
                          >
                            {enq.fullName}
                          </button>
                          <div className="space-y-0.5 mt-1 text-xs text-stone-500">
                            <p className="flex items-center gap-1 font-mono text-stone-600">
                              <Mail className="w-3 h-3 text-stone-400 shrink-0" />
                              <span className="truncate max-w-[180px]">{enq.email}</span>
                            </p>
                            <p className="flex items-center gap-1 font-mono text-stone-600">
                              <Phone className="w-3 h-3 text-stone-400 shrink-0" />
                              <span>{enq.phone}</span>
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-stone-700">
                          <div className="flex items-center gap-1.5 font-medium text-neutral-900">
                            <Globe className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                            <span>{enq.diasporaCountry}</span>
                          </div>
                          {enq.diasporaCity && (
                            <p className="text-xs text-stone-500 mt-0.5 pl-5">
                              {enq.diasporaCity}
                            </p>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <button
                            onClick={() => navigateTo('property-detail', enq.propertyId)}
                            className="font-semibold text-neutral-800 hover:text-amber-800 transition flex items-center gap-1 cursor-pointer text-left leading-snug"
                            title="Inspect property in Screen 3"
                          >
                            <Building2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{enq.propertyTitle}</span>
                            <ExternalLink className="w-3 h-3 text-stone-400 shrink-0 opacity-60" />
                          </button>
                          <span className="text-xs text-stone-500 mt-1 block">
                            Type: {enq.interestType}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <span className="font-mono font-bold text-neutral-900 text-xs sm:text-sm bg-stone-100 px-2 py-0.5 rounded border border-stone-200 inline-block">
                              {enq.budgetRange || '£200k - £300k'}
                            </span>
                            <p className="text-xs text-stone-600">
                              {enq.paymentPreference || 'Milestone Escrow Tranches'}
                            </p>
                          </div>
                        </td>

                        <td className="py-4 px-4 text-stone-500 font-mono text-xs whitespace-nowrap">
                          {enq.submittedAt}
                        </td>

                        <td className="py-4 px-4 whitespace-nowrap">
                          {getStatusBadge(enq.status)}
                        </td>

                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <select
                              value={selectableValue}
                              onChange={(e) =>
                                handleEnquiryStatusChange(
                                  enq.id,
                                  enq.fullName,
                                  e.target.value as 'new' | 'contacted' | 'qualified' | 'closed'
                                )
                              }
                              className="px-2.5 py-1.5 text-xs font-semibold bg-stone-50 hover:bg-stone-100 border border-stone-300 rounded-lg text-neutral-900 focus:outline-hidden focus:border-amber-600 cursor-pointer transition shadow-2xs"
                              aria-label={`Change status for ${enq.fullName}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="qualified">Qualified</option>
                              <option value="closed">Closed</option>
                            </select>

                            <button
                              onClick={() => setSelectedEnquiryModal(enq)}
                              className="px-2.5 py-1.5 text-xs font-semibold text-stone-700 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg transition cursor-pointer shadow-2xs"
                              title="View full enquiry dossier"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: CONSTRUCTION MILESTONE MANAGEMENT (Requirement 1)
          ========================================================================= */}
      {activeStaffTab === 'milestones' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
                    <Edit3 className="w-5 h-5 text-amber-600" />
                    <span>Construction Milestone Management</span>
                  </h2>
                  <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Live Shared State
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Select a milestone below to update its status, completion percentage (0–100%), and target dates. Changes reconcile overall construction progress across Screen 4 & Screen 5.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('construction-progress')}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Customer View (Screen 5)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Step 1: Milestone Selector Cards */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                Select Milestone to Manage:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {milestones.map((m) => {
                  const isSelected = m.id === selectedMilestoneId;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectMilestoneForEdit(m)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        isSelected
                          ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-400/30 shadow-xs'
                          : 'bg-stone-50/60 border-stone-200 hover:border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-stone-500 uppercase">
                          Stage 0{m.stepNumber}
                        </span>
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded capitalize ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-stone-200 text-stone-600'
                          }`}
                        >
                          {m.status.replace('_', ' ')}
                        </span>
                      </div>

                      <h3 className="font-bold text-neutral-900 text-sm leading-snug">
                        {m.name}
                      </h3>

                      <div className="space-y-1 pt-1 border-t border-stone-200/60 text-xs">
                        <div className="flex justify-between">
                          <span className="text-stone-500">Progress:</span>
                          <span className="font-mono font-bold text-neutral-900">{m.progressPercentage}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              m.status === 'completed'
                                ? 'bg-emerald-600'
                                : m.status === 'in_progress'
                                ? 'bg-amber-500'
                                : 'bg-stone-300'
                            }`}
                            style={{ width: `${m.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Milestone Edit Form */}
            <form onSubmit={handleSaveMilestone} className="bg-stone-50 rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs font-mono">
                    0{selectedMilestone.stepNumber}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 font-display">
                      Editing: {selectedMilestone.name} — {selectedMilestone.title}
                    </h3>
                    <p className="text-xs text-stone-500">
                      Allocated Construction Budget: {formatCurrency(selectedMilestone.allocatedConstructionBudgetNgn, currency)}
                    </p>
                  </div>
                </div>

                {/* Projected Impact Pill */}
                <div className="bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-700">
                  <span>Projected Construction Progress: </span>
                  <strong className="text-amber-800 font-mono text-sm">{previewProjectedOverall}%</strong>
                </div>
              </div>

              {milestoneValidationError && (
                <div className="bg-red-50 border border-red-200 text-red-900 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{milestoneValidationError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Milestone Status */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Milestone Status
                  </label>
                  <select
                    value={milestoneStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as 'completed' | 'in_progress' | 'upcoming';
                      setMilestoneStatus(newStatus);
                      if (newStatus === 'completed') setMilestonePercentage(100);
                      else if (newStatus === 'upcoming') setMilestonePercentage(0);
                      else if (newStatus === 'in_progress' && (milestonePercentage === 0 || milestonePercentage === 100)) {
                        setMilestonePercentage(80);
                      }
                      setMilestoneValidationError(null);
                    }}
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-amber-600 cursor-pointer"
                  >
                    <option value="upcoming">Upcoming (0% - Pending Preceding Stage)</option>
                    <option value="in_progress">In Progress (Active Construction)</option>
                    <option value="completed">Completed (100% - Fully Certified)</option>
                  </select>
                  <p className="text-[11px] text-stone-500">
                    Setting status auto-aligns completion rules to prevent inconsistent data.
                  </p>
                </div>

                {/* 2. Completion Percentage with Slider & Number */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                      Completion Percentage
                    </label>
                    <span className="font-mono font-bold text-neutral-900 text-sm">
                      {milestonePercentage}%
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={milestonePercentage}
                      disabled={milestoneStatus === 'completed' || milestoneStatus === 'upcoming'}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMilestonePercentage(val);
                        setMilestoneValidationError(null);
                      }}
                      className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-600 disabled:opacity-50"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={milestonePercentage}
                      disabled={milestoneStatus === 'completed' || milestoneStatus === 'upcoming'}
                      onChange={(e) => {
                        const val = Math.max(0, Math.min(100, Number(e.target.value)));
                        setMilestonePercentage(val);
                        setMilestoneValidationError(null);
                      }}
                      className="w-20 px-2.5 py-1.5 bg-white border border-stone-300 rounded-lg font-mono text-xs sm:text-sm font-bold text-center text-neutral-900 disabled:bg-stone-100"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Validated strictly between 0% and 100%.
                  </p>
                </div>

                {/* 3. Target / Planned End Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Target Completion Date
                  </label>
                  <input
                    type="text"
                    value={milestonePlannedEndDate}
                    onChange={(e) => setMilestonePlannedEndDate(e.target.value)}
                    placeholder="e.g. 15 November 2026"
                    className="w-full px-3 py-2 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600"
                  />
                  {milestoneStatus === 'completed' && (
                    <div className="pt-1.5">
                      <label className="block text-[11px] font-semibold text-stone-600">
                        Actual Completion Date:
                      </label>
                      <input
                        type="text"
                        value={milestoneActualEndDate}
                        onChange={(e) => setMilestoneActualEndDate(e.target.value)}
                        placeholder="e.g. 18 August 2025"
                        className="w-full px-2.5 py-1 mt-1 bg-white border border-stone-300 rounded-lg text-xs font-mono text-neutral-900"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Saving recalculates overall construction progress and syncs instantly across Screens 4, 5, and 7.
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSelectMilestoneForEdit(selectedMilestone)}
                    className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-neutral-900 transition cursor-pointer"
                  >
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition flex items-center gap-2 cursor-pointer shadow-xs"
                  >
                    <Check className="w-4 h-4 text-amber-400" />
                    <span>Save Milestone Changes</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: ADD CONSTRUCTION PROGRESS UPDATES & PHOTOS (Requirement 2)
          ========================================================================= */}
      {activeStaffTab === 'add_update' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
                    <Plus className="w-5 h-5 text-emerald-600" />
                    <span>Log New Site Progress Update & Field Inspection</span>
                  </h2>
                  <span className="text-xs bg-emerald-100 text-emerald-900 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Live Broadcast to Screens 4 & 5
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Add dated inspection logs, narratives, and verified photo references. New entries appear instantly on the Customer Dashboard and Construction Progress timelines.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('customer-dashboard')}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Dashboard (Screen 4)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
                <button
                  onClick={() => navigateTo('construction-progress')}
                  className="px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <span>Timeline (Screen 5)</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Success Banner */}
            {updateSuccessBanner && (
              <div className="bg-emerald-50 border border-emerald-300 p-4 sm:p-5 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Field Inspection Successfully Published!</span>
                  </div>
                  <button
                    onClick={() => setUpdateSuccessBanner(false)}
                    className="text-emerald-700 hover:text-emerald-950 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-emerald-800">
                  Your update was appended to shared state and is now visible to the client on their central dashboard (Screen 4) and full engineering audit log (Screen 5).
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => navigateTo('customer-dashboard')}
                    className="text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <span>Inspect on Customer Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => navigateTo('construction-progress')}
                    className="text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 px-3 py-1.5 rounded-lg transition cursor-pointer flex items-center gap-1"
                  >
                    <span>View in Construction Progress</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Progress Update Form */}
            <form onSubmit={handleAddProgressUpdateSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* 1. Date */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Inspection Date <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={newUpdateDate}
                      onChange={(e) => setNewUpdateDate(e.target.value)}
                      placeholder="e.g. 28 Oct 2026"
                      className={`w-full pl-9 pr-3 py-2 bg-stone-50 border rounded-xl text-xs sm:text-sm font-medium focus:outline-hidden focus:border-amber-600 ${
                        updateValidationErrors.date ? 'border-red-500' : 'border-stone-200'
                      }`}
                    />
                  </div>
                  {updateValidationErrors.date && (
                    <p className="text-[11px] text-red-600">{updateValidationErrors.date}</p>
                  )}
                </div>

                {/* 2. Related Milestone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    Related Milestone Stage <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newUpdateMilestoneId}
                    onChange={(e) => setNewUpdateMilestoneId(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-amber-600 cursor-pointer"
                  >
                    {milestones.map((m) => (
                      <option key={m.id} value={m.id}>
                        Stage 0{m.stepNumber}: {m.name} ({m.progressPercentage}% complete)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. QA Status & Inspection Type */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                    QA Verification Status
                  </label>
                  <select
                    value={newUpdateQaStatus}
                    onChange={(e) => setNewUpdateQaStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-amber-600 cursor-pointer"
                  >
                    <option value="Passed">Passed (Compliant with Structural Spec)</option>
                    <option value="Action Item Resolved">Action Item Resolved</option>
                    <option value="Under Observation">Under Observation (Curing Stage)</option>
                  </select>
                </div>
              </div>

              {/* Title / Headline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Inspection Headline / Update Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newUpdateTitle}
                  onChange={(e) => setNewUpdateTitle(e.target.value)}
                  placeholder="e.g. First-Floor Cantilever Deck Rebar Alignment & Shuttering Sign-Off"
                  className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs sm:text-sm font-bold text-neutral-900 focus:outline-hidden focus:border-amber-600 ${
                    updateValidationErrors.title ? 'border-red-500' : 'border-stone-200'
                  }`}
                />
                {updateValidationErrors.title && (
                  <p className="text-[11px] text-red-600">{updateValidationErrors.title}</p>
                )}
              </div>

              {/* Description / Narrative */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Detailed Engineering Narrative & Progress Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newUpdateNarrative}
                  onChange={(e) => setNewUpdateNarrative(e.target.value)}
                  placeholder="Describe observations, column alignment tolerances, concrete slump test results, or scheduled pour staging..."
                  className={`w-full px-3.5 py-2.5 bg-stone-50 border rounded-xl text-xs sm:text-sm leading-relaxed text-neutral-900 focus:outline-hidden focus:border-amber-600 resize-none ${
                    updateValidationErrors.narrative ? 'border-red-500' : 'border-stone-200'
                  }`}
                />
                {updateValidationErrors.narrative && (
                  <p className="text-[11px] text-red-600">{updateValidationErrors.narrative}</p>
                )}
              </div>

              {/* Optional Inspection Notes & Inspector Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-stone-50 rounded-xl border border-stone-200">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Lead Structural Inspector
                  </label>
                  <input
                    type="text"
                    value={newUpdateEngineerName}
                    onChange={(e) => setNewUpdateEngineerName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs font-semibold text-neutral-900"
                  />
                  <input
                    type="text"
                    value={newUpdateEngineerRole}
                    onChange={(e) => setNewUpdateEngineerRole(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-[11px] text-stone-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-stone-700">
                    Optional Field Notes (Cube crush, slump test, or lab certs)
                  </label>
                  <textarea
                    rows={3}
                    value={newUpdateInspectionNotes}
                    onChange={(e) => setNewUpdateInspectionNotes(e.target.value)}
                    placeholder="e.g. Slump test verified at 75mm tolerance. Ready for continuous pour."
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs leading-relaxed resize-none"
                  />
                </div>
              </div>

              {/* Safe Demo-Photo Reference & Optional Upload (Requirement 2) */}
              <div className="space-y-3 p-4 sm:p-5 bg-stone-50 rounded-xl border border-stone-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                  <div>
                    <span className="text-xs font-bold text-stone-800 uppercase tracking-wider block">
                      Site Verification Photo Reference
                    </span>
                    <p className="text-xs text-stone-500">
                      Choose a preset illustrative demonstration photo reference or upload an image file from your device.
                    </p>
                  </div>
                  <span className="bg-amber-100 text-amber-900 text-[11px] font-semibold px-2 py-0.5 rounded-full border border-amber-200 self-start sm:self-auto">
                    Illustrative Demo Photo Reference
                  </span>
                </div>

                {/* Photo Source Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setPhotoOption('preset_site')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      photoOption === 'preset_site'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-500/20'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="aspect-16/9 rounded bg-neutral-900 overflow-hidden mb-2 relative">
                      <img src={CONSTRUCTION_SITE_IMAGE} alt="Preset site" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-xs text-neutral-900">Demo Photo #1</p>
                    <p className="text-[10px] text-stone-500">Column & Rebar Alignment</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhotoOption('preset_decking')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      photoOption === 'preset_decking'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-500/20'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="aspect-16/9 rounded bg-neutral-900 overflow-hidden mb-2 relative">
                      <img src={ABUJA_PROPERTY_IMAGE} alt="Preset decking" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-xs text-neutral-900">Demo Photo #2</p>
                    <p className="text-[10px] text-stone-500">Elevation & Decking Formwork</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPhotoOption('preset_survey')}
                    className={`p-3 rounded-lg border text-left cursor-pointer transition ${
                      photoOption === 'preset_survey'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-500/20'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="aspect-16/9 rounded bg-neutral-900 overflow-hidden mb-2 relative">
                      <img src={HERO_IMAGE} alt="Preset survey" className="w-full h-full object-cover" />
                    </div>
                    <p className="font-bold text-xs text-neutral-900">Demo Photo #3</p>
                    <p className="text-[10px] text-stone-500">Topographical Charter</p>
                  </button>

                  {/* Upload File Option */}
                  <div
                    className={`p-3 rounded-lg border text-left transition flex flex-col justify-between ${
                      photoOption === 'custom_file'
                        ? 'bg-white border-amber-600 ring-2 ring-amber-500/20'
                        : 'bg-white border-stone-200'
                    }`}
                  >
                    <div>
                      {customFileUrl ? (
                        <div className="aspect-16/9 rounded bg-neutral-900 overflow-hidden mb-2 relative">
                          <img src={customFileUrl} alt="Uploaded preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="aspect-16/9 rounded bg-stone-100 flex items-center justify-center mb-2 border border-dashed border-stone-300">
                          <Upload className="w-5 h-5 text-stone-400" />
                        </div>
                      )}
                      <p className="font-bold text-xs text-neutral-900">Upload Photo File</p>
                      <p className="text-[10px] text-stone-500">PNG, JPG from device</p>
                    </div>

                    <label className="mt-2 text-center text-xs font-semibold py-1.5 px-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded cursor-pointer block">
                      <span>{customFileUrl ? 'Replace Photo' : 'Select File'}</span>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>
                </div>

                {photoOption !== 'none' && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600">Photo Caption</label>
                      <input
                        type="text"
                        value={photoCaption}
                        onChange={(e) => setPhotoCaption(e.target.value)}
                        placeholder="Caption for lightbox view..."
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600">Geotagged Coordinates</label>
                      <input
                        type="text"
                        value={photoGps}
                        onChange={(e) => setPhotoGps(e.target.value)}
                        placeholder="GPS coordinates..."
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-600">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={photoTags}
                        onChange={(e) => setPhotoTags(e.target.value)}
                        placeholder="Rebar, Superstructure, Pour"
                        className="w-full px-2.5 py-1.5 bg-white border border-stone-200 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-stone-500 italic">
                  * All published logs are saved to shared demonstration state and immediately persist in browser storage.
                </span>

                <button
                  type="submit"
                  className="px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Publish Field Inspection Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: RECORD SIMULATED DEMO PAYMENTS & ESCROW LEDGER (Section 5 Requirement)
          ========================================================================= */}
      {activeStaffTab === 'payments' && (
        <div className="space-y-6">
          {/* Section 5 KPI Metric Bar: Dynamic Totals from Shared Data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider block">
                Total Cleared to Date
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-mono">
                  ₦{staffPaymentMetrics.totalCleared.toLocaleString('en-NG')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {staffPaymentMetrics.clearedCount} Confirmed & Cleared Tranches
              </p>
              <div className="mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">
                Counts Toward Screen 4 & 6 Totals
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider block">
                Land Acquisition (Cleared)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-purple-900 font-mono">
                  ₦{staffPaymentMetrics.clearedLand.toLocaleString('en-NG')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                100% of ₦{(project.landBudgetNgn || 120_000_000).toLocaleString('en-NG')} Budget
              </p>
              <div className="mt-2 text-[11px] font-semibold text-purple-800 bg-purple-50 px-2 py-0.5 rounded border border-purple-200 inline-block">
                Title Perfected (Demo)
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider block">
                Construction Escrow (Cleared)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-blue-900 font-mono">
                  ₦{staffPaymentMetrics.clearedConstruction.toLocaleString('en-NG')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                Remaining: ₦{Math.max(0, (project.constructionBudgetNgn || 330_000_000) - staffPaymentMetrics.clearedConstruction).toLocaleString('en-NG')}
              </p>
              <div className="mt-2 text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                Stage Certified Releases
              </div>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
              <span className="text-xs font-medium text-stone-500 uppercase tracking-wider block">
                Unconfirmed / In Escrow
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-extrabold text-amber-900 font-mono">
                  ₦{staffPaymentMetrics.unconfirmedTotal.toLocaleString('en-NG')}
                </span>
              </div>
              <p className="text-xs text-stone-400 mt-1">
                {staffPaymentMetrics.unconfirmedCount} Pending Transactions
              </p>
              <div className="mt-2 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block">
                Excluded from Paid Totals
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {paySuccessBanner && (
            <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Simulated Payment Recorded Successfully!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">
                    Saved to shared application state. Verified on Customer Dashboard (Screen 4) and Financial Overview (Screen 6).
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => navigateTo('customer-dashboard')}
                  className="px-3 py-1.5 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 transition cursor-pointer"
                >
                  Verify Screen 4
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('financial-overview')}
                  className="px-3 py-1.5 text-xs font-bold text-emerald-950 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 transition cursor-pointer"
                >
                  Verify Screen 6
                </button>
                <button
                  type="button"
                  onClick={() => setPaySuccessBanner(false)}
                  className="p-1 text-emerald-600 hover:text-emerald-900 cursor-pointer ml-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Form Card: Record Simulated Demo Payment */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-600" />
                    <span>Record Simulated Demo Payment</span>
                  </h2>
                  <span className="text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
                    Illustrative Demo Entry
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Log simulated client bank remittances or escrow drawdowns into the shared project ledger.
                </p>
              </div>

              {/* Preset Quick Fill Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
                <span className="text-xs font-medium text-stone-500 mr-1">Demo Presets:</span>
                <button
                  type="button"
                  onClick={() => handleLoadPaymentPreset('tranche4')}
                  className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg border border-stone-200 transition cursor-pointer"
                >
                  Tranche 4 (Roofing · ₦55M)
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPaymentPreset('tranche5')}
                  className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg border border-stone-200 transition cursor-pointer"
                >
                  Tranche 5 (In Escrow · ₦70M)
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPaymentPreset('unconfirmedWire')}
                  className="px-2.5 py-1 text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg border border-stone-200 transition cursor-pointer"
                >
                  Unconfirmed Wire (₦30M)
                </button>
              </div>
            </div>

            {/* Fiduciary Rule Advisory */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-bold text-amber-900 block">
                  Strict Fiduciary Rule for Demonstration Totals:
                </strong>
                <p className="text-xs leading-relaxed text-amber-800">
                  Only payments marked with status <strong className="font-semibold underline">Confirmed & Cleared</strong> increment the paid total (₦292.5M+) and reduce outstanding balances on Screen 4 and Screen 6. Payments marked <strong className="font-semibold">Processing in Escrow</strong> or <strong className="font-semibold">Pending Verification</strong> are recorded in the ledger for transparency, but will strictly <em>not</em> count toward paid totals until cleared. This is a simulated demo record; no live money is moved.
                </p>
              </div>
            </div>

            {/* The Payment Form */}
            <form onSubmit={handleRecordPaymentSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* 1. Amount in NGN */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Amount in NGN (₦) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-stone-400">
                      ₦
                    </span>
                    <input
                      type="text"
                      value={newPayAmount}
                      onChange={(e) => setNewPayAmount(e.target.value)}
                      placeholder="e.g. 55000000"
                      className={`w-full pl-8 pr-3 py-2 bg-stone-50 border rounded-xl text-xs sm:text-sm font-mono font-bold text-neutral-900 focus:outline-hidden focus:bg-white transition ${
                        payValidationErrors.amount ? 'border-red-400 bg-red-50/30' : 'border-stone-200 focus:border-amber-600'
                      }`}
                    />
                  </div>
                  {/* Dynamic Currency Preview */}
                  <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 pt-0.5">
                    <span>
                      Approx: ~£{Math.round((parseFloat(newPayAmount.replace(/,/g, '')) || 0) / 2000).toLocaleString('en-GB')} GBP · ~${Math.round((parseFloat(newPayAmount.replace(/,/g, '')) || 0) / 1550).toLocaleString('en-US')} USD
                    </span>
                  </div>
                  {payValidationErrors.amount && (
                    <p className="text-[11px] text-red-600 font-semibold">{payValidationErrors.amount}</p>
                  )}
                </div>

                {/* 2. Payment Date */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Payment Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPayDate}
                    onChange={(e) => setNewPayDate(e.target.value)}
                    placeholder="e.g. 28 Oct 2026"
                    className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:bg-white transition ${
                      payValidationErrors.date ? 'border-red-400' : 'border-stone-200 focus:border-amber-600'
                    }`}
                  />
                  {payValidationErrors.date && (
                    <p className="text-[11px] text-red-600 font-semibold">{payValidationErrors.date}</p>
                  )}
                </div>

                {/* 3. Category: Land or Construction */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Budget Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPayCategory}
                    onChange={(e) => setNewPayCategory(e.target.value as 'land' | 'construction')}
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white cursor-pointer"
                  >
                    <option value="construction">Construction Escrow (Milestone Drawdown)</option>
                    <option value="land">Land Acquisition & Title Perfection</option>
                  </select>
                </div>

                {/* 4. Payment Reference */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Payment Reference <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPayReference}
                    onChange={(e) => setNewPayReference(e.target.value)}
                    placeholder="e.g. WPD-WIRE-2026-088"
                    className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs sm:text-sm font-mono text-neutral-900 focus:outline-hidden focus:bg-white transition ${
                      payValidationErrors.reference ? 'border-red-400 bg-red-50/20' : 'border-stone-200 focus:border-amber-600'
                    }`}
                  />
                  {payValidationErrors.reference && (
                    <p className="text-[11px] text-red-600 font-semibold">{payValidationErrors.reference}</p>
                  )}
                </div>

                {/* 5. Payment Method */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Payment Method & Banking Route <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPayMethod}
                    onChange={(e) =>
                      setNewPayMethod(
                        e.target.value as
                          | 'UK Direct Bank Wire (GBP)'
                          | 'US International Wire (USD)'
                          | 'CBN Nostro FX Remittance'
                          | 'Standard Chartered Escrow Transfer'
                          | 'Zenith Bank Diaspora Direct Transfer'
                      )
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white cursor-pointer"
                  >
                    <option value="UK Direct Bank Wire (GBP)">UK Direct Bank Wire (GBP)</option>
                    <option value="US International Wire (USD)">US International Wire (USD)</option>
                    <option value="Standard Chartered Escrow Transfer">Standard Chartered Escrow Transfer</option>
                    <option value="CBN Nostro FX Remittance">CBN Nostro FX Remittance</option>
                    <option value="Zenith Bank Diaspora Direct Transfer">Zenith Bank Diaspora Direct Transfer</option>
                  </select>
                </div>

                {/* 6. Verification / Escrow Status */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Verification / Escrow Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newPayStatus}
                    onChange={(e) =>
                      setNewPayStatus(
                        e.target.value as 'confirmed_cleared' | 'processing_in_escrow' | 'pending_verification'
                      )
                    }
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm font-semibold text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white cursor-pointer"
                  >
                    <option value="confirmed_cleared">
                      ✓ Confirmed & Cleared (Increments Paid Total)
                    </option>
                    <option value="processing_in_escrow">
                      ⏳ Processing in Escrow (Held; NOT yet counted as paid)
                    </option>
                    <option value="pending_verification">
                      ⚠ Pending Bank Verification (Unconfirmed deposit)
                    </option>
                  </select>
                </div>

                {/* 7. Milestone or Tranche Description */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Milestone / Tranche Description <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newPayMilestoneTitle}
                    onChange={(e) => setNewPayMilestoneTitle(e.target.value)}
                    placeholder="e.g. Tranche 4: Stage 03 Roofing & Structural Enclosure"
                    className={`w-full px-3 py-2 bg-stone-50 border rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:bg-white transition ${
                      payValidationErrors.milestoneTitle ? 'border-red-400' : 'border-stone-200 focus:border-amber-600'
                    }`}
                  />
                  {payValidationErrors.milestoneTitle && (
                    <p className="text-[11px] text-red-600 font-semibold">{payValidationErrors.milestoneTitle}</p>
                  )}
                </div>

                {/* 8. Originating Bank */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Originating Overseas Bank
                  </label>
                  <input
                    type="text"
                    value={newPayOriginatingBank}
                    onChange={(e) => setNewPayOriginatingBank(e.target.value)}
                    placeholder="e.g. Barclays Bank UK PLC"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                  />
                </div>

                {/* 9. Beneficiary Account */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Beneficiary Escrow Account
                  </label>
                  <input
                    type="text"
                    value={newPayBeneficiaryAccount}
                    onChange={(e) => setNewPayBeneficiaryAccount(e.target.value)}
                    placeholder="e.g. Stanbic IBTC Diaspora Escrow NGN"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                  />
                </div>

                {/* 10. Illustrative Staff Notes */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-neutral-800">
                    Illustrative Notes & Fiduciary Audit Reference
                  </label>
                  <input
                    type="text"
                    value={newPayNotes}
                    onChange={(e) => setNewPayNotes(e.target.value)}
                    placeholder="Staff inspection and sign-off rationale..."
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                  />
                </div>
              </div>

              {/* Form Action Controls */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-stone-100">
                <span className="text-xs text-stone-500 italic">
                  * Changes are saved into shared AppContext and persist via localStorage across page refreshes.
                </span>

                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Record Simulated Payment</span>
                </button>
              </div>
            </form>
          </div>

          {/* Table Card: Complete Payment Audit Ledger */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-display flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-stone-600" />
                  <span>Simulated Escrow & Wire Settlement Ledger ({paymentRecords.length} Records)</span>
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Full chronological log of simulated bank disbursements and stage payments.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigateTo('financial-overview')}
                className="px-3.5 py-1.5 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <span>View Financial Overview (Screen 6)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs">
                  <tr>
                    <th className="py-3 px-4">Receipt & Ref</th>
                    <th className="py-3 px-4">Milestone Covered</th>
                    <th className="py-3 px-4">Method & Banking Route</th>
                    <th className="py-3 px-4 text-right">Amount (NGN)</th>
                    <th className="py-3 px-4">Cleared Date</th>
                    <th className="py-3 px-4">Escrow Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {paymentRecords.map((p) => (
                    <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                      <td className="py-4 px-4">
                        <p className="font-mono font-bold text-neutral-900">{p.receiptNumber}</p>
                        <p className="text-xs text-stone-400 font-mono">{p.paymentReference}</p>
                      </td>

                      <td className="py-4 px-4">
                        <p className="font-semibold text-neutral-900">{p.milestoneTitle}</p>
                        <span
                          className={`text-xs uppercase font-mono font-semibold px-2 py-0.5 rounded ${
                            p.category === 'land'
                              ? 'text-purple-900 bg-purple-50'
                              : 'text-blue-900 bg-blue-50'
                          }`}
                        >
                          {p.category}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-stone-600">
                        <p className="font-medium text-neutral-900">{p.paymentMethod}</p>
                        <p className="text-xs text-stone-400 font-mono">
                          {p.originatingBank} → {p.beneficiaryAccount}
                        </p>
                      </td>

                      <td className="py-4 px-4 text-right font-mono font-bold text-neutral-900">
                        ₦{p.amountNgn.toLocaleString('en-NG')}
                      </td>

                      <td className="py-4 px-4 text-stone-500 font-mono text-xs whitespace-nowrap">
                        {p.paymentDate}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        {p.status === 'confirmed_cleared' && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Cleared (Demo)
                          </span>
                        )}
                        {p.status === 'processing_in_escrow' && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                            Processing in Escrow
                          </span>
                        )}
                        {p.status === 'pending_verification' && (
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Pending Verification
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleOpenUpdatePaymentModal(p)}
                          className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-stone-100 hover:bg-stone-200 border border-stone-200 hover:border-stone-300 rounded-lg transition inline-flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-amber-700" />
                          <span>Update Status</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: ACTIVE PORTFOLIO OVERVIEW (14 Sites)
          ========================================================================= */}
      {activeStaffTab === 'portfolio' && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 font-display">
                Concurrent Active Portfolio (14 Sites)
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                All client developments across Abuja and Lagos under Wellsprings management.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={portfolioSearchQuery}
                  onChange={(e) => setPortfolioSearchQuery(e.target.value)}
                  placeholder="Search project or client..."
                  className="w-full sm:w-56 pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-hidden focus:border-amber-600"
                />
              </div>

              <select
                value={portfolioHealthFilter}
                onChange={(e) => setPortfolioHealthFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-hidden focus:border-amber-600 cursor-pointer"
              >
                <option value="All">All Health Statuses</option>
                <option value="On Track">On Track</option>
                <option value="Ahead of Schedule">Ahead of Schedule</option>
                <option value="Attention Required">Attention Required</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4">Code & Client</th>
                  <th className="py-3 px-4">Development & Location</th>
                  <th className="py-3 px-4">Active Stage & Progress</th>
                  <th className="py-3 px-4">Health Status</th>
                  <th className="py-3 px-4">Assigned Engineer</th>
                  <th className="py-3 px-4 text-right">Quick Navigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-4 px-4">
                      <p className="font-mono text-stone-400 text-xs font-semibold">{p.projectCode}</p>
                      <p className="font-bold text-neutral-900 mt-0.5">{p.clientName}</p>
                      <p className="text-xs text-stone-500">{p.diasporaCity}</p>
                    </td>

                    <td className="py-4 px-4">
                      <p className="font-semibold text-neutral-800">{p.projectTitle}</p>
                      <p className="text-xs text-stone-500">{p.location}</p>
                    </td>

                    <td className="py-4 px-4">
                      <p className="text-stone-700 font-medium text-xs">{p.stage}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="h-1.5 w-24 bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${p.progressPercent}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-bold text-stone-600 tabular-nums">
                          {p.progressPercent}%
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 whitespace-nowrap">
                      {p.health === 'On Track' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          On Track
                        </span>
                      )}
                      {p.health === 'Ahead of Schedule' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                          Ahead of Schedule
                        </span>
                      )}
                      {p.health === 'Attention Required' && (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Attention Required
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4 text-stone-600">
                      <p className="font-medium text-neutral-900">{p.assignedEngineer}</p>
                      <p className="text-xs text-stone-400">Last: {p.lastUpdateDate}</p>
                    </td>

                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigateTo('customer-dashboard')}
                          className="px-2.5 py-1 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition cursor-pointer"
                        >
                          Client View
                        </button>
                        <button
                          onClick={() => navigateTo('construction-progress')}
                          className="px-2.5 py-1 text-xs font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          <span>Audit</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: ENQUIRY DOSSIER & STAFF DETAILS
          ========================================================================= */}
      {selectedEnquiryModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedEnquiryModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 bg-stone-50">
              <div className="space-y-0.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Diaspora Lead Dossier · ID: {selectedEnquiryModal.id}
                </span>
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  {selectedEnquiryModal.fullName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiryModal(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-neutral-900 hover:bg-stone-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-4 overflow-y-auto text-xs sm:text-sm">
              <div className="flex items-center justify-between bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                <span className="font-semibold text-stone-700">Lead Status:</span>
                <div className="flex items-center gap-2">
                  <select
                    value={getSelectableStatus(selectedEnquiryModal.status)}
                    onChange={(e) => {
                      const newStatus = e.target.value as 'new' | 'contacted' | 'qualified' | 'closed';
                      handleEnquiryStatusChange(selectedEnquiryModal.id, selectedEnquiryModal.fullName, newStatus);
                      setSelectedEnquiryModal({
                        ...selectedEnquiryModal,
                        status: newStatus,
                      });
                    }}
                    className="px-3 py-1.5 text-xs font-semibold bg-white border border-stone-300 rounded-lg text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <span className="text-xs text-stone-500 font-medium block">Email Address</span>
                  <a
                    href={`mailto:${selectedEnquiryModal.email}`}
                    className="font-bold text-amber-800 hover:underline break-all"
                  >
                    {selectedEnquiryModal.email}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-medium block">WhatsApp / Phone</span>
                  <a
                    href={`tel:${selectedEnquiryModal.phone}`}
                    className="font-bold text-neutral-900 hover:underline"
                  >
                    {selectedEnquiryModal.phone}
                  </a>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-medium block">Country of Residence</span>
                  <p className="font-semibold text-neutral-900">
                    {selectedEnquiryModal.diasporaCountry} {selectedEnquiryModal.diasporaCity ? `(${selectedEnquiryModal.diasporaCity})` : ''}
                  </p>
                </div>
                <div>
                  <span className="text-xs text-stone-500 font-medium block">Submission Date</span>
                  <p className="font-mono text-stone-700 font-semibold">{selectedEnquiryModal.submittedAt}</p>
                </div>
              </div>

              <div className="space-y-2 p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
                  Property & Investment Parameters
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-stone-500">Preferred Property:</span>
                    <p className="font-bold text-neutral-900">{selectedEnquiryModal.propertyTitle}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Interest Type:</span>
                    <p className="font-bold text-neutral-900">{selectedEnquiryModal.interestType}</p>
                  </div>
                  <div>
                    <span className="text-stone-500">Target Budget Range:</span>
                    <p className="font-mono font-bold text-amber-900">
                      {selectedEnquiryModal.budgetRange || '£200k - £300k'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500">Payment Preference:</span>
                    <p className="font-medium text-neutral-900">
                      {selectedEnquiryModal.paymentPreference || 'Milestone Escrow Tranches'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-stone-700 block">Prospect's Message</span>
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-stone-800 leading-relaxed italic text-xs sm:text-sm">
                  "{selectedEnquiryModal.message}"
                </div>
              </div>

              {selectedEnquiryModal.notes && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-700 block">Staff Internal Notes</span>
                  <p className="text-xs text-stone-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200">
                    {selectedEnquiryModal.notes}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
              <button
                onClick={() => {
                  navigateTo('property-detail', selectedEnquiryModal.propertyId);
                  setSelectedEnquiryModal(null);
                }}
                className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
              >
                <span>View Property on Public Site (Screen 3)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setSelectedEnquiryModal(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: UPDATE PAYMENT STATUS & ESCROW CLEARANCE (Targeted Fix)
          ========================================================================= */}
      {selectedPaymentForStatusModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedPaymentForStatusModal(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-stone-200 bg-stone-50">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    Payment Status Management
                  </span>
                  <span className="text-[10px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-200">
                    Simulated Demo Record
                  </span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 font-display">
                  {selectedPaymentForStatusModal.paymentReference}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPaymentForStatusModal(null)}
                className="p-1.5 rounded-lg text-stone-500 hover:text-neutral-900 hover:bg-stone-200 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePaymentStatusUpdate} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-xs sm:text-sm">
              {/* Payment Details Card (Preserved & Non-editable to prevent duplicates/tampering) */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 space-y-2.5">
                <div className="flex items-center justify-between text-xs border-b border-stone-200/80 pb-2">
                  <span className="text-stone-500">Receipt Number</span>
                  <span className="font-mono font-bold text-neutral-900">{selectedPaymentForStatusModal.receiptNumber}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Amount (NGN)</span>
                    <span className="font-mono font-extrabold text-neutral-900 text-sm">
                      ₦{selectedPaymentForStatusModal.amountNgn.toLocaleString('en-NG')}
                    </span>
                    <span className="text-[11px] text-stone-500 block">
                      ~£{(selectedPaymentForStatusModal.amountGbp || Math.round(selectedPaymentForStatusModal.amountNgn / 2000)).toLocaleString('en-GB')} GBP
                    </span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Budget Category</span>
                    <span className="font-bold text-neutral-900 capitalize block">
                      {selectedPaymentForStatusModal.category === 'land' ? 'Land Acquisition' : 'Construction Escrow'}
                    </span>
                    <span className="text-[11px] text-stone-500 font-mono">
                      Recorded: {selectedPaymentForStatusModal.paymentDate}
                    </span>
                  </div>
                </div>

                <div className="text-xs pt-1 border-t border-stone-200/80">
                  <span className="text-stone-500 block">Milestone / Allocation</span>
                  <span className="font-medium text-neutral-900 block truncate">
                    {selectedPaymentForStatusModal.milestoneTitle}
                  </span>
                </div>

                <div className="text-xs text-stone-500 pt-1">
                  <span>Method: </span>
                  <strong className="text-neutral-800">{selectedPaymentForStatusModal.paymentMethod}</strong>
                  <span className="block text-[11px] font-mono text-stone-400 mt-0.5">
                    {selectedPaymentForStatusModal.originatingBank} → {selectedPaymentForStatusModal.beneficiaryAccount}
                  </span>
                </div>
              </div>

              {/* Requirement 1: Display the current status clearly before saving */}
              <div className="bg-stone-100/80 rounded-xl p-3 border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider font-bold text-stone-500 block">
                    Current Status on Record
                  </span>
                  <span className="text-xs text-stone-600">Active status prior to saving change:</span>
                </div>
                <div>
                  {selectedPaymentForStatusModal.status === 'confirmed_cleared' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Confirmed & Cleared
                    </span>
                  )}
                  {selectedPaymentForStatusModal.status === 'processing_in_escrow' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      Processing in Escrow
                    </span>
                  )}
                  {selectedPaymentForStatusModal.status === 'pending_verification' && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Pending Verification
                    </span>
                  )}
                </div>
              </div>

              {/* Status Selection (Requirement 1 & 2) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
                  Select New Payment Status <span className="text-red-500">*</span>
                </label>

                <div className="space-y-2">
                  {/* Option 1: confirmed_cleared */}
                  <label
                    className={`block p-3 rounded-xl border transition cursor-pointer ${
                      paymentNewStatus === 'confirmed_cleared'
                        ? 'border-emerald-500 bg-emerald-50/50 ring-1 ring-emerald-500'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="confirmed_cleared"
                        checked={paymentNewStatus === 'confirmed_cleared'}
                        onChange={() => setPaymentNewStatus('confirmed_cleared')}
                        className="mt-1 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Confirmed & Cleared
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                            Adds to Paid Total
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Bank remittance reconciled or escrow stage certification signed. This amount is actively added to paid totals on Screens 4 and 6.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 2: processing_in_escrow */}
                  <label
                    className={`block p-3 rounded-xl border transition cursor-pointer ${
                      paymentNewStatus === 'processing_in_escrow'
                        ? 'border-sky-500 bg-sky-50/50 ring-1 ring-sky-500'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="processing_in_escrow"
                        checked={paymentNewStatus === 'processing_in_escrow'}
                        onChange={() => setPaymentNewStatus('processing_in_escrow')}
                        className="mt-1 text-sky-600 focus:ring-sky-500"
                      />
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-sky-600" />
                            Processing in Escrow
                          </span>
                          <span className="text-[10px] font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                            Held in Escrow
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Funds securely lodged in ring-fenced bank account, awaiting structural milestone verification before contractor disbursement. Excluded from paid totals.
                        </p>
                      </div>
                    </div>
                  </label>

                  {/* Option 3: pending_verification */}
                  <label
                    className={`block p-3 rounded-xl border transition cursor-pointer ${
                      paymentNewStatus === 'pending_verification'
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                        : 'border-stone-200 bg-white hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="paymentStatus"
                        value="pending_verification"
                        checked={paymentNewStatus === 'pending_verification'}
                        onChange={() => setPaymentNewStatus('pending_verification')}
                        className="mt-1 text-amber-600 focus:ring-amber-500"
                      />
                      <div className="flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                            Pending Bank Verification
                          </span>
                          <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                            Unconfirmed
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          Overseas Nostro wire or inter-bank transaction initiated but not yet confirmed by commercial bank. Excluded from paid totals.
                        </p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Requirement 3: Real-time dynamic calculation feedback preview */}
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs">
                <span className="font-bold text-neutral-800 block">Financial Reconciliation Effect:</span>
                {selectedPaymentForStatusModal.status !== 'confirmed_cleared' && paymentNewStatus === 'confirmed_cleared' && (
                  <p className="text-emerald-800 mt-1 flex items-center gap-1.5 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Changing to <strong>Confirmed & Cleared</strong> will increase paid totals by <strong>+₦{selectedPaymentForStatusModal.amountNgn.toLocaleString('en-NG')}</strong> and reduce outstanding balance across Screens 4 & 6.
                    </span>
                  </p>
                )}
                {selectedPaymentForStatusModal.status === 'confirmed_cleared' && paymentNewStatus !== 'confirmed_cleared' && (
                  <p className="text-amber-900 mt-1 flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>
                      Changing to unconfirmed/held will reverse this payment from paid totals (<strong>-₦{selectedPaymentForStatusModal.amountNgn.toLocaleString('en-NG')}</strong>) across Screens 4 & 6.
                    </span>
                  </p>
                )}
                {selectedPaymentForStatusModal.status === paymentNewStatus && (
                  <p className="text-stone-500 mt-1 italic">
                    Status remains unchanged ({paymentNewStatus}). Paid totals will not be affected.
                  </p>
                )}
              </div>

              {/* Staff Verification Audit Note */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-neutral-800">
                  Staff Verification Audit Note
                </label>
                <input
                  type="text"
                  value={paymentUpdateNote}
                  onChange={(e) => setPaymentUpdateNote(e.target.value)}
                  placeholder="e.g. Verified via Stanbic IBTC credit advice; stage QA sign-off confirmed."
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-amber-600 focus:bg-white"
                />
              </div>

              {/* Modal Footer */}
              <div className="pt-3 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-[11px] text-stone-500 italic">
                  * All changes save to shared application state and persist in browser localStorage.
                </span>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedPaymentForStatusModal(null)}
                    className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Save Status Update</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
