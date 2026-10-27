import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, MapPin, Phone, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-neutral-900 text-stone-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-neutral-800">
          {/* Brand & Mission */}
          <div className="md:col-span-1 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              Wellsprings
            </span>
            <p className="text-xs text-stone-400 leading-relaxed">
              Institutional-grade property development and residential construction in Nigeria, built specifically for the Nigerian diaspora with absolute title certainty and stage-by-stage escrow protection.
            </p>
            <div className="pt-2 text-[11px] text-stone-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Registered with Nigerian Institute of Quantity Surveyors & COREN certified engineering.</span>
            </div>
          </div>

          {/* Navigation Paths - Public */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Public Real Estate
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('home')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  1. Public Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('listings')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  2. Property Listings
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('property-detail')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  3. Property Details & Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation Paths - Portals */}
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Diaspora & Staff Portals
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigateTo('customer-dashboard')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  4. Customer Project Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('construction-progress')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  5. Construction Progress
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('financial-overview')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  6. Financial Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('staff-management')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  7. Staff Project Management
                </button>
              </li>
            </ul>
          </div>

          {/* Offices */}
          <div className="space-y-3 text-xs">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-200">
              Offices & Diaspora Desk
            </p>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Nigeria HQ:</strong> Plot 12, Waterfront Boulevard, Victoria Island, Lagos
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>UK Desk:</strong> Level 18, 40 Bank Street, Canary Wharf, London E14 5NR
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>diaspora@wellspringsdevelopment.ng</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} Wellsprings Property Development Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-6 text-center">
            <span className="hover:text-stone-300">Title Due Diligence Guarantee</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300">Milestone Escrow Policy</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-stone-300">Privacy Notice</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
