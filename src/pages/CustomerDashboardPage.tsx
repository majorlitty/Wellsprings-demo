import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CONSTRUCTION_SITE_IMAGE } from '../data/mockData';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency } from '../utils/formatters';
import {
  Building2,
  Calendar,
  Video,
  FileText,
  ArrowRight,
  ShieldCheck,
  HardHat,
  CreditCard,
  Download,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
  MapPin,
  ExternalLink,
  Receipt,
  FileCheck2,
  Landmark,
  BadgeAlert,
  ArrowUpRight,
  Layers,
  Info,
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

  // Format explicitly in Nigerian Naira (₦) as mandated by Prompt 3
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
  // DYNAMIC BUDGET CALCULATIONS (Requirement 2)
  // Only recorded payments count as paid. Unpaid scheduled installments must not be counted.
  // --------------------------------------------------------------------------
  const {
    landBudget,
    constructionBudget,
    totalBudget,
    landPaid,
    constructionPaid,
    totalPaid,
    landOutstanding,
    constructionOutstanding,
    totalOutstanding,
    landPercentPaid,
    constructionPercentPaid,
    totalPercentPaid,
    recordedLandPaymentsCount,
    recordedConstructionPaymentsCount,
  } = useMemo(() => {
    const lBudget = project.landBudgetNgn || 0;
    const cBudget = project.constructionBudgetNgn || 0;
    const tBudget = lBudget + cBudget;

    // Filter strictly recorded and confirmed payments
    const clearedLandPayments = paymentRecords.filter(
      (r) => r.category === 'land' && r.status === 'confirmed_cleared'
    );
    const lPaid = clearedLandPayments.reduce((sum, r) => sum + r.amountNgn, 0);

    const clearedConstructionPayments = paymentRecords.filter(
      (r) => r.category === 'construction' && r.status === 'confirmed_cleared'
    );
    const cPaid = clearedConstructionPayments.reduce((sum, r) => sum + r.amountNgn, 0);

    const tPaid = lPaid + cPaid;

    const lOutstanding = Math.max(0, lBudget - lPaid);
    const cOutstanding = Math.max(0, cBudget - cPaid);
    const tOutstanding = Math.max(0, tBudget - tPaid);

    const lPercent = lBudget > 0 ? Math.min(100, Math.round((lPaid / lBudget) * 100)) : 0;
    const cPercent = cBudget > 0 ? Math.min(100, Math.round((cPaid / cBudget) * 100)) : 0;
    const tPercent = tBudget > 0 ? Math.min(100, Math.round((tPaid / tBudget) * 100)) : 0;

    return {
      landBudget: lBudget,
      constructionBudget: cBudget,
      totalBudget: tBudget,
      landPaid: lPaid,
      constructionPaid: cPaid,
      totalPaid: tPaid,
      landOutstanding: lOutstanding,
      constructionOutstanding: cOutstanding,
      totalOutstanding: tOutstanding,
      landPercentPaid: lPercent,
      constructionPercentPaid: cPercent,
      totalPercentPaid: tPercent,
      recordedLandPaymentsCount: clearedLandPayments.length,
      recordedConstructionPaymentsCount: clearedConstructionPayments.length,
    };
  }, [project, paymentRecords]);

  // --------------------------------------------------------------------------
  // LATEST PROGRESS UPDATE (Requirement 1)
  // --------------------------------------------------------------------------
  const latestUpdate = useMemo(() => {
    if (!progressUpdates || progressUpdates.length === 0) return null;
    return progressUpdates[0];
  }, [progressUpdates]);

  // --------------------------------------------------------------------------
  // COMBINED RECENT ACTIVITY STREAM (Requirement 4)
  // Distinguish construction vs financial; support empty state when no data exists.
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
          badgeText: up.qaStatus,
          auditorOrMethod: `Inspector: ${up.engineerName} (${up.engineerRole})`,
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
          badgeText: 'Cleared in Escrow',
          auditorOrMethod: `Receipt: ${rec.receiptNumber} · Certified by ${rec.certifiedBy}`,
          actionLabel: 'View in Financial Overview (Screen 6)',
          navTarget: 'financial-overview',
        });
      });
    }

    // Return all sorted or as collected
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
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={4}
        screenName="Customer Project Dashboard"
        roleScope="Simulated Customer Portal"
        description="The central command hub for overseas diaspora clients. Displays active residential construction status, dynamically calculated land and construction finances, five-stage construction roadmap, and recent construction vs financial activity streams."
        currentFoundationFeatures={[
          `Simulated diaspora client session: ${customer.fullName} (${customer.diasporaCity}, ${customer.diasporaCountry})`,
          'Dynamic financial calculations strictly based on recorded payments (Unpaid installments are excluded)',
          'Complete 5-stage construction roadmap with shared status and completion percentages',
          'Chronological construction updates and financial payment activity stream with clear distinction',
          'Responsive navigation to Construction Progress (Screen 5) and Financial Overview (Screen 6)'
        ]}
        subsequentPromptRoadmap={[
          'Live WebRTC site camera feed integration with remote pan-tilt controls',
          'Document vault with biometric download authorization and e-signatures',
          'Client variation request form with real-time bill of quantities impact'
        ]}
        nextSuggestedScreen={{ id: 'construction-progress', label: '5. Construction Progress' }}
      />

      {/* =========================================================================
          1. PROJECT OVERVIEW & HEADER (Requirement 1)
          ========================================================================= */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-neutral-900">{customer.fullName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-600">{customer.diasporaCity}, {customer.diasporaCountry}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-stone-400">Ref: {project.projectCode}</span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              Illustrative Sample Project
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 font-display tracking-tight">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600">
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

        {/* Quick Portal Jump Buttons (Requirement 3) */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo('construction-progress')}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <HardHat className="w-3.5 h-3.5 text-amber-400" />
            <span>Construction Progress (Screen 5)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => navigateTo('financial-overview')}
            className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-stone-500" />
            <span>Financial Overview (Screen 6)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Requirement 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Overall Construction Progress"
          value={`${project.overallProgressPercentage}%`}
          subValue={`Stage 2 of 5 actively underway`}
          icon={<HardHat className="w-5 h-5 text-amber-600" />}
          trend={{ positive: true, text: 'Structural rebar & columns certified' }}
          highlightColor="amber"
        />

        <MetricCard
          label="Current Construction Milestone"
          value={project.currentMilestoneName}
          subValue="Milestone 2: Blockwork & Decking"
          icon={<Layers className="w-5 h-5 text-amber-600" />}
          trend={{ positive: true, text: '80% completed for active phase' }}
          highlightColor="amber"
        />

        <MetricCard
          label="Target Completion Date"
          value={project.targetCompletionDate}
          subValue={`Project Start: ${project.startDate}`}
          icon={<Calendar className="w-5 h-5 text-sky-600" />}
          trend={{ positive: true, text: 'On contractual delivery schedule' }}
          highlightColor="blue"
        />

        <MetricCard
          label="Lead Structural Consultant"
          value={project.siteSupervisorName}
          subValue={project.siteSupervisorCredentials}
          icon={<ShieldCheck className="w-5 h-5 text-stone-600" />}
          trend={{ positive: true, text: `Last Audit: ${project.lastInspectionDate}` }}
        />
      </div>

      {/* =========================================================================
          LATEST PROGRESS UPDATE HIGHLIGHT (Requirement 1)
          ========================================================================= */}
      {latestUpdate && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-50/50 to-stone-50 border border-amber-200/90 rounded-2xl p-6 relative overflow-hidden shadow-xs">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-amber-200/60">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                  Latest Field Inspection Update
                </span>
                <span aria-hidden="true" className="text-amber-300">·</span>
                <span className="text-xs font-mono text-stone-600 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  {latestUpdate.updateDate}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  QA {latestUpdate.qaStatus}
                </span>
              </div>
              <h2 className="text-lg md:text-xl font-bold text-neutral-900 font-display">
                {latestUpdate.title}
              </h2>
            </div>

            <button
              onClick={() => navigateTo('construction-progress')}
              className="text-xs font-bold text-amber-900 hover:text-amber-950 bg-amber-100 hover:bg-amber-200/80 px-3.5 py-1.5 rounded-lg border border-amber-300/80 transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>View Full Engineering Report & Photos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
                {latestUpdate.narrative}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-[11px] text-stone-500 pt-2 border-t border-amber-200/40">
                <span className="font-semibold text-stone-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  {latestUpdate.engineerName} ({latestUpdate.engineerRole})
                </span>
                <span className="text-stone-400">·</span>
                <span>Type: {latestUpdate.inspectionType}</span>
                <span className="text-stone-400">·</span>
                <span className="font-mono text-amber-800">GPS: 9.0234° N, 7.5189° E (Guzape)</span>
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
                  alt="Site verification log"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-neutral-900/30 group-hover:bg-neutral-900/10 transition-colors" />
                <div className="absolute bottom-2 left-2 right-2 bg-neutral-950/85 backdrop-blur-xs text-white p-2 rounded text-[10px] flex items-center justify-between">
                  <span>Photo Log #01 · Column Pour</span>
                  <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-0.5">
                    Inspect <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          2. BUDGET SUMMARY (Requirement 2 - Separate Land & Construction Budgets)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-600" />
                <span>Project Financial & Escrow Budget Summary</span>
              </h2>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Strictly calculated from recorded cleared payments. Unpaid scheduled installments are not counted as payments.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 border border-stone-200 px-3 py-1 rounded-full">
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
                <span className="text-xs font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2 py-0.5 rounded">
                  1. Land Acquisition Budget
                </span>
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {landPercentPaid}% Settled
                </span>
              </div>

              <div>
                <p className="text-xs text-stone-500 font-medium">Allocated Land Budget</p>
                <p className="text-2xl font-extrabold text-neutral-900 font-mono tracking-tight mt-0.5">
                  {formatNaira(landBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-[11px] text-stone-400 font-mono">
                    ≈ {formatCurrency(landBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-600">
                  <span>Paid to Date</span>
                  <span className="font-bold text-emerald-800 font-mono">{formatNaira(landPaid)}</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${landPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Recorded Payments:</span>
                  <span className="font-bold text-neutral-900">{recordedLandPaymentsCount} transaction(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Outstanding Balance:</span>
                  <span className={`font-mono font-bold ${landOutstanding === 0 ? 'text-emerald-700' : 'text-neutral-900'}`}>
                    {formatNaira(landOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-500">
                  <span>Title Status:</span>
                  <span className="font-medium text-stone-800">FCDA C of O Perfected</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-200">
              * Dedicated land escrow account fully cleared prior to site mobilization.
            </p>
          </div>

          {/* Column B: Construction Budget */}
          <div className="bg-stone-50/80 rounded-xl border border-stone-200 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-100 px-2 py-0.5 rounded">
                  2. Construction Budget
                </span>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {constructionPercentPaid}% Disbursed
                </span>
              </div>

              <div>
                <p className="text-xs text-stone-500 font-medium">Turnkey Construction Budget</p>
                <p className="text-2xl font-extrabold text-neutral-900 font-mono tracking-tight mt-0.5">
                  {formatNaira(constructionBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-[11px] text-stone-400 font-mono">
                    ≈ {formatCurrency(constructionBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-600">
                  <span>Paid to Date</span>
                  <span className="font-bold text-amber-800 font-mono">{formatNaira(constructionPaid)}</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${constructionPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Recorded Payments:</span>
                  <span className="font-bold text-neutral-900">{recordedConstructionPaymentsCount} milestone tranche(s)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-600">Outstanding Balance:</span>
                  <span className="font-mono font-bold text-amber-900">
                    {formatNaira(constructionOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-500">
                  <span>Active Tranche:</span>
                  <span className="font-medium text-stone-800">Stage 2 Decking Pour</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-500 italic pt-2 border-t border-stone-200">
              * Escrow funds released only upon certified COREN lab test pass.
            </p>
          </div>

          {/* Column C: Combined Project Budget Total */}
          <div className="bg-neutral-900 text-stone-100 rounded-xl border border-neutral-800 p-5 space-y-4 flex flex-col justify-between shadow-md">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-neutral-800 px-2 py-0.5 rounded border border-neutral-700">
                  Combined Turnkey Total
                </span>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {totalPercentPaid}% Paid
                </span>
              </div>

              <div>
                <p className="text-xs text-stone-400 font-medium">Combined Project Budget</p>
                <p className="text-2xl font-extrabold text-white font-mono tracking-tight mt-0.5">
                  {formatNaira(totalBudget)}
                </p>
                {currency !== 'NGN' && (
                  <p className="text-[11px] text-stone-400 font-mono">
                    ≈ {formatCurrency(totalBudget, currency)}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-stone-300">
                  <span>Total Paid (Recorded)</span>
                  <span className="font-bold text-emerald-400 font-mono">{formatNaira(totalPaid)}</span>
                </div>
                <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${totalPercentPaid}%` }}
                  />
                </div>
              </div>

              {/* Metrics Table */}
              <div className="pt-2 border-t border-neutral-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Total Paid:</span>
                  <span className="font-mono font-bold text-emerald-400">{formatNaira(totalPaid)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-400">Total Outstanding:</span>
                  <span className="font-mono font-bold text-amber-400">
                    {formatNaira(totalOutstanding)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-stone-400">
                  <span>Escrow Provider:</span>
                  <span className="font-medium text-stone-200">Standard Chartered / Zenith</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('financial-overview')}
              className="w-full py-2 px-3 text-xs font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Full Financial Ledger (Screen 6)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. CONSTRUCTION ROADMAP (Requirement 3 - Five Milestones)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
              <HardHat className="w-5 h-5 text-amber-600" />
              <span>Five-Stage Construction Roadmap</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Contractually mandated engineering milestones for the Adeyemi Guzape Hillside Residence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('construction-progress')}
              className="text-xs font-semibold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>View In-Depth Logs (Screen 5)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5 Milestones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {milestones.map((m) => {
            const isCompleted = m.status === 'completed';
            const isInProgress = m.status === 'in_progress';
            const isUpcoming = m.status === 'upcoming';

            return (
              <div
                key={m.id}
                onClick={() => navigateTo('construction-progress')}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isInProgress
                    ? 'bg-amber-50/60 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : isCompleted
                    ? 'bg-stone-50 border-stone-200 hover:border-stone-300'
                    : 'bg-white border-stone-200/80 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider">
                      Stage 0{m.stepNumber}
                    </span>
                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Completed
                      </span>
                    )}
                    {isInProgress && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded border border-amber-300 animate-pulse">
                        <Clock className="w-3 h-3 text-amber-700" />
                        Active
                      </span>
                    )}
                    {isUpcoming && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        Upcoming
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-neutral-900 font-display leading-snug">
                    {m.name}
                  </h3>
                  <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                    {m.title}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/60">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-stone-500">Progress</span>
                    <span className="font-bold font-mono text-neutral-900">{m.progressPercentage}%</span>
                  </div>

                  <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden">
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

                  <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1">
                    <span>Budget:</span>
                    <span className="font-mono font-medium text-stone-800">
                      {formatNaira(m.allocatedConstructionBudgetNgn)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Roadmap Footer Navigation Links */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div className="flex items-center gap-2 text-stone-600">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Detailed structural deliverables, slump testing data, and COREN sign-offs are logged in Screen 5.
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => navigateTo('construction-progress')}
              className="font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
            >
              <span>Construction Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={() => navigateTo('financial-overview')}
              className="font-bold text-stone-700 hover:text-neutral-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Financial Overview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          4. RECENT ACTIVITY STREAM (Requirement 4 - Construction & Financial)
          ========================================================================= */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-display flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>Recent Project & Financial Activity</span>
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Live audit stream clearly distinguishing engineering site updates from verified banking escrow records.
            </p>
          </div>

          {/* Activity Category Filter Tabs */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs self-start sm:self-auto max-w-full overflow-x-auto">
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
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                activityTab === 'construction'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-neutral-900'
              }`}
            >
              <HardHat className="w-3 h-3 text-amber-400" />
              <span>Construction ({progressUpdates.length})</span>
            </button>
            <button
              onClick={() => setActivityTab('financial')}
              className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer flex items-center gap-1 ${
                activityTab === 'financial'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-neutral-900'
              }`}
            >
              <CreditCard className="w-3 h-3 text-emerald-400" />
              <span>Financial ({paymentRecords.length})</span>
            </button>
          </div>
        </div>

        {/* Activity Items List */}
        {filteredActivity.length === 0 ? (
          /* Empty State (Requirement 4) */
          <div className="p-12 text-center bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <Info className="w-8 h-8 text-stone-400 mx-auto" />
            <p className="text-sm font-bold text-neutral-900 font-display">
              No activity records available
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
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
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start justify-between gap-4 ${
                    isConstruction
                      ? 'bg-stone-50/70 border-stone-200 hover:bg-stone-50'
                      : 'bg-emerald-50/30 border-emerald-200/80 hover:bg-emerald-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Kind Badge Icon */}
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isConstruction
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isConstruction ? (
                        <HardHat className="w-4 h-4" />
                      ) : (
                        <Receipt className="w-4 h-4" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isConstruction
                              ? 'bg-amber-100 text-amber-900 border border-amber-200'
                              : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                          }`}
                        >
                          {isConstruction ? 'Construction Audit' : 'Financial Escrow'}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-stone-400" />
                          {item.date}
                        </span>
                        <span aria-hidden="true" className="text-stone-300">·</span>
                        <span className="text-xs font-semibold text-stone-700">
                          {item.subTitle}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-neutral-900 font-display">
                        {item.title}
                      </h3>

                      <p className="text-xs text-stone-600 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>

                      <p className="text-[11px] text-stone-400 pt-1 font-mono">
                        {item.auditorOrMethod}
                      </p>
                    </div>
                  </div>

                  {/* Right Action */}
                  <div className="self-end sm:self-center shrink-0">
                    <button
                      onClick={() => navigateTo(item.navTarget)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        isConstruction
                          ? 'bg-white border border-stone-200 text-neutral-900 hover:bg-stone-100'
                          : 'bg-emerald-800 text-white hover:bg-emerald-900'
                      }`}
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* =========================================================================
          5. TRUST, DEMO & FIDUCIARY DISCLAIMER (Requirement 6)
          ========================================================================= */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 text-xs text-stone-600 space-y-2">
        <div className="flex items-center gap-2 text-stone-800 font-bold text-sm font-display">
          <BadgeAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Fiduciary Transparency & Illustrative Demonstration Notice</span>
        </div>
        <p className="leading-relaxed">
          All project records, land title abstracts (C of O #AGIS-GZ-418), structural concrete test ratings (34.2 N/mm²), and diaspora wire transaction references displayed on this dashboard are illustrative simulations created for testing the Wellsprings Property Development platform. No actual financial debits have taken place, and updates do not represent a real-world building site.
        </p>
        <p className="text-[11px] text-stone-500 pt-1 border-t border-stone-200/80">
          To reset all simulated state modifications and restore the pristine seed portfolio, use the <strong>Reset Demo Data</strong> button in the top Demo Navigator bar.
        </p>
      </div>
    </div>
  );
};
