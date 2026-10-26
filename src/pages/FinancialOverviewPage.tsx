import React from 'react';
import { useApp } from '../context/AppContext';
import { FINANCIAL_MILESTONES, CURRENT_CUSTOMER_PROJECT } from '../data/mockData';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency, formatSpecificCurrency } from '../utils/formatters';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  FileText,
  DollarSign,
  Building,
  HelpCircle,
} from 'lucide-react';

export const FinancialOverviewPage: React.FC = () => {
  const { currency, navigateTo } = useApp();
  const project = CURRENT_CUSTOMER_PROJECT;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={6}
        screenName="Financial Overview"
        roleScope="Simulated Customer Portal"
        description="Comprehensive milestone payment schedule and diaspora foreign exchange tracking. Built around Wellsprings' escrow policy — funds are held securely and only disbursed to contractors when physical construction passes stage engineering sign-off."
        currentFoundationFeatures={[
          'Detailed milestone disbursement ledger with tabular figures and invoice references',
          'Multi-currency benchmark comparisons (NGN, GBP, USD) for international budgeting',
          'Status badges for certified payments, active tranches due, and upcoming escrow holds',
          'Direct links to Construction Progress (Screen 5) and Customer Dashboard (Screen 4)'
        ]}
        subsequentPromptRoadmap={[
          'Integrated UK/US direct wire & FX settlement routing portal',
          'Downloadable VAT-compliant milestone invoices and digital bank receipts',
          'Escrow milestone release digital authorization signature pad'
        ]}
        nextSuggestedScreen={{ id: 'staff-management', label: '7. Staff Project Management' }}
      />

      {/* Header and Project Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>Client Ledger: {project.clientName}</span>
            <span aria-hidden="true">·</span>
            <span>{project.projectCode}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Financial Ledger & Milestone Escrow
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Contractual milestone structure protecting overseas capital with independent engineering checks.
          </p>
        </div>

        {/* Currency reminder */}
        <div className="text-xs text-stone-500 bg-stone-100 px-3 py-2 rounded-lg border border-stone-200">
          <span>Active Display Currency: </span>
          <strong className="text-neutral-900">{currency}</strong>
          <span className="text-[11px] text-stone-400 block">Switch currency in top demo bar anytime</span>
        </div>
      </div>

      {/* Financial KPI Cards (Verve UX inspired) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Contract Value"
          value={formatCurrency(project.totalBudgetNgn, currency)}
          subValue="Fixed price turnkey contract"
          icon={<Building className="w-5 h-5 text-stone-600" />}
        />

        <MetricCard
          label="Certified & Disbursed"
          value={formatCurrency(project.paidToDateNgn, currency)}
          subValue="65% of contract completed"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          highlightColor="emerald"
          trend={{ positive: true, text: 'Tranches 1, 2, 3 reconciled' }}
        />

        <MetricCard
          label="Current Tranche Due"
          value={formatCurrency(project.pendingDueNgn, currency)}
          subValue="Phase 4: Roofing & Enclosure"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          highlightColor="amber"
          trend={{ positive: false, text: 'Pending next stage certification' }}
        />

        <MetricCard
          label="Escrow Retainage"
          value={formatCurrency(112_500_000, currency)}
          subValue="Held until final snagging handover"
          icon={<CreditCard className="w-5 h-5 text-sky-600" />}
          highlightColor="blue"
        />
      </div>

      {/* Milestone Payment Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              Contractual Milestone Payment Schedule
            </h2>
            <p className="text-xs text-stone-500">
              Payments are triggered strictly when engineering tests are certified by the supervising engineer.
            </p>
          </div>

          <span className="text-xs text-stone-400 font-mono">
            Benchmark: 1 GBP ≈ ₦2,000 · 1 USD ≈ ₦1,550
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-6 py-3">Tranche</th>
                <th className="px-6 py-3">Milestone Description</th>
                <th className="px-6 py-3 text-right">Amount (NGN)</th>
                <th className="px-6 py-3 text-right">Amount (GBP)</th>
                <th className="px-6 py-3">Due / Paid Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Receipt / Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {FINANCIAL_MILESTONES.map((item) => (
                <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-neutral-800">
                    Tranche 0{item.trancheNumber}
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-neutral-900">{item.title}</p>
                    <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                      {item.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-neutral-900 tabular-nums">
                    ₦{item.amountNgn.toLocaleString('en-NG')}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-medium text-stone-600 tabular-nums">
                    £{item.amountGbp.toLocaleString('en-GB')}
                  </td>
                  <td className="px-6 py-4 text-stone-600 whitespace-nowrap">
                    {item.paidDate ? (
                      <span className="text-emerald-700 font-medium">Paid: {item.paidDate}</span>
                    ) : (
                      <span>Due: {item.dueDate}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item.status === 'paid' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        Disbursed
                      </span>
                    )}
                    {item.status === 'due' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                        <Clock className="w-3 h-3" />
                        Pending QA
                      </span>
                    )}
                    {item.status === 'upcoming' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        Future Escrow
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => alert(`Previewing invoice ${item.invoiceRef}`)}
                      className="inline-flex items-center gap-1 text-[11px] text-stone-600 hover:text-neutral-900 font-mono transition cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-stone-400" />
                      <span>{item.invoiceRef}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-stone-50 border-t border-stone-100 text-xs text-stone-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            Diaspora banking partners: <strong>Standard Chartered Bank UK & Zenith Bank Nigeria</strong>
          </span>
          <span className="text-[11px] text-stone-400">
            All remittances are converted using official CBN Investor & Exporter FX window rates.
          </span>
        </div>
      </div>
    </div>
  );
};
