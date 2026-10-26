import React from 'react';
import { useApp } from '../context/AppContext';
import { PROPERTIES, DIASPORA_SERVICES, HERO_IMAGE } from '../data/mockData';
import { PropertyCard } from '../components/shared/PropertyCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import {
  ShieldCheck,
  ArrowRight,
  Video,
  FileCheck2,
  Building,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="space-y-16 pb-20">
      {/* Foundation State Notice */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <PlaceholderNotice
          screenNumber={1}
          screenName="Public Home Page"
          roleScope="Public Website"
          description="Serves as the primary brand showcase and value proposition for Wellsprings Property Development. Highlights institutional-grade title verification, bespoke construction management, and the remote diaspora experience."
          currentFoundationFeatures={[
            'Full architectural hero presentation and brand positioning',
            'Featured property cards with active currency switching',
            '4-stage diaspora transparent delivery methodology',
            'Direct access to property listings and simulated customer portal'
          ]}
          subsequentPromptRoadmap={[
            'Interactive land acquisition ROI & mortgage calculator for diaspora earners',
            'Interactive map integration for Lagos and Abuja master-planned developments',
            'Client testimonial video modal player and downloadable diaspora brochure'
          ]}
          nextSuggestedScreen={{ id: 'listings', label: '2. Property Listings' }}
        />
      </div>

      {/* Hero Section (Matching Attachment 1 Realest aesthetic) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-4 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-amber-800 uppercase bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Real Estate Partner for Nigerians in Diaspora</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 leading-tight">
            Building your home in Nigeria, with absolute certainty.
          </h1>

          <p className="text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Eliminate proxy risks, unverified titles, and stalled construction. We acquire authentic land and engineer bespoke residential properties in Lagos and Abuja while you track every milestone from anywhere in the world.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('listings')}
              className="px-6 py-3 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Explore Available Properties</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <button
              onClick={() => navigateTo('customer-dashboard')}
              className="px-6 py-3 text-sm font-semibold text-neutral-800 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <span>Preview Diaspora Tracking Portal</span>
            </button>
          </div>
        </div>

        {/* Hero Architectural Image Showcase */}
        <div className="relative rounded-2xl overflow-hidden aspect-16/9 w-full shadow-lg border border-stone-200/80 bg-neutral-900">
          <img
            src={HERO_IMAGE}
            alt="Wellsprings luxury architectural residence"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent flex items-end p-6 md:p-10">
            <div className="text-white max-w-xl">
              <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block mb-1">
                Completed Showpiece · Guzape Hills, Abuja
              </span>
              <p className="text-lg md:text-2xl font-bold">
                The Sovereign Villa — Delivered on time with zero physical client presence required in Nigeria.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Trust Pillars Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-900">Forensic Title Vetting</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Governor’s Consent & C of O verified at state registries.</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-900">Milestone-Based Escrow</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Funds released stage-by-stage only upon QA sign-off.</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
            <Video className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-900">Live Video Audits</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Bi-weekly 4K drone sweeps and live CCTV on site.</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-start gap-3">
            <Building className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-neutral-900">COREN Certified</p>
              <p className="text-[11px] text-stone-500 mt-0.5">Engineered to British BS & Nigerian building codes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
              Curated Opportunities
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              Featured Land & Residential Developments
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Prime developments across Lekki, Guzape Abuja, and the Ketu-Epe coastal growth corridor with registered titles.
            </p>
          </div>

          <button
            onClick={() => navigateTo('listings')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROPERTIES.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Diaspora Services (Clean Asymmetric List from Attachment 1 inspiration) */}
      <section className="bg-stone-100/70 border-y border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
              Our Core Services
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              A smooth, transparent journey from abroad
            </h2>
            <p className="text-sm text-stone-600 mt-2">
              Every detail handled with institutional engineering rigor from your first enquiry to final handover.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIASPORA_SERVICES.map((service) => (
              <div
                key={service.step}
                className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-xs flex items-start gap-4"
              >
                <span className="text-2xl font-extrabold text-amber-700/80 font-mono shrink-0">
                  {service.step}
                </span>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action for Customer Portal Demonstration */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-neutral-900 text-white rounded-2xl p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">
              Live Interactive Demonstration
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Experience the client milestone tracking portal
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Explore how an overseas client tracks Dr. Adeyemi’s active Guzape Villa construction in real-time — complete with engineering logs, photos, and stage escrow statements.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigateTo('customer-dashboard')}
              className="px-6 py-3 text-sm font-semibold text-neutral-950 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Customer Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('staff-management')}
              className="px-6 py-3 text-sm font-semibold text-stone-200 bg-neutral-800 border border-neutral-700 rounded-lg hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Staff Management View</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
