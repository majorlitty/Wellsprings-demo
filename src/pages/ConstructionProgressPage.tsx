import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PROJECT_MILESTONES, CURRENT_CUSTOMER_PROJECT, CONSTRUCTION_SITE_IMAGE } from '../data/mockData';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import {
  CheckCircle2,
  Clock,
  Circle,
  HardHat,
  Camera,
  FileCheck,
  Calendar,
  UserCheck,
  ChevronRight,
  Filter,
} from 'lucide-react';

export const ConstructionProgressPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [filterPhase, setFilterPhase] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('m-3');

  const filteredMilestones = PROJECT_MILESTONES.filter((m) => {
    if (filterPhase === 'all') return true;
    return m.status === filterPhase;
  });

  const activeMilestone =
    PROJECT_MILESTONES.find((m) => m.id === activeMilestoneId) || PROJECT_MILESTONES[2];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={5}
        screenName="Construction Progress"
        roleScope="Simulated Customer Portal"
        description="Chronological engineering milestones and verified site inspection logs for diaspora clients. Provides transparent proof of construction quality, material lab testing, and structural compliance before milestone payments are approved."
        currentFoundationFeatures={[
          'Complete 7-stage residential construction roadmap with status indicators',
          'Detailed inspection log preview with COREN engineer certification notes',
          'Interactive milestone filter controls (Completed, In Progress, Upcoming)',
          'High-resolution site inspection visual assets'
        ]}
        subsequentPromptRoadmap={[
          'Client milestone sign-off and digital approval signature flow',
          'Interactive 360-degree panoramic virtual inspection viewer',
          'Granular weather condition and daily concrete pour quality telemetry'
        ]}
        nextSuggestedScreen={{ id: 'financial-overview', label: '6. Financial Overview' }}
      />

      {/* Header and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>Project: {CURRENT_CUSTOMER_PROJECT.projectCode}</span>
            <span aria-hidden="true">·</span>
            <span>{CURRENT_CUSTOMER_PROJECT.title}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Construction Milestones & Site Verification
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Independent COREN engineering verification of every structural element before phase transition.
          </p>
        </div>

        {/* Milestone Filter Segmented Buttons */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs self-start md:self-auto">
          <button
            onClick={() => setFilterPhase('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              filterPhase === 'all'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            All 7 Stages
          </button>
          <button
            onClick={() => setFilterPhase('completed')}
            className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              filterPhase === 'completed'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilterPhase('in_progress')}
            className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              filterPhase === 'in_progress'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterPhase('upcoming')}
            className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              filterPhase === 'upcoming'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      {/* Main Split: Milestone List (Left) & Active Milestone Inspector Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left List (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          {filteredMilestones.map((m) => {
            const isSelected = m.id === activeMilestoneId;

            return (
              <div
                key={m.id}
                onClick={() => setActiveMilestoneId(m.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-amber-500 ring-2 ring-amber-500/10 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Status Icon */}
                    <div className="mt-0.5 shrink-0">
                      {m.status === 'completed' && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      )}
                      {m.status === 'in_progress' && (
                        <Clock className="w-5 h-5 text-amber-600 animate-pulse" />
                      )}
                      {m.status === 'upcoming' && (
                        <Circle className="w-5 h-5 text-stone-300" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mb-0.5">
                        <span className="font-semibold text-stone-700">Stage 0{m.stepNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{m.phase}</span>
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-neutral-900 leading-snug">
                        {m.title}
                      </h3>

                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {m.summary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-3 pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          {m.completionDate ? `Completed: ${m.completionDate}` : `Target: ${m.targetDate}`}
                        </span>
                        {m.photosCount > 0 && (
                          <span className="flex items-center gap-1 text-[11px]">
                            <Camera className="w-3.5 h-3.5 text-stone-400" />
                            {m.photosCount} Site Photos
                          </span>
                        )}
                        {m.inspectorApproved && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <FileCheck className="w-3.5 h-3.5" />
                            Engineer Certified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Percentage Pill */}
                  <div className="text-right shrink-0">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded tabular-nums ${
                        m.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-800'
                          : m.status === 'in_progress'
                          ? 'bg-amber-50 text-amber-800'
                          : 'bg-stone-100 text-stone-500'
                      }`}
                    >
                      {m.completionPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane (5 Cols): Deep Inspection Audit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Inspection Detail · Stage 0{activeMilestone.stepNumber}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  activeMilestone.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-900'
                    : activeMilestone.status === 'in_progress'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-stone-100 text-stone-600'
                }`}
              >
                {activeMilestone.status === 'completed'
                  ? 'Stage Completed'
                  : activeMilestone.status === 'in_progress'
                  ? 'Active Construction'
                  : 'Pending Preceding Stage'}
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                {activeMilestone.title}
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Assigned: {activeMilestone.siteEngineer}
              </p>
            </div>

            {/* Engineer Log Box */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/90 text-xs space-y-2">
              <span className="font-semibold text-stone-800 block">
                Latest Field Inspection Log:
              </span>
              <p className="text-stone-600 leading-relaxed italic">
                "{activeMilestone.recentLog}"
              </p>
            </div>

            {/* Inspection Media Preview */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-800 block">
                Site Verification Photography ({activeMilestone.photosCount} photos logged)
              </span>
              <div className="relative rounded-xl overflow-hidden aspect-16/9 bg-neutral-900">
                <img
                  src={CONSTRUCTION_SITE_IMAGE}
                  alt="Site verification log"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-neutral-900/80 backdrop-blur-xs text-white p-2 rounded text-[11px] flex justify-between items-center">
                  <span>GPS: 9.0234° N, 7.5189° E · Guzape</span>
                  <span className="text-amber-400 font-mono">TS: 22-OCT-2026</span>
                </div>
              </div>
            </div>

            {/* Verification status and Escrow Action */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500">Milestone QA Approval:</span>
                <span className="font-semibold text-emerald-700">
                  {activeMilestone.inspectorApproved ? 'Approved by COREN Consultant' : 'Pending Stage Pour'}
                </span>
              </div>

              <button
                onClick={() => navigateTo('financial-overview')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-neutral-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition text-center block cursor-pointer"
              >
                View Milestone Escrow Tranche in Financial Ledger →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
