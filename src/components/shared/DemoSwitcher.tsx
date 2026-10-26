import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavScreen, PortalMode } from '../../types';
import { Compass, Eye, Shield, Users, Layers, ChevronDown, ChevronUp } from 'lucide-react';

interface ScreenOption {
  id: NavScreen;
  label: string;
  portal: PortalMode;
  number: number;
}

const SCREENS: ScreenOption[] = [
  { id: 'home', label: '1. Public Home Page', portal: 'public', number: 1 },
  { id: 'listings', label: '2. Property Listings', portal: 'public', number: 2 },
  { id: 'property-detail', label: '3. Property Details & Enquiry', portal: 'public', number: 3 },
  { id: 'customer-dashboard', label: '4. Customer Project Dashboard', portal: 'customer', number: 4 },
  { id: 'construction-progress', label: '5. Construction Progress', portal: 'customer', number: 5 },
  { id: 'financial-overview', label: '6. Financial Overview', portal: 'customer', number: 6 },
  { id: 'staff-management', label: '7. Staff Project Management', portal: 'staff', number: 7 },
];

export const DemoSwitcher: React.FC = () => {
  const { currentScreen, currentMode, navigateTo, switchMode, currency, setCurrency } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <div className="bg-neutral-900 text-stone-200 border-b border-neutral-800 text-xs sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Mode Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-semibold text-stone-300 uppercase tracking-wider text-[11px]">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Demo Navigator:</span>
          </div>

          <div className="inline-flex rounded-md p-0.5 bg-neutral-800 border border-neutral-700">
            <button
              onClick={() => switchMode('public')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap ${
                currentMode === 'public'
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Public Website
            </button>
            <button
              onClick={() => switchMode('customer')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentMode === 'customer'
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Users className="w-3 h-3" />
              <span>Customer Portal (Diaspora)</span>
            </button>
            <button
              onClick={() => switchMode('staff')}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                currentMode === 'staff'
                  ? 'bg-amber-500 text-neutral-950 font-semibold'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Shield className="w-3 h-3" />
              <span>Staff Management</span>
            </button>
          </div>
        </div>

        {/* Right: Currency & Collapse Controls */}
        <div className="flex items-center gap-3">
          {/* Currency Toggle */}
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <span>Currency:</span>
            <div className="inline-flex rounded bg-neutral-800 border border-neutral-700 p-0.5">
              {(['NGN', 'GBP', 'USD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                    currency === c ? 'bg-stone-200 text-neutral-950' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {c === 'NGN' ? '₦ NGN' : c === 'GBP' ? '£ GBP' : '$ USD'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-white px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 transition"
            title="Toggle Screen Quick-Selector"
          >
            <Layers className="w-3 h-3 text-amber-400" />
            <span className="hidden sm:inline">All 7 Foundation Screens</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Expandable 7-Screen Quick Nav Bar */}
      {isExpanded && (
        <div className="bg-neutral-950 border-t border-neutral-800/80 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] font-semibold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
              Jump To Screen:
            </span>
            {SCREENS.map((s) => {
              const isActive = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => navigateTo(s.id)}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? 'bg-amber-400/15 border-amber-400/60 text-amber-300 font-semibold shadow-xs'
                      : 'bg-neutral-900 border-neutral-800 text-stone-300 hover:border-neutral-700 hover:text-white'
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
