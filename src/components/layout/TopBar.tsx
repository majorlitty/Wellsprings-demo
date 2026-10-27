import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  ArrowUpRight,
  User,
  ShieldCheck,
  Menu,
  X,
  Compass,
  CreditCard,
  HardHat,
  Layers,
  ChevronRight,
} from 'lucide-react';

export const TopBar: React.FC = () => {
  const { currentScreen, currentMode, navigateTo, switchMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (screen: any) => {
    navigateTo(screen);
    setMobileMenuOpen(false);
  };

  const handleModeSwitch = (mode: any) => {
    switchMode(mode);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 text-left cursor-pointer font-display"
        >
          Wellsprings
        </button>

        {/* Zone 2: Desktop Navigation Links (hidden on mobile/tablet) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600 font-sans">
          {currentMode === 'public' && (
            <>
              <button
                onClick={() => handleNav('home')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'home'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => handleNav('listings')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'listings' || currentScreen === 'property-detail'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Properties
              </button>
              <button
                onClick={() => handleNav('customer-dashboard')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Diaspora Process
              </button>
              <button
                onClick={() => handleNav('staff-management')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Developer Quality
              </button>
            </>
          )}

          {currentMode === 'customer' && (
            <>
              <button
                onClick={() => handleNav('customer-dashboard')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'customer-dashboard'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Project Hub
              </button>
              <button
                onClick={() => handleNav('construction-progress')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'construction-progress'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Milestones & Site Logs
              </button>
              <button
                onClick={() => handleNav('financial-overview')}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer ${
                  currentScreen === 'financial-overview'
                    ? 'text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600'
                    : ''
                }`}
              >
                Financial Ledger
              </button>
              <button
                onClick={() => handleNav('home')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer text-stone-400"
              >
                Public Site
              </button>
            </>
          )}

          {currentMode === 'staff' && (
            <>
              <button
                onClick={() => handleNav('staff-management')}
                className="text-neutral-900 font-semibold underline underline-offset-8 decoration-2 decoration-amber-600 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Staff Portfolio
              </button>
              <button
                onClick={() => handleNav('customer-dashboard')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Client Preview
              </button>
              <button
                onClick={() => handleNav('construction-progress')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Site Inspections
              </button>
              <button
                onClick={() => handleNav('financial-overview')}
                className="transition-colors whitespace-nowrap shrink-0 hover:text-neutral-900 cursor-pointer"
              >
                Escrow Reconciliation
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Primary Action & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {currentMode === 'public' && (
            <button
              onClick={() => handleModeSwitch('customer')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="hidden xs:inline">Customer Portal</span>
              <span className="xs:hidden">Portal</span>
            </button>
          )}

          {currentMode === 'customer' && (
            <button
              onClick={() => handleNav('construction-progress')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-neutral-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>Site Progress</span>
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          )}

          {currentMode === 'staff' && (
            <button
              onClick={() => handleModeSwitch('public')}
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-stone-700 bg-stone-100 rounded-lg hover:bg-stone-200 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-500" />
              <span>Public</span>
            </button>
          )}

          {/* Hamburger Menu Toggle (Mobile & Tablet) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-stone-600 hover:text-neutral-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 py-4 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1 text-sm font-medium text-stone-700">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-2 mb-2">
              Navigation Menu
            </span>

            {currentMode === 'public' && (
              <>
                <button
                  onClick={() => handleNav('home')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'home'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>1. Public Overview</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => handleNav('listings')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'listings'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>2. Property Listings</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => handleNav('property-detail')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'property-detail'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>3. Property Details & Enquiry</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </>
            )}

            {currentMode === 'customer' && (
              <>
                <button
                  onClick={() => handleNav('customer-dashboard')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'customer-dashboard'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>4. Customer Dashboard</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => handleNav('construction-progress')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'construction-progress'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>5. Construction Milestones</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => handleNav('financial-overview')}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition flex items-center justify-between ${
                    currentScreen === 'financial-overview'
                      ? 'bg-amber-50 text-amber-950 font-bold'
                      : 'hover:bg-stone-50 text-stone-700'
                  }`}
                >
                  <span>6. Financial Ledger & Escrow</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </>
            )}

            {currentMode === 'staff' && (
              <>
                <button
                  onClick={() => handleNav('staff-management')}
                  className="w-full text-left px-3 py-2.5 rounded-lg bg-amber-50 text-amber-950 font-bold flex items-center justify-between"
                >
                  <span>7. Staff Project Management</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </button>
              </>
            )}
          </div>

          {/* Quick Portal Switcher inside Mobile Menu */}
          <div className="pt-3 border-t border-stone-200">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block px-2 mb-2">
              Switch Application Portal
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => handleModeSwitch('public')}
                className={`py-2 px-2 rounded-lg font-medium text-center border ${
                  currentMode === 'public'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                Public Site
              </button>
              <button
                onClick={() => handleModeSwitch('customer')}
                className={`py-2 px-2 rounded-lg font-medium text-center border ${
                  currentMode === 'customer'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                Customer
              </button>
              <button
                onClick={() => handleModeSwitch('staff')}
                className={`py-2 px-2 rounded-lg font-medium text-center border ${
                  currentMode === 'staff'
                    ? 'bg-neutral-900 text-white border-neutral-900'
                    : 'bg-stone-50 border-stone-200 text-stone-700'
                }`}
              >
                Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
