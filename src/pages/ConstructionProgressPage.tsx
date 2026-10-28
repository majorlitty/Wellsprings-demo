import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { CONSTRUCTION_SITE_IMAGE } from '../data/mockData';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency } from '../utils/formatters';
import {
  CheckCircle2,
  Clock,
  Circle,
  HardHat,
  FileCheck,
  Calendar,
  Sparkles,
  MapPin,
  ShieldCheck,
  ZoomIn,
  X,
} from 'lucide-react';

interface LightboxPhoto {
  url: string;
  caption: string;
  dateOrTimestamp: string;
  gpsLocation?: string;
  tags?: string[];
  milestoneTitle?: string;
}

export const ConstructionProgressPage: React.FC = () => {
  const { navigateTo, currency, project, milestones, progressUpdates } = useApp();
  const [filterPhase, setFilterPhase] = useState<'all' | 'completed' | 'in_progress' | 'upcoming'>('all');
  const [activeMilestoneId, setActiveMilestoneId] = useState<string>('ms-2-blockwork');
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<LightboxPhoto | null>(null);

  const closeLightbox = useCallback(() => {
    setActiveLightboxPhoto(null);
  }, []);

  // Keyboard accessibility (Escape key to close modal) & body scroll lock
  useEffect(() => {
    if (!activeLightboxPhoto) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [activeLightboxPhoto, closeLightbox]);

  const filteredMilestones = milestones.filter((m) => {
    if (filterPhase === 'all') return true;
    return m.status === filterPhase;
  });

  const activeMilestone =
    milestones.find((m) => m.id === activeMilestoneId) || milestones[1];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={5}
        screenName="Construction Progress"
        roleScope="Simulated Customer Portal"
        description="Chronological engineering milestones and verified site inspection logs for diaspora clients. Provides transparent proof of construction quality, material lab testing, and structural compliance before milestone payments are approved."
        currentFoundationFeatures={[
          'Complete 5-stage residential construction roadmap (Foundation, Blockwork, Roofing, Finishes, Completion)',
          'Detailed inspection log preview with COREN engineer certification notes & cube strength lab tests',
          'Dated construction progress updates with site photography and geotagged coordinate verification',
          'Interactive photo inspection lightbox modal with captions, timestamps, and full keyboard accessibility',
          'Illustrative disclaimer indicators preserving real-estate transparency'
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
            <span>Project: {project.projectCode}</span>
            <span aria-hidden="true">·</span>
            <span>{project.title}</span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              Illustrative Construction Data
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Construction Milestones & Site Verification
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Independent COREN engineering verification of every structural element before phase transition.
          </p>
        </div>

        {/* Milestone Filter Segmented Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1 p-1 bg-stone-100 rounded-lg border border-stone-200 text-xs self-start md:self-auto max-w-full overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilterPhase('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${
              filterPhase === 'all'
                ? 'bg-white text-neutral-900 font-semibold shadow-xs'
                : 'text-stone-600 hover:text-neutral-900'
            }`}
          >
            All 5 Stages
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
                        <span className="font-bold uppercase text-amber-800">{m.name}</span>
                      </div>

                      <h3 className="text-sm md:text-base font-bold text-neutral-900 leading-snug">
                        {m.title}
                      </h3>

                      <p className="text-xs text-stone-600 mt-1 line-clamp-2">
                        {m.phaseSummary}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-3 pt-2 border-t border-stone-100">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          {m.actualEndDate ? `Completed: ${m.actualEndDate}` : `Target: ${m.plannedEndDate}`}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] font-mono">
                          Allocated: {formatCurrency(m.allocatedConstructionBudgetNgn, currency)}
                        </span>
                        {m.engineerSignOff.certified && (
                          <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
                            <FileCheck className="w-3.5 h-3.5" />
                            COREN Certified
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
                      {m.progressPercentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane (5 Cols): Deep Inspection Audit */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Inspection Detail · Stage 0{activeMilestone.stepNumber}: {activeMilestone.name}
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
                Allocated Construction Budget: {formatCurrency(activeMilestone.allocatedConstructionBudgetNgn, currency)}
              </p>
            </div>

            {/* Engineering Deliverables List */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-stone-800 block">
                Contractual Engineering Deliverables:
              </span>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {activeMilestone.keyEngineeringDeliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COREN Engineer Sign-off card */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/90 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-stone-800">Lead Structural Sign-off:</span>
                <span className="font-semibold text-emerald-700">
                  {activeMilestone.engineerSignOff.certified ? 'Certified & Stamped' : 'Pending Stage Pour'}
                </span>
              </div>
              <p className="text-stone-600">
                {activeMilestone.engineerSignOff.engineerName} ({activeMilestone.engineerSignOff.corenRegistration})
              </p>
              {activeMilestone.engineerSignOff.cubeStrengthMpa && (
                <div className="flex items-center gap-2 pt-1 border-t border-stone-200 text-[11px] text-stone-500 font-mono">
                  <span>Lab Cube Crush:</span>
                  <strong className="text-neutral-900">{activeMilestone.engineerSignOff.cubeStrengthMpa} N/mm²</strong>
                  <span className="text-emerald-700 font-semibold">(BS EN 12390 Compliant)</span>
                </div>
              )}
            </div>

            {/* Inspection Media Preview (Clickable Thumbnail with Lightbox Trigger) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-800 block">
                  Site Verification Photography (GPS Geotagged)
                </span>
                <span className="text-[11px] text-amber-700 font-medium flex items-center gap-1">
                  <ZoomIn className="w-3 h-3" /> Click to enlarge
                </span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxPhoto({
                    url: CONSTRUCTION_SITE_IMAGE,
                    caption: `Site Verification Log · Stage 0${activeMilestone.stepNumber}: ${activeMilestone.name} (${activeMilestone.title})`,
                    dateOrTimestamp:
                      activeMilestone.actualEndDate ||
                      activeMilestone.actualStartDate ||
                      'October 2026',
                    gpsLocation: '9.0234° N, 7.5189° E · Guzape Hills, Abuja',
                    milestoneTitle: `Stage 0${activeMilestone.stepNumber}: ${activeMilestone.name}`,
                    tags: ['Site Verification', 'Structural Audit', 'GPS Geotagged'],
                  })
                }
                className="w-full text-left relative rounded-xl overflow-hidden aspect-16/9 bg-neutral-900 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 shadow-xs block"
                aria-label={`Enlarge site verification photo for Stage ${activeMilestone.stepNumber}`}
              >
                <img
                  src={CONSTRUCTION_SITE_IMAGE}
                  alt={`Site verification log for ${activeMilestone.name}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-950/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Click to enlarge photo</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-neutral-900/85 backdrop-blur-xs text-white p-2 rounded text-[11px] flex justify-between items-center">
                  <span className="flex items-center gap-1 truncate mr-2">
                    <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">9.0234° N, 7.5189° E · Guzape</span>
                  </span>
                  <span className="text-amber-400 font-mono text-[10px] shrink-0 font-bold">
                    SAMPLE LOG · EXPAND
                  </span>
                </div>
              </button>
            </div>

            {/* Verification status and Escrow Action */}
            <div className="pt-3 border-t border-stone-100 space-y-3">
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

      {/* DATED CONSTRUCTION PROGRESS UPDATES LOG SECTION */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <HardHat className="w-4 h-4 text-amber-600" />
              <span>Chronological Site Updates & Geotagged Photo References</span>
            </h2>
            <p className="text-xs text-stone-500">
              Bi-weekly engineering audit logs recorded directly from Plot 418, Guzape Hills, Abuja. Click any thumbnail to inspect high-resolution view.
            </p>
          </div>
          <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
            {progressUpdates.length} Verified Field Logs
          </span>
        </div>

        <div className="space-y-6">
          {progressUpdates.map((update) => (
            <div
              key={update.id}
              className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-neutral-900">{update.title}</span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {update.milestoneName}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {update.updateDate}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    <CheckCircle2 className="w-3 h-3" />
                    {update.qaStatus}
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">
                {update.narrative}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-stone-500 border-t border-stone-200/80">
                <span className="flex items-center gap-1 font-medium text-stone-700">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Auditor: {update.engineerName} ({update.engineerRole})</span>
                </span>
                <span className="text-stone-400">
                  Inspection Type: {update.inspectionType}
                </span>
              </div>

              {/* Photo References (Clickable Thumbnails) */}
              {update.photoReferences.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {update.photoReferences.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-white p-3 rounded-lg border border-stone-200 flex items-start gap-3 hover:border-amber-300 transition-colors group shadow-2xs"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveLightboxPhoto({
                            url: photo.url,
                            caption: photo.caption,
                            dateOrTimestamp: photo.timestamp,
                            gpsLocation: photo.gpsLocation,
                            milestoneTitle: `${update.milestoneName} · ${update.title}`,
                            tags: photo.tags,
                          })
                        }
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-neutral-900 shrink-0 overflow-hidden relative cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-amber-500 block"
                        aria-label={`Enlarge photo: ${photo.caption}`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-neutral-900/20 group-hover:bg-neutral-900/0 transition-colors flex items-center justify-center">
                          <div className="w-6 h-6 rounded-full bg-neutral-950/75 text-white flex items-center justify-center opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all">
                            <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                        </div>
                      </button>

                      <div className="text-xs space-y-1.5 flex-1 min-w-0">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveLightboxPhoto({
                              url: photo.url,
                              caption: photo.caption,
                              dateOrTimestamp: photo.timestamp,
                              gpsLocation: photo.gpsLocation,
                              milestoneTitle: `${update.milestoneName} · ${update.title}`,
                              tags: photo.tags,
                            })
                          }
                          className="text-left font-semibold text-neutral-900 leading-snug hover:text-amber-700 cursor-pointer transition-colors line-clamp-2 block focus:outline-hidden"
                        >
                          {photo.caption}
                        </button>
                        <p className="font-mono text-[10px] text-stone-400 flex flex-wrap items-center gap-1.5">
                          <span>{photo.gpsLocation}</span>
                          <span aria-hidden="true">·</span>
                          <span>{photo.timestamp}</span>
                        </p>
                        <div className="flex flex-wrap gap-1 items-center pt-0.5">
                          {photo.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[9px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded font-mono"
                            >
                              #{t}
                            </span>
                          ))}
                          <button
                            type="button"
                            onClick={() =>
                              setActiveLightboxPhoto({
                                url: photo.url,
                                caption: photo.caption,
                                dateOrTimestamp: photo.timestamp,
                                gpsLocation: photo.gpsLocation,
                                milestoneTitle: `${update.milestoneName} · ${update.title}`,
                                tags: photo.tags,
                              })
                            }
                            className="text-[10px] font-semibold text-amber-800 hover:text-amber-950 hover:underline flex items-center gap-0.5 ml-auto cursor-pointer"
                          >
                            <ZoomIn className="w-3 h-3 text-amber-600" /> View larger
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          LIGHTBOX / MODAL FOR HIGH-RESOLUTION PHOTO INSPECTION
          ========================================================================= */}
      {activeLightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Construction Photo Lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-stone-200 bg-stone-50">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 border border-amber-200">
                  <Sparkles className="w-3 h-3 text-amber-700 shrink-0" />
                  <span>Illustrative Sample Data</span>
                </span>
                {activeLightboxPhoto.milestoneTitle && (
                  <span className="text-xs text-stone-500 font-medium hidden sm:inline">
                    · {activeLightboxPhoto.milestoneTitle}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                className="p-1.5 rounded-lg text-stone-500 hover:text-neutral-900 hover:bg-stone-200 transition cursor-pointer flex items-center gap-1 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                aria-label="Close photo view"
              >
                <span className="hidden sm:inline">Close (Esc)</span>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div className="bg-neutral-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden relative min-h-[240px] max-h-[60vh] sm:max-h-[64vh]">
              <img
                src={activeLightboxPhoto.url}
                alt={activeLightboxPhoto.caption}
                referrerPolicy="no-referrer"
                className="max-h-[56vh] sm:max-h-[60vh] w-auto max-w-full object-contain rounded shadow-lg"
              />
              <div className="absolute bottom-3 right-3 bg-neutral-900/85 backdrop-blur-xs text-amber-400 font-mono text-[10px] px-2.5 py-1 rounded border border-neutral-700 pointer-events-none">
                Simulated Demonstration Photograph
              </div>
            </div>

            {/* Lightbox Details / Caption Footer */}
            <div className="p-4 sm:p-6 bg-white space-y-3 overflow-y-auto">
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 font-display leading-snug">
                  {activeLightboxPhoto.caption}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-stone-600">
                  <span className="flex items-center gap-1.5 font-mono font-medium text-stone-700">
                    <Calendar className="w-3.5 h-3.5 text-stone-400" />
                    {activeLightboxPhoto.dateOrTimestamp}
                  </span>
                  {activeLightboxPhoto.gpsLocation && (
                    <>
                      <span aria-hidden="true" className="text-stone-300">·</span>
                      <span className="flex items-center gap-1.5 font-mono text-stone-600">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        {activeLightboxPhoto.gpsLocation}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {activeLightboxPhoto.tags && activeLightboxPhoto.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-xs text-stone-400 font-medium mr-1">Tags:</span>
                  {activeLightboxPhoto.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md font-mono border border-stone-200"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="italic">
                  Tip: Press <kbd className="px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded text-[11px] font-mono">Esc</kbd> or click outside to close
                </span>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold rounded-lg text-xs transition cursor-pointer min-h-[36px]"
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
