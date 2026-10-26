import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
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

  return (
    <div className="bg-stone-100/80 border border-stone-200/90 rounded-xl p-5 md:p-6 mb-8 text-neutral-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-amber-700" />
            <span>Screen 0{screenNumber} of 07 Foundation</span>
            <span aria-hidden="true">·</span>
            <span className="text-stone-500 font-normal">{roleScope}</span>
          </div>
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-neutral-900">
            {screenName}
          </h2>
        </div>

        {nextSuggestedScreen && (
          <button
            onClick={() => navigateTo(nextSuggestedScreen.id)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors whitespace-nowrap self-start md:self-auto cursor-pointer"
          >
            <span>Next Demo Screen: {nextSuggestedScreen.label}</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
          </button>
        )}
      </div>

      <p className="text-xs md:text-sm text-stone-600 mt-3 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pt-3 border-t border-stone-200/60 text-xs">
        <div>
          <span className="font-semibold text-stone-800 block mb-2">
            Established In This Foundation:
          </span>
          <ul className="space-y-1.5 text-stone-600">
            {currentFoundationFeatures.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="font-semibold text-stone-800 block mb-2">
            Prepared For Subsequent Phase Expansion:
          </span>
          <ul className="space-y-1.5 text-stone-500">
            {subsequentPromptRoadmap.map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <span className="text-amber-600 font-bold">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
