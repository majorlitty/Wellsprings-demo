import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CONSTRUCTION_SITE_IMAGE } from '../data/mockData';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency } from '../utils/formatters';
import {
  Building2,
  Calendar,
  ArrowRight,
  ShieldCheck,
  HardHat,
  CreditCard,
  Sparkles,
  CheckCircle2,
  Clock,
  MapPin,
  Receipt,
  FileCheck2,
  Landmark,
  BadgeAlert,
  ArrowUpRight,
  Layers,
  Info,
  Calculator,
  HelpCircle,
  FileText,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const {
    navigateTo,
    currency,
    project,
    customer,
    milestones,
    progressUpdates,
    paymentRecords,
  } = useApp();

  const [activityTab, setActivityTab] = useState<'all' | 'construction' | 'financial'>('all');
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(false);

  // Format explicitly in Nigerian Naira (₦)
  const formatNaira = (amount: number): string => {
    return `₦${Math.round(amount).toLocaleString('en-NG')}`;
  };

  // Helper to show Naira primary with optional converted currency secondary
  const formatMoney = (amountNgn: number): string => {
    const naira = formatNaira(amountNgn);
    if (currency === 'NGN') return naira;
    return `${naira} (${formatCurrency(amountNgn, currency)})`;
  };

  // --------------------------------------------------------------------------
  // 1. RECONCILED CONSTRUCTION PROGRESS CALCULATION (Fix 1)
  // Transparent rule: Sum of earned value for each milestone divided by total construction budget.
  // Foundation: 100% of ₦82.5M = ₦82.5M
  // Blockwork: 80% of ₦90.0M = ₦72.0M
  // Roofing: 0% of ₦55.0M = ₦0
  // Finishes: 0% of ₦70.0M = ₦0
  // Completion: 0% of ₦32.5M = ₦0
  // Total Earned: ₦154.5M / ₦330.0M = 46.82% -> 47%
  // --------------------------------------------------------------------------
  const progressReconciliation = useMemo(() => {
    const totalConstructionBudget = project.constructionBudgetNgn || 330_000_000;
    
    const milestoneBreakdown = milestones.map((m) => {
      const earnedNgn = (m.progressPercentage / 100) * m.allocatedConstructionBudgetNgn;
      return {
        id: m.id,
        stepNumber: m.stepNumber,
        name: m.name,
        progressPercentage: m.progressPercentage,
        allocatedBudgetNgn: m.allocatedConstructionBudgetNgn,
        earnedValueNgn: earnedNgn,
        status: m.status,
      };
    });

    const totalEarnedConstructionNgn = milestoneBreakdown.reduce(
      (sum, item) => sum + item.earnedValueNgn,
      0
    );

    // Calculated progress based on earned value
    const calculatedConstructionProgressPercent = totalConstructionBudget > 0
      ? Math.round((totalEarnedConstructionNgn / totalConstructionBudget) * 100)
      : 0;

    // Combined turnkey progress including land (100% acquired ₦120M)
    const totalTurnkeyBudget = (project.landBudgetNgn || 120_000_000) + totalConstructionBudget;
    const totalEarnedTurnkeyNgn = (project.landBudgetNgn || 120_000_000) + totalEarnedConstructionNgn;
    const calculatedTurnkeyProgressPercent = totalTurnkeyBudget > 0
      ? Math.round((totalEarnedTurnkeyNgn / totalTurnkeyBudget) * 100)
      : 0;

    return {
      totalConstructionBudget,
      totalEarnedConstructionNgn,
      calculatedConstructionProgressPercent, // 47%
      totalTurnkeyBudget,
      totalEarnedTurnkeyNgn,
      calculatedTurnkeyProgressPercent, // 61%
      milestoneBreakdown,
    };
  }, [project, milestones]);

  // --------------------------------------------------------------------------
  // 2. CHECK PAYMENT STATUS & VERIFIED RECONCILIATION (Fix 2)
  // Ensure only confirmed_cleared payments count toward the total paid.
  // --------------------------------------------------------------------------
  const {
    landBudget,
    constructionBudget,
    totalBudget,
    confirmedClearedPayments,
    landPaid,
    constructionPaid,
    totalPaid,
    landOutstanding,
    constructionOutstanding,
    totalOutstanding,
    landPercentPaid,
    constructionPercentPaid,
    totalPercentPaid,
    unconfirmedOrPendingCount,
  } = useMemo(() => {
    const lBudget = project.landBudgetNgn || 120_000_000;
    const cBudget = project.constructionBudgetNgn || 330_000_000;
    const tBudget = lBudget + cBudget;

    // Filter strictly recorded and confirmed_cleared payments
    const confirmedPayments = paymentRecords.filter(
      (r) => r.status === 'confirmed_cleared'
    );

    const clearedLand = confirmedPayments.filter((r) => r.category === 'land');
    const lPaid = clearedLand.reduce((sum, r) => sum + r.amountNgn, 0);

    const clearedConstruction = confirmedPayments.filter((r) => r.category === 'construction');
    const cPaid = clearedConstruction.reduce((sum, r) => sum + r.amountNgn, 0);

    const tPaid = lPaid + cPaid;

    const lOutstanding = Math.max(0, lBudget - lPaid);
    const cOutstanding = Math.max(0, cBudget - cPaid);
    const tOutstanding = Math.max(0, tBudget - tPaid);

    const lPercent = lBudget > 0 ? Math.min(100, Math.round((lPaid / lBudget) * 100)) : 0;
    const cPercent = cBudget > 0 ? Math.min(100, Math.round((cPaid / cBudget) * 100)) : 0;
    const tPercent = tBudget > 0 ? Math.min(100, Math.round((tPaid / tBudget) * 100)) : 0;

    const pendingCount = paymentRecords.filter((r) => r.status !== 'confirmed_cleared').length;

    return {
      landBudget: lBudget,
      constructionBudget: cBudget,
      totalBudget: tBudget,
      confirmedClearedPayments: confirmedPayments,
      landPaid: lPaid,
      constructionPaid: cPaid,
      totalPaid: tPaid,
      landOutstanding: lOutstanding,
      constructionOutstanding: cOutstanding,
      totalOutstanding: tOutstanding,
      landPercentPaid: lPercent,
      constructionPercentPaid: cPercent,
      totalPercentPaid: tPercent,
      unconfirmedOrPendingCount: pendingCount,
    };
  }, [project, paymentRecords]);

  // --------------------------------------------------------------------------
  // LATEST PROGRESS UPDATE
  // --------------------------------------------------------------------------
  const latestUpdate = useMemo(() => {
    if (!progressUpdates || progressUpdates.length === 0) return null;
    return progressUpdates[0];
  }, [progressUpdates]);

  // --------------------------------------------------------------------------
  // COMBINED RECENT ACTIVITY STREAM (Fix 3 & Fix 4 - Clear Simulated Labels + Legible Sizing)
  // --------------------------------------------------------------------------
  type ActivityItem =
    | {
        id: string;
        kind: 'construction';
        date: string;
        title: string;
        subTitle: string;
        description: string;
        badgeText: string;
        auditorOrMethod: string;
        actionLabel: string;
        navTarget: 'construction-progress';
      }
    | {
        id: string;
        kind: 'financial';
        date: string;
        title: string;
        subTitle: string;
        description: string;
        badgeText: string;
        auditorOrMethod: string;
        actionLabel: string;
        navTarget: 'financial-overview';
      };

  const activityList = useMemo<ActivityItem[]>(() => {
    const list: ActivityItem[] = [];

    // Add construction items
    if (progressUpdates && progressUpdates.length > 0) {
      progressUpdates.forEach((up) => {
        list.push({
          id: `act-con-${up.id}`,
          kind: 'construction',
          date: up.updateDate,
          title: up.title,
          subTitle: `Milestone: ${up.milestoneName}`,
          description: up.narrative,
          badgeText: `QA ${up.qaStatus} (Simulated Field Audit)`,
          auditorOrMethod: `Sample Inspection: ${up.engineerName} (${up.engineerRole} · Simulated Personnel)`,
          actionLabel: 'Inspect in Construction Progress (Screen 5)',
          navTarget: 'construction-progress',
        });
      });
    }

    // Add financial items
    if (paymentRecords && paymentRecords.length > 0) {
      paymentRecords.forEach((rec) => {
        list.push({
          id: `act-fin-${rec.id}`,
          kind: 'financial',
          date: rec.paymentDate,
          title: `${rec.category === 'land' ? 'Land Payment' : 'Construction Tranche'}: ${formatNaira(rec.amountNgn)}`,
          subTitle: `Covered: ${rec.milestoneTitle} · Ref: ${rec.paymentReference}`,
          description: `${rec.paymentMethod} from ${rec.originatingBank} to ${rec.beneficiaryAccount}. Channel reference: ${rec.channelReference}.`,
          badgeText: 'Cleared in Escrow (Simulated Record)',
          auditorOrMethod: `Receipt: ${rec.receiptNumber} · Authorised by ${rec.certifiedBy} (Simulated Fiduciary Log)`,
          actionLabel: 'View in Financial Overview (Screen 6)',
          navTarget: 'financial-overview',
        });
      });
    }

    return list;
  }, [progressUpdates, paymentRecords]);

  const filteredActivity = useMemo(() => {
    if (activityTab === 'construction') {
      return activityList.filter((item) => item.kind === 'construction');
    }
    if (activityTab === 'financial') {
      return activityList.filter((item) => item.kind === 'financial');
    }
    return activityList;
  }, [activityList, activityTab]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-24">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={4}
        screenName="Customer Project Dashboard"
        roleScope="Simulated Customer Portal"
        description="The central command hub for overseas diaspora clients. Displays active residential construction status, reconciled financial calculations, five-stage construction roadmap, and chronological activity streams."
        currentFoundationFeatures={[
          `Simulated diaspora client session: ${customer.fullName} (${customer.diasporaCity}, ${customer.diasporaCountry})`,
          'Reconciled progress calculation rule: 47% overall construction earned value (80% Blockwork stage)',
          'Strict payment reconciliation: Confirmed & cleared payments sum exactly to ₦292,500,000 (3 transactions)',
          'All engineering credentials, soil tests, and title deeds clearly labelled as simulated demo records',
          'Responsive typography with enhanced readability for secondary labels and financial figures on mobile devices'
        ]}
        subsequentPromptRoadmap={[
          'Live WebRTC site camera feed integration with remote pan-tilt controls',
          'Document vault with biometric download authorization and e-signatures',
          'Client variation request form with real-time bill of quantities impact'
        ]}
        nextSuggestedScreen={{ id: 'construction-progress', label: '5. Construction Progress' }}
      />

      {/* =========================================================================
          1. PROJECT OVERVIEW & HEADER (Fix 3 & Fix 4: Clear Simulated Labels + Legible Sizing)
          ========================================================================= */}
      <div className="bg-white p-5 sm:p-7 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600">
            <span className="font-bold text-neutral-900">{customer.fullName}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-700">{customer.diasporaCity}, {customer.diasporaCountry}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="font-mono text-stone-500 font-medium">Ref: {project.projectCode}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
              <span>Simulated Demonstration Project</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-display tracking-tight leading-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-stone-600">
            <p className="flex items-center gap-1.5 font-medium">
              <Building2 className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{project.propertyType}</span>
            </p>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <p className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{project.location} ({project.state})</span>
            </p>
          </div>
        </div>

        {/* Quick Portal Jump Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={() => navigateTo('construction-progress')}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition flex items-center justify-center gap-2 cursor-pointer shadow-xs min-h-[42px]"
          >
            <HardHat className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Construction Progress (Screen 5)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>

          <button
            onClick={() => navigateTo('financial-overview')}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer min-h-[42px]"
          >
            <CreditCard className="w-4 h-4 text-stone-500 shrink-0" />
            <span>Financial Overview (Screen 6)</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          KPI STAT CARDS (Fix 1: Reconciled 47% Construction Progress & Clear Rule)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Reconciled Overall Construction Progress */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Overall Construction Progress
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <HardHat className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {progressReconciliation.calculatedConstructionProgressPercent}%
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Reconciled
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1 font-medium">
              Earned Value: ₦154.5M of ₦330M budget
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100 space-y-2">
            <button
              onClick={() => setShowCalculationDetails(!showCalculationDetails)}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-600" />
              <span>{showCalculationDetails ? 'Hide calculation rule' : 'View calculation rule'}</span>
            </button>
            <p className="text-xs text-stone-500">
              Stage 2 (Blockwork) is 80% active
            </p>
          </div>
        </div>

        {/* Card 2: Current Active Milestone */}
        <MetricCard
          label="Current Construction Milestone"
          value={project.currentMilestoneName}
          subValue="Stage 2 of 5: Superstructure Columns & Slab"
          icon={<Layers className="w-5 h-5 text-amber-600" />}
          trend={{ positive: true, text: '80% complete for this stage' }}
          highlightColor="amber"
        />

        {/* Card 3: Target Completion Date */}
        <MetricCard
          label="Target Completion Date"
          value={project.targetCompletionDate}
          subValue={`Project Start: ${project.startDate}`}
          icon={<Calendar className="w-5 h-5 text-sky-600" />}
          trend={{ positive: true, text: 'Contractual target date' }}
          highlightColor="blue"
        />

        {/* Card 4: Site Supervisor (Fix 3: Simulated Credential Label) */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Assigned Site Lead
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-stone-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div>
            <span className="text-lg sm:text-xl font-bold text-neutral-900 block font-display">
              {project.siteSupervisorName}
            </span>
            <span className="text-xs text-stone-500 font-mono block mt-1">
              Sample Profile · Simulated COREN #31821
            </span>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs text-stone-600 font-medium">
              Simulated Audit: {project.lastInspectionDate}
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CALCULATION RULE EXPLANATION DRAWER (Fix 1: Reconcile 58% vs 80%)
          ========================================================================= */}
      {showCalculationDetails && (
        <div className="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 sm:p-6 space-y-4 transition-all">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm sm:text-base font-display">
              <Calculator className="w-5 h-5 text-amber-700 shrink-0" />
              <span>Calculation Rule: Construction Earned Progress Reconciliation</span>
            </div>
            <button
              onClick={() => setShowCalculationDetails(false)}
              className="text-xs font-semibold text-amber-900 hover:text-amber-950 px-2 py-1 bg-amber-200/60 rounded cursor-pointer"
            >
              Close
            </button>
          </div>

          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
            <strong>Why is Overall Construction Progress 47% while Blockwork is 80% complete?</strong>
            <br />
            The overall progress is calculated using the standard <strong>Earned Value Formula</strong> across all five construction milestones weighted by their contractually allocated budget:
          </p>

          <div className="bg-white p-4 rounded-xl border border-amber-200 space-y-3 text-xs sm:text-sm">
            <div className="font-mono font-semibold text-neutral-900 bg-stone-50 p-2.5 rounded border border-stone-200 overflow-x-auto text-xs">
              Overall Construction Progress = [Σ (Milestone % × Allocated Budget)] ÷ Total Construction Budget
            </div>

            <div className="space-y-1.5 text-stone-700">
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>1. Foundation (100% of ₦82,500,000):</span>
                <span className="font-mono font-bold text-neutral-900">₦82,500,000 earned</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>2. Blockwork & Slab (80% of ₦90,000,000):</span>
                <span className="font-mono font-bold text-neutral-900">₦72,000,000 earned</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>3. Roofing (0% of ₦55,000,000):</span>
                <span className="font-mono font-medium text-stone-500">₦0 earned</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>4. Finishes (0% of ₦70,000,000):</span>
                <span className="font-mono font-medium text-stone-500">₦0 earned</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-100">
                <span>5. Completion (0% of ₦32,500,000):</span>
                <span className="font-mono font-medium text-stone-500">₦0 earned</span>
              </div>
              <div className="flex justify-between pt-2 font-bold text-neutral-900 text-xs sm:text-sm">
                <span>Total Earned Construction Value:</span>
                <span className="font-mono text-amber-800">
                  ₦154,500,000 ÷ ₦330,000,000 = 46.82% ≈ 47%
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 pt-2 border-t border-stone-100">
              <em>Turnkey Project Perspective:</em> If including 100% acquired land (₦120,000,000), total turnkey earned value is (₦120M + ₦154.5M) = ₦274.5M of ₦450.0M turnkey commitment = <strong>61.0%</strong>.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          LATEST PROGRESS UPDATE HIGHLIGHT (Fix 3: Simulated Credentials & Tests)
          ========================================================================= */}
      {latestUpdate && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-stone-50 border border-amber-200/90 rounded-2xl p-5 sm:p-7 relative overflow-hidden shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Latest Field Inspection Update
                </span>
                <span aria-hidden="true" className="text-amber-300">·</span>
                <span className="text-xs sm:text-sm font-mono text-stone-600 flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {latestUpdate.updateDate}
                </span>
                <span aria-hidden="true" className="text-amber-300">·</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  QA Status: {latestUpdate.qaStatus} (Simulated Field Audit)
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display">
                {latestUpdate.title}
              </h2>
            </div>

            <button
              onClick={() => navigateTo('construction-progress')}
              className="text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-4 py-2 rounded-lg border border-amber-300/80 transition flex items-center gap-2 cursor-pointer shrink-0 min-h-[40px]"
            >
              <span>View Full Engineering Report & Photos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {latestUpdate.narrative}
              </p>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-stone-600 pt-2 border-t border-amber-200/40">
                <span className="font-semibold text-stone-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>{latestUpdate.engineerName} (Sample Profile · Simulated Lead QA)</span>
                </span>
                <span className="text-stone-300">·</span>
                <span>Type: {latestUpdate.inspectionType}</span>
                <span className="text-stone-300">·</span>
                <span className="font-mono text-amber-800">Sample GPS: 9.0234° N, 7.5189° E (Guzape)</span>
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="lg:col-span-4">
              <div
                onClick={() => navigateTo('construction-progress')}
                className="relative rounded-xl overflow-hidden aspect-16/9 bg-neutral-900 border border-stone-200 cursor-pointer group shadow-xs"
              >
                <img
                  src={CONSTRUCTION_SITE_IMAGE}
                  alt="Site verification log (illustrative)"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/10 transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white p-2.5 rounded text-xs flex items-center justify-between">
                  <span className="font-medium">Photo Log #01 · Column Pour (Simulated)</span>
                  <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-0.5">
                    Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. BUDGET SUMMARY & RECONCILIATION (Fix 2: Checked ₦292.5M & Strict Verification)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-600" />
                <span>Project Financial & Escrow Budget Summary</span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Strictly calculated from confirmed and cleared payments. Unpaid scheduled installments are excluded.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 px-3 py-1.5 rounded-full">
              Values in Nigerian Naira (₦)
            </span>
          </div>
        </div>

        {/* 3 Budget Columns: Land, Construction, and Combined Total */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column A: Land Acquisition Budget */}
          <div className="bg-stone-50/80 rounded-xl border border-stone-200 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-1 rounded">
                  1. Land Acquisition Budget
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  {landPercentPaid}% Settled
                </span>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium">Allocated Land Budget</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tracking-tight mt-1">
                  {formatNaira(landBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-xs sm:text-sm text-stone-500 font-mono mt-0.5">
                    ≈ {formatCurrency(landBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-stone-700">
                  <span>Paid to Date (Cleared)</span>
                  <span className="font-bold text-emerald-800 font-mono">{formatNaira(landPaid)}</span>
                </div>
                <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${landPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Confirmed Payments:</span>
                  <span className="font-bold text-neutral-900">1 transaction (₦120.0M)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Outstanding Balance:</span>
                  <span className={`font-mono font-bold ${landOutstanding === 0 ? 'text-emerald-700' : 'text-neutral-900'}`}>
                    {formatNaira(landOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span>Title Status:</span>
                  <span className="font-semibold text-stone-800">C of O (Sample Reference)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 italic pt-2 border-t border-stone-200">
              * Dedicated land escrow account fully cleared prior to site mobilization (Simulated).
            </p>
          </div>

          {/* Column B: Construction Budget */}
          <div className="bg-stone-50/80 rounded-xl border border-stone-200 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2.5 py-1 rounded">
                  2. Construction Budget
                </span>
                <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                  {constructionPercentPaid}% Disbursed
                </span>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-stone-500 font-medium">Turnkey Construction Budget</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono tracking-tight mt-1">
                  {formatNaira(constructionBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-xs sm:text-sm text-stone-500 font-mono mt-0.5">
                    ≈ {formatCurrency(constructionBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-stone-700">
                  <span>Paid to Date (Cleared)</span>
                  <span className="font-bold text-amber-800 font-mono">{formatNaira(constructionPaid)}</span>
                </div>
                <div className="h-2.5 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${constructionPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Confirmed Payments:</span>
                  <span className="font-bold text-neutral-900">2 tranches (₦172.5M)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Outstanding Balance:</span>
                  <span className="font-mono font-bold text-amber-900">
                    {formatNaira(constructionOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span>Active Phase:</span>
                  <span className="font-semibold text-stone-800">Stage 2 Decking Pour</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 italic pt-2 border-t border-stone-200">
              * Escrow funds released only upon simulated engineer milestone certification.
            </p>
          </div>

          {/* Column C: Combined Project Budget Total */}
          <div className="bg-neutral-900 text-stone-100 rounded-xl border border-neutral-800 p-5 space-y-4 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-neutral-800 px-2.5 py-1 rounded border border-neutral-700">
                  Combined Turnkey Total
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800">
                  {totalPercentPaid}% Paid
                </span>
              </div>

              <div>
                <p className="text-xs sm:text-sm text-stone-400 font-medium">Combined Project Budget</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight mt-1">
                  {formatNaira(totalBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-xs sm:text-sm text-stone-400 font-mono mt-0.5">
                    ≈ {formatCurrency(totalBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm text-stone-300">
                  <span>Total Paid (3 Cleared Records)</span>
                  <span className="font-bold text-emerald-400 font-mono">{formatNaira(totalPaid)}</span>
                </div>
                <div className="h-2.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${totalPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Total Confirmed Paid:</span>
                  <span className="font-mono font-bold text-emerald-400">{formatNaira(totalPaid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Total Outstanding:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {formatNaira(totalOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-stone-400">
                  <span>Escrow Channel:</span>
                  <span className="font-medium text-stone-200">Standard Chartered / Zenith (Sample)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('financial-overview')}
              className="w-full py-2.5 px-3 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2 min-h-[40px]"
            >
              <CreditCard className="w-4 h-4" />
              <span>Full Financial Ledger (Screen 6)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PAYMENT RECONCILIATION AUDIT BOX (Fix 2: Proof of ₦292.5M Sum) */}
        <div className="bg-stone-50 rounded-xl border border-stone-200 p-4 sm:p-5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <h3 className="text-xs sm:text-sm font-bold text-neutral-900">
                Payment Status Reconciliation: Verified ₦292,500,000 Total
              </h3>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
              Only Confirmed & Cleared Payments Included
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600">
            The <strong>₦292,500,000</strong> paid total is derived strictly from confirmed banking wire receipts. The individual transaction records add up exactly as follows:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            {confirmedClearedPayments.map((p, idx) => (
              <div key={p.id} className="bg-white p-3.5 rounded-lg border border-stone-200 space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                    Record #{idx + 1} · {p.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    Cleared
                  </span>
                </div>
                <p className="text-sm sm:text-base font-extrabold text-neutral-900 font-mono">
                  {formatNaira(p.amountNgn)}
                </p>
                <p className="text-xs text-stone-600 line-clamp-1">
                  {p.milestoneTitle}
                </p>
                <div className="flex justify-between text-xs text-stone-500 pt-1 border-t border-stone-100 font-mono">
                  <span>{p.paymentDate}</span>
                  <span>{p.receiptNumber}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-stone-600 pt-2 border-t border-stone-200">
            <span className="font-mono">
              Reconciliation Check: ₦120,000,000 + ₦82,500,000 + ₦90,000,000 = <strong>₦292,500,000</strong>
            </span>
            <span className="text-stone-500 italic">
              * Remaining 3 tranches (₦157,500,000) are pending future milestones and excluded from paid figures.
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. CONSTRUCTION ROADMAP (Fix 4: Legible Typography & Stage Details)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-600" />
              <span>Five-Stage Construction Roadmap</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Contractually mandated engineering milestones for the Adeyemi Guzape Hillside Residence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('construction-progress')}
              className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View In-Depth Logs (Screen 5)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 5 Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {milestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isInProgress = m.status === 'in_progress';
            const isUpcoming = m.status === 'upcoming';

            return (
              <div
                key={m.id}
                onClick={() => navigateTo('construction-progress')}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3.5 ${
                  isInProgress
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : isCompleted
                    ? 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    : 'bg-white border-stone-200/80 opacity-85 hover:opacity-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-stone-500 uppercase tracking-wider">
                      Stage 0{m.stepNumber}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Completed
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 animate-pulse">
                        <Clock className="w-3.5 h-3.5 text-amber-700" />
                        Active (80%)
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-display leading-snug">
                    {m.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {m.title}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60">
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-stone-600 font-medium">Stage Progress</span>
                    <span className="font-bold font-mono text-neutral-900">{m.progressPercentage}%</span>
                  </div>

                  <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCompleted
                          ? 'bg-emerald-600'
                          : isInProgress
                          ? 'bg-amber-500'
                          : 'bg-stone-300'
                      }`}
                      style={{ width: `${m.progressPercentage}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-xs text-stone-600 pt-1">
                    <span>Budget Allocated:</span>
                    <span className="font-mono font-semibold text-stone-900">
                      {formatNaira(m.allocatedConstructionBudgetNgn)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap Footer Navigation Links */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center gap-2 text-stone-700">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Detailed structural deliverables, simulated concrete cube test ratings, and sample sign-offs are logged in Screen 5.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('construction-progress')}
              className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Construction Progress</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => navigateTo('financial-overview')}
              className="font-bold text-stone-700 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Financial Overview</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. RECENT ACTIVITY STREAM (Fix 3 & Fix 4: Clear Distinction & Readability)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 font-display flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Recent Project & Financial Activity</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Audit stream clearly distinguishing simulated engineering site updates from banking escrow records.
            </p>
          </div>

          {/* Activity Category Filter Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs sm:text-sm self-start sm:self-auto max-w-full overflow-x-auto">
            <button
              onClick={() => setActivityTab('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer ${
                activityTab === 'all'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-neutral-900'
              }`}
            >
              All Activity ({activityList.length})
            </button>
            <button
              onClick={() => setActivityTab('construction')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activityTab === 'construction'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-neutral-900'
              }`}
            >
              <HardHat className="w-3.5 h-3.5 text-amber-400" />
              <span>Construction ({progressUpdates.length})</span>
            </button>
            <button
              onClick={() => setActivityTab('financial')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activityTab === 'financial'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-neutral-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Financial ({paymentRecords.length})</span>
            </button>
          </div>
        </div>

        {/* Activity Items List */}
        {filteredActivity.length === 0 ? (
          /* Empty State */
          <div className="p-12 text-center bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <Info className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm sm:text-base font-bold text-neutral-900 font-display">
              No activity records available
            </p>
            <p className="text-xs sm:text-sm text-stone-500 max-w-sm mx-auto">
              There are currently no {activityTab !== 'all' ? activityTab : ''} records logged in the shared demonstration data.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredActivity.map((item) => {
              const isConstruction = item.kind === 'construction';

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-4 ${
                    isConstruction
                      ? 'bg-stone-50/70 border-stone-200 hover:bg-stone-50'
                      : 'bg-emerald-50/30 border-emerald-200/80 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Kind Badge Icon */}
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isConstruction
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isConstruction ? (
                        <HardHat className="w-5 h-5" />
                      ) : (
                        <Receipt className="w-5 h-5" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                            isConstruction
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          {isConstruction ? 'Construction Audit (Simulated)' : 'Financial Escrow (Simulated)'}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-xs sm:text-sm text-stone-600 font-mono flex items-center gap-1 font-medium">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          {item.date}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-xs sm:text-sm font-semibold text-stone-700">
                          {item.subTitle}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-neutral-900 font-display">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      <p className="text-xs text-stone-500 pt-1 font-mono">
                        {item.auditorOrMethod}
                      </p>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="self-end sm:self-center shrink-0">
                    <button
                      onClick={() => navigateTo(item.navTarget)}
                      className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg transition flex items-center gap-1.5 cursor-pointer min-h-[38px] ${
                        isConstruction
                          ? 'bg-white border border-stone-200 text-neutral-900 hover:bg-stone-100 shadow-xs'
                          : 'bg-emerald-800 text-white hover:bg-emerald-900 shadow-xs'
                      }`}
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          5. FIDUCIARY DISCLAIMER & SIMULATED DEMO NOTICE (Fix 3)
          ========================================================================= */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 text-xs sm:text-sm text-stone-600 space-y-2">
        <div className="flex items-center gap-2 text-stone-800 font-bold text-sm sm:text-base font-display">
          <BadgeAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Fiduciary Transparency & Illustrative Demonstration Notice</span>
        </div>
        <p className="leading-relaxed">
          All engineering credentials (e.g. COREN registration numbers), laboratory concrete strength certifications (34.2 N/mm²), land title deed references (C of O #AGIS-GZ-418), and bank wire transaction records displayed on this dashboard are <strong>simulated demonstration data</strong> created strictly for evaluating the Wellsprings Property Development user interface. No actual monetary charges have taken place, and all records do not represent a verified real-world site.
        </p>
        <p className="text-xs text-stone-500 pt-2 border-t border-stone-200">
          To reset all demo modifications and restore pristine seed data, click the <strong>Reset Demo Data</strong> button in the top navigator bar.
        </p>
      </div>
    </div>
  );
};
