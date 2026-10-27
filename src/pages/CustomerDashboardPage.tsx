import React from 'react';
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
  User,
  ArrowRight,
  ShieldCheck,
  HardHat,
  CreditCard,
  Download,
  AlertCircle,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Compass,
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { navigateTo, currency, project, customer, milestones } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={4}
        screenName="Customer Project Dashboard"
        roleScope="Simulated Customer Portal"
        description="The central command hub for overseas diaspora clients. Displays active residential construction status, separate land and construction budgets, site supervision details, and quick links to granular milestone logs and financial escrow statements."
        currentFoundationFeatures={[
          `Simulated diaspora client session (${customer.fullName}, ${customer.diasporaCity} ${customer.diasporaCountry})`,
          'Separate Land Budget (₦120M) and Residential Construction Budget (₦330M)',
          '5-Stage milestone progression tracking (Foundation, Blockwork, Roofing, Finishes, Completion)',
          'Integrated navigation to Construction Progress (Screen 5) and Financial Overview (Screen 6)'
        ]}
        subsequentPromptRoadmap={[
          'Live WebRTC site camera feed integration with remote pan-tilt controls',
          'Document vault with biometric download authorization and e-signatures',
          'Client variation request form with real-time bill of quantities impact'
        ]}
        nextSuggestedScreen={{ id: 'construction-progress', label: '5. Construction Progress' }}
      />

      {/* Customer Header Strip (Verve inspired) */}
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

          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            {project.title}
          </h1>

          <p className="text-xs text-stone-500 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>{project.propertyType}</span>
            <span aria-hidden="true">·</span>
            <span>{project.location}</span>
          </p>
        </div>

        {/* Quick Portal Jump Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => navigateTo('construction-progress')}
            className="px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <HardHat className="w-3.5 h-3.5 text-amber-400" />
            <span>View 5 Milestones</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => navigateTo('financial-overview')}
            className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg transition flex items-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-3.5 h-3.5 text-stone-500" />
            <span>Financial Ledger</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Attachment 2 Verve inspired) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Overall Build Progress"
          value={`${project.overallProgressPercentage}%`}
          subValue={project.currentMilestoneName}
          icon={<HardHat className="w-5 h-5 text-amber-600" />}
          trend={{ positive: true, text: 'Stage 2 of 5 actively under construction' }}
          highlightColor="amber"
        />

        <MetricCard
          label="Estimated Handover"
          value={project.targetCompletionDate}
          subValue={`Began ${project.startDate}`}
          icon={<Calendar className="w-5 h-5 text-sky-600" />}
          trend={{ positive: true, text: 'On track for scheduled completion' }}
          highlightColor="blue"
        />

        <MetricCard
          label="Total Turnkey Budget"
          value={formatCurrency(project.totalBudgetNgn, currency)}
          subValue={`Land: ${formatCurrency(project.landBudgetNgn, currency)} · Build: ${formatCurrency(project.constructionBudgetNgn, currency)}`}
          icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
          trend={{ positive: true, text: `${formatCurrency(project.totalPaidNgn, currency)} total disbursed` }}
          highlightColor="emerald"
        />

        <MetricCard
          label="Lead Site Engineer"
          value={project.siteSupervisorName}
          subValue={project.siteSupervisorCredentials}
          icon={<ShieldCheck className="w-5 h-5 text-stone-600" />}
          trend={{ positive: true, text: `Last QA sign-off: ${project.lastInspectionDate}` }}
        />
      </div>

      {/* SEPARATE LAND & CONSTRUCTION BUDGET CALLOUT (Prompt 2 Requirement) */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Dedicated Land & Construction Budget Allocation</span>
            </h2>
            <p className="text-xs text-stone-500">
              Contractually separated accounts ensuring land ownership is perfected before physical residential construction commences.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 bg-white border border-stone-200 px-2.5 py-1 rounded-full self-start md:self-auto">
            Illustrative Figures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Land Budget Column */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                1. Land Acquisition Budget
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                100% Cleared & Vetted
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-neutral-900">
                {formatCurrency(project.landBudgetNgn, currency)}
              </span>
              <span className="text-xs text-stone-500">
                Paid: {formatCurrency(project.landPaidNgn, currency)}
              </span>
            </div>

            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-600 rounded-full w-full" />
            </div>

            <p className="text-xs text-stone-600">
              Registered FCDA Certificate of Occupancy (#AGIS-GZ-418). Land boundary perimeter beacon survey completed.
            </p>
          </div>

          {/* Construction Budget Column */}
          <div className="bg-white p-5 rounded-xl border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                2. Residential Construction Budget
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                52% Disbursed to Date
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-xl font-extrabold text-neutral-900">
                {formatCurrency(project.constructionBudgetNgn, currency)}
              </span>
              <span className="text-xs text-stone-500">
                Paid: {formatCurrency(project.constructionPaidNgn, currency)} · Rem: {formatCurrency(project.constructionRemainingNgn, currency)}
              </span>
            </div>

            <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full"
                style={{ width: `${Math.round((project.constructionPaidNgn / project.constructionBudgetNgn) * 100)}%` }}
              />
            </div>

            <p className="text-xs text-stone-600">
              Disbursed in escrow milestone tranches tied directly to COREN engineer lab sign-offs.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Stage Preview & Site Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Construction Status & 5-Milestone Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Milestone Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                  Active Construction Stage (Milestone 2 of 5)
                </span>
                <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
                  {project.currentMilestoneName}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded self-start sm:self-auto">
                80% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>Phase Completion</span>
                <span className="tabular-nums">80%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: '80%' }}
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Ground-floor reinforced columns and 9-inch solid sandcrete masonry completed. Cantilever formwork falsework staging inspected by structural consultants. Suspended deck pour staged for this week.
            </p>

            {/* Five Milestones Roadmap Mini-Bar */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-stone-700 block mb-2">
                Contractual 5-Stage Engineering Roadmap:
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center text-[10px]">
                {milestones.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2 rounded border ${
                      m.status === 'completed'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900 font-semibold'
                        : m.status === 'in_progress'
                        ? 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-500'
                    }`}
                  >
                    <div className="flex justify-center mb-0.5">
                      {m.status === 'completed' ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ) : m.status === 'in_progress' ? (
                        <Clock className="w-3 h-3 text-amber-600" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-stone-300 inline-block my-0.5" />
                      )}
                    </div>
                    <span className="truncate block font-medium">{m.name}</span>
                    <span className="text-[9px] text-stone-400 block">{m.progressPercentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-stone-100">
              <span className="text-stone-500">
                Last structural inspection: <strong>{project.lastInspectionDate}</strong>
              </span>
              <button
                onClick={() => navigateTo('construction-progress')}
                className="text-amber-800 font-semibold hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full 5-Stage Milestone Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Construction Site Visual Feed Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Site Visual Feed & Drone Log
                </h2>
                <p className="text-xs text-stone-500">
                  Captured: 22 October 2026 · Guzape Plot 418, Abuja
                </p>
              </div>
              <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded font-medium flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-stone-500" />
                <span>Inspection Photos Logged</span>
              </span>
            </div>

            <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-neutral-900">
              <img
                src={CONSTRUCTION_SITE_IMAGE}
                alt="Active residential construction site in Nigeria"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>SITE FEED · GPS 9.0234° N, 7.5189° E</span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-neutral-950/85 backdrop-blur-xs text-white p-3 rounded-lg text-xs flex items-center justify-between">
                <span>Surveyor tripod alignment & structural rebar staging verified.</span>
                <button
                  onClick={() => navigateTo('construction-progress')}
                  className="text-amber-400 font-semibold hover:text-amber-300 text-xs shrink-0 cursor-pointer"
                >
                  Full Inspection Log →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Verified Documents & Quick Contacts */}
        <div className="space-y-6">
          {/* Document Vault Placeholder */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-neutral-900">
                Diaspora Document Vault
              </h2>
              <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                All Verified
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">FCDA Certificate of Occupancy</p>
                    <p className="text-[11px] text-stone-500">Registered Title #AGIS-GZ-418</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-stone-400 hover:text-neutral-900 cursor-pointer" />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Approved Architectural Blueprints</p>
                    <p className="text-[11px] text-stone-500">12 Working Drawings (PDF)</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-stone-400 hover:text-neutral-900 cursor-pointer" />
              </div>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-neutral-900">Concrete Cube Strength Test Lab</p>
                    <p className="text-[11px] text-stone-500">Certified 34.2 N/mm²</p>
                  </div>
                </div>
                <Download className="w-4 h-4 text-stone-400 hover:text-neutral-900 cursor-pointer" />
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic">
              All legal and engineering documents are digitally notarized and stamped by COREN registered engineers.
            </p>
          </div>

          {/* Site Supervisor Card */}
          <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-neutral-900">
              Assigned Project Leadership
            </h2>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 text-amber-400 font-bold flex items-center justify-center text-sm shrink-0">
                BF
              </div>
              <div className="text-xs">
                <p className="font-bold text-neutral-900">{project.siteSupervisorName}</p>
                <p className="text-stone-500">{project.siteSupervisorCredentials}</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Nigeria Office: +234 1 892 4000</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Relationship Manager:</span>
                <strong className="text-neutral-900">{customer.relationshipManager}</strong>
              </div>
              <div className="flex justify-between">
                <span>Overseas Client Code:</span>
                <span className="font-mono text-neutral-900">{customer.clientCode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
