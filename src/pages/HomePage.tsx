import React from 'react';
import { useApp } from '../context/AppContext';
import {
  HERO_IMAGE,
  LEKKI_PROPERTY_IMAGE,
  ABUJA_PROPERTY_IMAGE,
  CONSTRUCTION_SITE_IMAGE,
  PROPERTIES,
} from '../data/mockData';
import { PropertyCard } from '../components/shared/PropertyCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Video,
  FileCheck,
  Building,
  Building2,
  HardHat,
  Eye,
  Award,
  Clock,
  Sparkles,
  PhoneCall,
  Lock,
  Layers,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, properties } = useApp();

  return (
    <div className="space-y-20 pb-24 bg-white text-neutral-900">
      {/* Foundation State Notice (Demo context preserved) */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <PlaceholderNotice
          screenNumber={1}
          screenName="Public Home Page (Redesigned to Fluxy Layout)"
          roleScope="Public Website"
          description="Redesigned to faithfully reflect the Fluxy Framer landing page layout — featuring centered value proposition, interactive floating mockup banner, accreditation badges, 3-column features, zig-zag split feature blocks, 2x2 transparency bento, Featured Land & Residential Developments portfolio cards, and final conversion CTA. Powered by the Manrope (Headings) and Inter (Body) font pairing."
          currentFoundationFeatures={[
            'Manrope & Inter typography hierarchy applied across headings and body',
            'Fluxy-style centered hero with floating status and milestone cards',
            'Accreditation logo strip (COREN, NIA, NIQS, FCDA, Lagos Lands)',
            '3-column feature cards with custom geometric icons',
            '3 alternating split-column capability deep dives with floating badges',
            '2x2 institutional safeguards bento grid',
            'Featured Land & Residential Developments showcase with multi-currency cards',
            'Pre-footer conversion block with direct navigation paths'
          ]}
          subsequentPromptRoadmap={[
            'Interactive land title verification search widget by Lagos/Abuja coordinate',
            'Real-time currency remittance FX calculator (GBP/USD to NGN)',
            'Video modal for drone inspection archives'
          ]}
          nextSuggestedScreen={{ id: 'listings', label: '2. Property Listings' }}
        />
      </div>

      {/* =========================================================================
          1. HERO SECTION (Fluxy Centered Layout + Floating Canvas)
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-6 pt-4">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 font-display leading-[1.12]">
          Building in Nigeria Made Certain
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Say goodbye to proxy fraud, stalled site work, and land title disputes.
          Institutional property acquisition and residential construction engineered
          for Nigerians in the diaspora.
        </p>

        {/* Primary CTA Button */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => navigateTo('listings')}
            className="px-6 py-3.5 text-sm font-semibold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-sm cursor-pointer group"
          >
            <span>Explore Developments</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={() => navigateTo('customer-dashboard')}
            className="px-6 py-3.5 text-sm font-semibold text-neutral-800 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>Preview Client Tracking Portal</span>
          </button>
        </div>

        {/* Centered Trust Checkmarks Strip */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-stone-600">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600 stroke-[2.5]" />
            <span>100% Verified C of O / Governor’s Consent</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600 stroke-[2.5]" />
            <span>Milestone Escrow Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-amber-600 stroke-[2.5]" />
            <span>Bi-Weekly 4K Drone Audits</span>
          </div>
        </div>

        {/* =========================================================================
            Wide Floating Graphic Showcase (Matching Fluxy Hero Canvas)
            ========================================================================= */}
        <div className="mt-12 relative rounded-2xl overflow-hidden border border-stone-200/90 shadow-xl bg-gradient-to-br from-amber-50/50 via-stone-100 to-amber-100/30 p-4 sm:p-8 md:p-12">
          {/* Subtle Background Architectural Render */}
          <div className="absolute inset-0 opacity-25 mix-blend-multiply overflow-hidden pointer-events-none">
            <img
              src={HERO_IMAGE}
              alt="Wellsprings luxury residence"
              className="w-full h-full object-cover filter blur-[1px]"
            />
          </div>

          {/* Central Composite Container */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-4xl mx-auto text-left">
            {/* Card 1: Live Site Engineer Update (Top Left) */}
            <div className="md:col-span-5 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs flex items-center justify-center">
                  BF
                </div>
                <div>
                  <p className="text-xs font-bold text-neutral-900 leading-none">
                    Engr. Babatunde Fashina
                  </p>
                  <p className="text-[10px] text-stone-500">COREN Lead · Guzape Site 418</p>
                </div>
                <span className="ml-auto text-[10px] text-stone-400">2 min ago</span>
              </div>
              <p className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100 italic leading-snug">
                "First-floor deck formwork cured and passed independent QA inspection. Ready for second pour on Wednesday."
              </p>
            </div>

            {/* Card 2: Interactive Milestone Checklist (Top Right) */}
            <div className="md:col-span-7 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-md flex flex-col justify-between">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <span className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Stage 03 Verification Checklist
                </span>
                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  75% Verified
                </span>
              </div>

              <div className="space-y-1.5 py-2 text-xs">
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    FCDA AGIS Title Deed Vetted
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">100%</span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Raft Foundation 28-day Crush Test (34.2 N/mm²)
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold font-mono">Certified</span>
                </div>
                <div className="flex items-center justify-between text-stone-700">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Suspended Floor Cantilever Reinforcement
                  </span>
                  <span className="text-[10px] text-amber-700 font-semibold font-mono">Active Pour</span>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span>London Client Portal Sync</span>
                <span className="text-amber-800 font-medium">Automatic bi-weekly update</span>
              </div>
            </div>

            {/* Card 3: Financial Milestone Summary (Bottom Left) */}
            <div className="md:col-span-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/80 shadow-md">
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-semibold block mb-1">
                Escrow Milestone Ledger
              </span>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-extrabold text-neutral-900 font-mono">
                    ₦292,500,000
                  </span>
                  <span className="text-xs text-stone-500 block">
                    (£146,250 equivalent disbursed across Tranches 1-3)
                  </span>
                </div>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  Reconciled
                </span>
              </div>
            </div>

            {/* Card 4: CCTV Telemetry Status (Bottom Right) */}
            <div className="md:col-span-6 bg-neutral-950 text-white p-4 rounded-xl border border-neutral-800 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <p className="text-xs font-bold font-mono">LIVE SITE CAMERA · GUZAPE</p>
                  <p className="text-[11px] text-stone-400">Stream available 24/7 on client portal</p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                View Cam →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ACCREDITATION & TRUST STRIP (Fluxy "Loved by world's best" row)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 text-center space-y-6 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-sans">
          Regulated, licensed, and accredited by premier professional bodies
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>COREN REGULATED</span>
          </div>

          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <Building2 className="w-5 h-5 text-amber-600" />
            <span>NIA ARCHITECTS</span>
          </div>

          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <FileCheck className="w-5 h-5 text-amber-600" />
            <span>NIQS SURVEYORS</span>
          </div>

          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <Award className="w-5 h-5 text-amber-600" />
            <span>FCDA CERTIFIED</span>
          </div>

          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <Lock className="w-5 h-5 text-amber-600" />
            <span>LAGOS LANDS BUREAU</span>
          </div>

          <div className="flex items-center gap-2 font-display font-bold text-sm text-neutral-800 tracking-tight">
            <Layers className="w-5 h-5 text-amber-600" />
            <span>BS 7671 COMPLIANT</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. "WHY WELLSPRINGS" 3-COLUMN FEATURE GRID (Fluxy 3-Col layout)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 text-center space-y-12 pt-8">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans">
            Why Wellsprings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
            All you need to build back home with absolute certainty
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto font-sans">
            Institutional property acquisition and bespoke construction built specifically
            to eliminate every pain point experienced by Nigerians abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Card 1 */}
          <div className="p-8 bg-stone-50/70 rounded-2xl border border-stone-200/90 flex flex-col items-center hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
              <ShieldCheck className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 font-display mb-2">
              Forensic Title Vetting
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Every parcel undergoes rigorous root-of-title searches at state land registries.
              We only develop land with registered Governor’s Consent or Certificate of Occupancy.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 bg-stone-50/70 rounded-2xl border border-stone-200/90 flex flex-col items-center hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
              <Building className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 font-display mb-2">
              Milestone-Based Escrow
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Never wire large lump sums upfront. Funds are held securely in milestone escrow
              and disbursed strictly after licensed COREN civil engineers verify stage completion.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 bg-stone-50/70 rounded-2xl border border-stone-200/90 flex flex-col items-center hover:bg-stone-50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center mb-5">
              <Video className="w-6 h-6 stroke-[1.75]" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 font-display mb-2">
              Live Remote Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Track your home build in real time from London, Atlanta, Toronto, or Dubai
              with bi-weekly 4K drone sweeps, live site CCTV, and digital lab test reports.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SPLIT FEATURE 1 (Fluxy "Build a website without building it yourself!")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans block">
              The Diaspora Construction Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight leading-tight">
              Build your dream home without living on the construction site yourself!
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              We eliminate the heartbreak of unreliable family proxies and abandoned building sites.
              From verified land acquisition in Lekki, Ikoyi, or Guzape to turn-key architectural
              finishes, Wellsprings acts as your fiduciary institutional developer.
            </p>

            {/* 2 Micro-Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-900 font-display">
                  100% Guaranteed Title Deeds
                </p>
                <p className="text-xs text-stone-500 font-sans">
                  Zero land grabber disputes or proxy litigation. Full legal indemnity.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-900 font-display">
                  14+ Active Developments
                </p>
                <p className="text-xs text-stone-500 font-sans">
                  Curated across Lagos and Abuja premier hillside and waterfront districts.
                </p>
              </div>
            </div>

            {/* Text Link with Arrow */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('listings')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer group"
              >
                <span>Explore Available Properties</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Image Right with Floating Client Badge */}
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
              <img
                src={LEKKI_PROPERTY_IMAGE}
                alt="Contemporary luxury villa in Lekki Lagos"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Client Badge Overlay (Matches Fluxy persona card) */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-xl max-w-xs text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-neutral-900 font-display">
                  Dr. Olanrewaju Adeyemi
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                  64% Built
                </span>
              </div>
              <p className="text-stone-500 text-[11px]">London, United Kingdom</p>
              <p className="text-[11px] text-stone-700 font-medium pt-1 border-t border-stone-100">
                5-Bedroom Guzape Hillside Villa · Stage 3 Superstructure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SPLIT FEATURE 2 (Fluxy "Grover increased sales revenue" - Image Left, Content Right)
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Left with Floating Strength Metric Badge */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
              <img
                src={CONSTRUCTION_SITE_IMAGE}
                alt="Construction engineering site supervision in Nigeria"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Metric Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-neutral-950 text-white p-4 rounded-xl border border-neutral-800 shadow-xl max-w-xs text-xs space-y-1">
              <span className="text-[10px] uppercase font-semibold text-amber-400 block tracking-wider">
                Independent QA Sign-Off
              </span>
              <p className="font-bold font-mono text-sm">
                Cube Strength: 34.2 N/mm²
              </p>
              <p className="text-[11px] text-stone-400">
                Exceeds British Standard BS 8110 specification. 28-day cure certified.
              </p>
            </div>
          </div>

          {/* Content Right */}
          <div className="space-y-6 order-1 lg:order-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans block">
              Independent Verification
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight leading-tight">
              Over 80 diaspora families completed their dream homes without a single proxy dispute.
            </h2>

            {/* Quote Block (Matches Fluxy quotation block) */}
            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 italic text-xs sm:text-sm text-stone-700 leading-relaxed space-y-2">
              <p>
                "We lost over $45,000 to family intermediaries before finding Wellsprings.
                With their milestone escrow and weekly drone logs, we built our 5-bedroom duplex
                in Abuja while working in Houston with total transparency."
              </p>
              <div className="not-italic text-xs font-bold text-neutral-900 pt-1 border-t border-stone-200/60 flex items-center justify-between">
                <span>Engr. Emeka Okonkwo</span>
                <span className="text-stone-500 font-normal">Houston, Texas, USA</span>
              </div>
            </div>

            {/* Link with Arrow */}
            <div className="pt-2">
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-800 hover:text-amber-950 transition-colors cursor-pointer group"
              >
                <span>Preview Live Customer Portal</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SPLIT FEATURE 3 (Fluxy "App is here to make life easier for you.")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content Left */}
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans block">
              Diaspora-Spec Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight leading-tight">
              Architecture designed for global standards, engineered for Nigerian resilience.
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-sans">
              We integrate 25kVA hybrid solar microgrids, independent borehole water purification,
              and British Standard BS 7671 wiring so your home stays powered and protected 24/7
              with zero reliance on municipal shortcomings.
            </p>

            {/* Primary Action Button */}
            <div>
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className="px-5 py-3 text-xs font-semibold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Launch Customer Demo</span>
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>

            {/* 2 Micro Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-900 font-display">
                  Zero Proxy Risk
                </p>
                <p className="text-xs text-stone-500 font-sans">
                  Direct contractual developer fiduciary accountability.
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-neutral-900 font-display">
                  Fixed-Price Guarantee
                </p>
                <p className="text-xs text-stone-500 font-sans">
                  Immune to local inflation or currency volatility once contracted.
                </p>
              </div>
            </div>
          </div>

          {/* Image Right with Floating Projected Handover Badge */}
          <div className="relative">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-stone-100">
              <img
                src={ABUJA_PROPERTY_IMAGE}
                alt="Contemporary residence in Guzape Hills Abuja"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Metric Card (Matches Fluxy "Projected Revenue $34.5k MRR" card) */}
            <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-xl max-w-xs text-xs space-y-1">
              <span className="text-[10px] uppercase font-semibold text-stone-400 block tracking-wider">
                Projected Handover
              </span>
              <p className="font-bold font-mono text-base text-neutral-900">
                February 2027 · On Schedule
              </p>
              <p className="text-[11px] text-stone-500">
                Updated: 22 October 2026 via Site Log #WSP-GZ04
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. 2x2 BENTO FEATURE GRID (Fluxy "Unlimited options give you flexibility")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 text-center space-y-10 py-10">
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans">
            Say Hello to Complete Transparency
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
            Institutional safeguards that give you complete certainty
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto font-sans">
            Every layer of the Wellsprings process is designed to eliminate ambiguity,
            proxy risk, and hidden costs for clients building from abroad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Card 1 */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display mb-1">
                100% Forensic Title Verification
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Every deed is vetted directly at Lagos Lands Bureau or AGIS Abuja. We guarantee
                genuine registered titles with zero legal encumbrances or family claims.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display mb-1">
                Stage-by-Stage Escrow Protection
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Funds are held in secure escrow tranches and disbursed strictly when certified
                engineering tests are approved by the independent supervising structural engineer.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display mb-1">
                COREN Licensed Resident Engineers
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Full-time resident civil and structural consultants oversee concrete cube testing,
                steel rebar tensile audits, and building code compliance at every pour.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 bg-white rounded-2xl border border-stone-200/90 shadow-xs flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-neutral-900 font-display mb-1">
                Multi-Currency Contract Pricing
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans">
                Contracts can be benchmarked in GBP, USD, or EUR. Once agreed, your turn-key
                residential contract is locked against Nigerian inflation and currency shocks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FEATURED LAND & RESIDENTIAL DEVELOPMENTS
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-6 py-6 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans block">
              Curated Diaspora Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight">
              Featured Land & Residential Developments
            </h2>
            <p className="text-sm text-stone-600 max-w-xl font-sans">
              Prime developments across Lekki, Guzape Abuja, and the Ketu-Epe coastal corridor with 100% verified registered titles.
            </p>
          </div>

          <button
            onClick={() => navigateTo('listings')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer group shadow-xs"
          >
            <span>View All Properties</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* =========================================================================
          9. PRE-FOOTER CONVERSION BLOCK (Fluxy "The ultimate theme" CTA)
          ========================================================================= */}
      <section className="max-w-5xl mx-auto px-6 text-center space-y-6 pt-6">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-700 font-sans block">
          Start Your Home Journey Today
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 font-display tracking-tight max-w-2xl mx-auto">
          The ultimate partner to help you build in Nigeria with confidence
        </h2>

        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-sans">
          Trusted by over 120 diaspora families in the UK, USA, Canada, and the UAE.
          Explore available land parcels, review villa blueprints, or schedule a consultation.
        </p>

        {/* Accreditation Logos */}
        <div className="py-4 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-stone-500 uppercase tracking-wider">
          <span>COREN Regulated</span>
          <span aria-hidden="true">·</span>
          <span>FCDA Certified</span>
          <span aria-hidden="true">·</span>
          <span>Lagos Lands Registry</span>
          <span aria-hidden="true">·</span>
          <span>British Standards</span>
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => navigateTo('listings')}
            className="px-8 py-4 text-sm font-semibold text-white bg-neutral-950 rounded-lg hover:bg-neutral-800 transition-colors inline-flex items-center gap-2 shadow-md cursor-pointer group"
          >
            <span>Explore Properties & Begin</span>
            <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};
