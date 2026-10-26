import React from 'react';
import { useApp } from '../../context/AppContext';
import { Building2, ArrowUpRight, User, ShieldCheck } from 'lucide-react';

export const TopBar: React.FC = () => {
  const { currentScreen, currentMode, navigateTo, switchMode } = useApp();

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-[72px] sm:top-[68px] z-40">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element in display face, no subtext pill) */}
        <button
          onClick={() => navigateTo('home')}
          className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer"
        >
          Wellsprings
        </button>

        {/* Zone 2: Navigation Links (4-5 concise single-line text links with subtle hover underlines) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {currentMode === 'public' && (
            <>
              <button
                onClick={() => navigateTo('home')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'home'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => navigateTo('listings')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'listings' || currentScreen === 'property-detail'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Diaspora Process
              </button>
              <button
                onClick={() => navigateTo('staff-management')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Developer Quality
              </button>
            </>
          )}

          {currentMode === 'customer' && (
            <>
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'customer-dashboard'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Project Hub
              </button>
              <button
                onClick={() => navigateTo('construction-progress')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'construction-progress'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Milestones & Site Logs
              </button>
              <button
                onClick={() => navigateTo('financial-overview')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'financial-overview'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Financial Ledger
              </button>
              <button
                onClick={() => navigateTo('home')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer text-stone-400"
              >
                Public Site
              </button>
            </>
          )}

          {currentMode === 'staff' && (
            <>
              <button
                onClick={() => navigateTo('staff-management')}
                className="text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Staff Portfolio
              </button>
              <button
                onClick={() => navigateTo('customer-dashboard')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Client Preview
              </button>
              <button
                onClick={() => navigateTo('construction-progress')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Site Inspections
              </button>
              <button
                onClick={() => navigateTo('financial-overview')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Escrow Reconciliation
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: 1 Primary Action (Single-line control) */}
        <div className="flex items-center gap-3 shrink-0">
          {currentMode === 'public' && (
            <button
              onClick={() => switchMode('customer')}
              className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <User className="w-4 h-4 text-amber-400" />
              <span>Customer Portal</span>
            </button>
          )}

          {currentMode === 'customer' && (
            <button
              onClick={() => navigateTo('construction-progress')}
              className="px-4 py-2 text-xs md:text-sm font-semibold text-neutral-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>View Site Progress</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}

          {currentMode === 'staff' && (
            <button
              onClick={() => switchMode('public')}
              className="px-4 py-2 text-xs md:text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-stone-500" />
              <span>Exit to Public</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
