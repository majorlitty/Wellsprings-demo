import React, { useState } from 'react';
import { Layers, CheckCircle2, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavScreen } from '../../types';

interface PlaceholderNoticeProps {
  screenNumber: number;
  screenName: string;
  roleScope: 'Public Website' | 'Simulated Customer Portal' | 'Simulated Staff Interface';
  description: string;
  currentFoundationFeatures: string[];
  subsequentPromptRoadmap: string[];
  nextSuggestedScreen?: { id: NavScreen; label: string };
}

export const PlaceholderNotice: React.FC<PlaceholderNoticeProps> = ({
  screenNumber,
  screenName,
  roleScope,
  description,
  currentFoundationFeatures,
  subsequentPromptRoadmap,
  nextSuggestedScreen,
}) => {
  const { navigateTo } = useApp();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-stone-100/90 border border-stone-200/90 rounded-xl p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 text-neutral-800 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200">
        <div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Screen 0{screenNumber} of 07</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span className="text-stone-500 font-normal">{roleScope}</span>
          </div>
          <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-neutral-900 font-display">
            {screenName}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {nextSuggestedScreen && (
            <button
              onClick={() => navigateTo(nextSuggestedScreen.id)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors whitespace-nowrap cursor-pointer shadow-2xs"
            >
              <span className="hidden sm:inline">Next Demo Screen:</span>
              <span>{nextSuggestedScreen.label}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:text-neutral-900 bg-stone-200/70 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'Less' : 'Details'}</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-stone-600 mt-2.5 leading-relaxed font-sans">
        {description}
      </p>

      {/* Expandable Details on Mobile/Tablet */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 pt-3 border-t border-stone-200/60 text-xs animate-in fade-in duration-150">
          <div>
            <span className="font-semibold text-stone-800 block mb-1.5">
              Established In This Foundation:
            </span>
            <ul className="space-y-1 text-stone-600">
              {currentFoundationFeatures.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-stone-800 block mb-1.5">
              Prepared For Subsequent Phase Expansion:
            </span>
            <ul className="space-y-1 text-stone-500">
              {subsequentPromptRoadmap.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-600 font-bold shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
