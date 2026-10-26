import React from 'react';
import { useApp } from '../context/AppContext';
import { CURRENT_CUSTOMER_PROJECT, CONSTRUCTION_SITE_IMAGE } from '../data/mockData';
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
} from 'lucide-react';

export const CustomerDashboardPage: React.FC = () => {
  const { navigateTo, currency } = useApp();
  const project = CURRENT_CUSTOMER_PROJECT;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={4}
        screenName="Customer Project Dashboard"
        roleScope="Simulated Customer Portal"
        description="The central command hub for overseas diaspora clients. Displays active residential construction status, overall engineering progress, site supervision details, and quick links to granular milestone logs and financial escrow statements."
        currentFoundationFeatures={[
          'Simulated diaspora client session (Dr. & Mrs. Adeyemi, London UK)',
          'High-level KPI metrics modeled after modern dashboard architecture',
          'Live project progress bar and site supervisor identity',
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
            <span className="font-semibold text-neutral-900">{project.clientName}</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-600">{project.clientLocation}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-stone-400">Ref: {project.projectCode}</span>
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
            <span>View Site Milestones</span>
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
          value={`${project.overallProgress}%`}
          subValue="Phase 3 of 7 in progress"
          icon={<HardHat className="w-5 h-5 text-amber-600" />}
          trend={{ positive: true, text: '4 days ahead of scheduled timeline' }}
          highlightColor="amber"
        />

        <MetricCard
          label="Estimated Handover"
          value="Feb 2027"
          subValue={`Began ${project.startDate}`}
          icon={<Calendar className="w-5 h-5 text-sky-600" />}
          trend={{ positive: true, text: 'On track for Q1 2027 completion' }}
          highlightColor="blue"
        />

        <MetricCard
          label="Disbursed to Escrow"
          value={formatCurrency(project.paidToDateNgn, currency)}
          subValue={`Total Contract: ${formatCurrency(project.totalBudgetNgn, currency)}`}
          icon={<CreditCard className="w-5 h-5 text-emerald-600" />}
          trend={{ positive: true, text: 'Tranches 1, 2, & 3 certified' }}
          highlightColor="emerald"
        />

        <MetricCard
          label="Lead Site Engineer"
          value="Engr. Fashina"
          subValue="COREN Reg. #31821"
          icon={<ShieldCheck className="w-5 h-5 text-stone-600" />}
          trend={{ positive: true, text: `Last QA sign-off: ${project.lastInspectionDate}` }}
        />
      </div>

      {/* Main Grid: Active Stage Preview & Site Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Live Construction Status & Milestone Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Milestone Card */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800">
                  Active Construction Stage
                </span>
                <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
                  {project.currentMilestoneStage}
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded self-start sm:self-auto">
                75% Complete
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-stone-500 font-medium">
                <span>Phase Progress</span>
                <span className="tabular-nums">75%</span>
              </div>
              <div className="h-2.5 w-full bg-stone-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Formwork for the suspended first-floor terrace has been inspected and approved by structural consultants. The second pour is staged for this week under Engr. Fashina's direct supervision.
            </p>

            <div className="pt-2 flex items-center justify-between text-xs">
              <span className="text-stone-500">
                Next inspection audit: <strong>29 October 2026</strong>
              </span>
              <button
                onClick={() => navigateTo('construction-progress')}
                className="text-amber-800 font-semibold hover:text-amber-900 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full 7-Stage Milestone Log</span>
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
                  Captured: 22 October 2026 · Guzape Plot 418
                </p>
              </div>
              <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded font-medium flex items-center gap-1">
                <Video className="w-3.5 h-3.5 text-stone-500" />
                <span>24 Inspection Photos</span>
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
                <span>CCTV SITE FEED #01 · VERIFIED ACTIVE</span>
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
                <p className="font-bold text-neutral-900">{project.siteSupervisor}</p>
                <p className="text-stone-500">Lead Project Structural Engineer</p>
                <p className="text-[11px] text-stone-400 mt-0.5">Nigeria Office: +234 1 892 4000</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/80 text-xs text-stone-600 space-y-1.5">
              <div className="flex justify-between">
                <span>Next Video Walkthrough:</span>
                <strong className="text-neutral-900">Thursday 14:00 GMT</strong>
              </div>
              <div className="flex justify-between">
                <span>Diaspora Account Exec:</span>
                <span className="text-neutral-900">Tola Adebayo (London)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
