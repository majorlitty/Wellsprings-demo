import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
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
  Sparkles,
  ShieldCheck,
  Landmark,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const FinancialOverviewPage: React.FC = () => {
  const { currency, navigateTo, project, customer, paymentPlan, paymentRecords } = useApp();
  const [activeLedgerTab, setActiveLedgerTab] = useState<'schedule' | 'records'>('schedule');

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={6}
        screenName="Financial Overview"
        roleScope="Simulated Customer Portal"
        description="Comprehensive milestone payment schedule and diaspora foreign exchange tracking. Built around Wellsprings' escrow policy — separate land and construction budgets are managed so funds are disbursed to contractors strictly when physical construction passes stage engineering sign-off."
        currentFoundationFeatures={[
          'Explicit separation between Land Acquisition (₦120M) and Construction (₦330M) budgets',
          'Contractual 6-tranche payment schedule with milestone triggers and multi-currency conversions',
          'Detailed diaspora payment records with originating bank wires, payment methods and channel references',
          'Prominent illustrative badges clarifying all figures are realistic simulations for demonstration'
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
            <span>Client Ledger: {customer.fullName}</span>
            <span aria-hidden="true">·</span>
            <span>Ref: {project.projectCode}</span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 text-amber-900 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-amber-600" />
              Illustrative Escrow Ledger
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Financial Ledger & Milestone Escrow
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Separated land and construction budgets protecting diaspora capital with third-party escrow governance.
          </p>
        </div>

        {/* Currency reminder */}
        <div className="text-xs text-stone-500 bg-stone-100 px-3 py-2 rounded-lg border border-stone-200">
          <span>Active Display Currency: </span>
          <strong className="text-neutral-900">{currency}</strong>
          <span className="text-[11px] text-stone-400 block">Switch currency in demo navigator bar anytime</span>
        </div>
      </div>

      {/* Financial KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Turnkey Commitment"
          value={formatCurrency(project.totalBudgetNgn, currency)}
          subValue="Combined Land + Construction"
          icon={<Building className="w-5 h-5 text-stone-600" />}
        />

        <MetricCard
          label="Total Certified & Disbursed"
          value={formatCurrency(project.totalPaidNgn, currency)}
          subValue="65% of contract completed"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          highlightColor="emerald"
          trend={{ positive: true, text: 'Land + Milestones 1 & 2 cleared' }}
        />

        <MetricCard
          label="Next Tranche Due"
          value={formatCurrency(55_000_000, currency)}
          subValue="Tranche 3: Roofing & Enclosure"
          icon={<Clock className="w-5 h-5 text-amber-600" />}
          highlightColor="amber"
          trend={{ positive: false, text: 'Pending next stage certification' }}
        />

        <MetricCard
          label="Remaining Construction Balance"
          value={formatCurrency(project.constructionRemainingNgn, currency)}
          subValue="Tranches 3, 4, 5 pending"
          icon={<CreditCard className="w-5 h-5 text-sky-600" />}
        />
      </div>

      {/* SEPARATE LAND & CONSTRUCTION BUDGET BREAKDOWN (Prompt 2 Requirement) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Land Budget Ledger Box */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Land Acquisition Account
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
                {formatCurrency(project.landBudgetNgn, currency)}
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Paid / Perfected
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Covers prime 850sqm plot acquisition in Guzape Hills, FCDA title perfection, legal conveyancing, registered beacon survey, and Certificate of Occupancy documentation.
          </p>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Channel Used:</span>
              <span className="font-semibold text-neutral-900">UK Direct Bank Wire (NatWest to Zenith Diaspora)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Settlement Status:</span>
              <span className="text-emerald-700 font-medium">Cleared & Reconciled (14 May 2025)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Remaining Balance:</span>
              <strong className="text-neutral-900">{formatCurrency(project.landRemainingNgn, currency)}</strong>
            </div>
          </div>
        </div>

        {/* Construction Budget Ledger Box */}
        <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Residential Construction Account
              </span>
              <h2 className="text-lg font-bold text-neutral-900 mt-0.5">
                {formatCurrency(project.constructionBudgetNgn, currency)}
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              52% Disbursed in Escrow
            </span>
          </div>

          <p className="text-xs text-stone-600 leading-relaxed">
            Held in third-party banking escrow and divided across 5 engineering milestones. Funds are only unlocked upon submission of COREN test lab certificates and client concurrence.
          </p>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-stone-500">Paid to Date (Foundations + Blockwork):</span>
              <strong className="text-emerald-700 font-semibold">{formatCurrency(project.constructionPaidNgn, currency)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Current Tranche Due (Roofing):</span>
              <strong className="text-amber-800 font-semibold">{formatCurrency(55_000_000, currency)}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Remaining Construction Balance:</span>
              <strong className="text-neutral-900">{formatCurrency(project.constructionRemainingNgn, currency)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Contractual Milestone Schedule vs Actual Payment Records */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveLedgerTab('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeLedgerTab === 'schedule'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-neutral-900'
              }`}
            >
              Contractual Milestone Schedule (6 Tranches)
            </button>
            <button
              onClick={() => setActiveLedgerTab('records')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeLedgerTab === 'records'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-neutral-900'
              }`}
            >
              Diaspora Payment Records ({paymentRecords.length} Cleared)
            </button>
          </div>

          <span className="text-[11px] text-stone-500 italic">
            * All amounts & references are illustrative simulations for demonstration
          </span>
        </div>

        {/* Tab 1: Contractual Payment Schedule */}
        {activeLedgerTab === 'schedule' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Tranche & Category</th>
                  <th className="py-3 px-4">Milestone Trigger</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                  <th className="py-3 px-4 text-right">Converted ({currency})</th>
                  <th className="py-3 px-4">Target Due Date</th>
                  <th className="py-3 px-4">Escrow Status</th>
                  <th className="py-3 px-4 text-right">Invoice Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paymentPlan.schedule.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-neutral-900 text-[11px]">
                          Tranche 0{item.trancheNumber}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded capitalize ${
                            item.category === 'land'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-stone-500 text-[11px] mt-0.5">{item.title}</p>
                    </td>

                    <td className="py-3.5 px-4 text-stone-700">
                      <span>{item.milestoneTrigger}</span>
                      <span className="text-[11px] text-stone-400 block font-mono">
                        {item.percentageOfBudget}% of budget
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                      ₦{item.amountNgn.toLocaleString('en-NG')}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-stone-600">
                      {formatCurrency(item.amountNgn, currency)}
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {item.dueDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === 'paid' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Cleared
                        </span>
                      )}
                      {item.status === 'due' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-amber-600" />
                          Tranche Due
                        </span>
                      )}
                      {item.status === 'upcoming' && (
                        <span className="inline-flex items-center gap-1 text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                          Upcoming
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-stone-400 text-[11px]">
                      {item.invoiceReference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Actual Diaspora Payment Records */}
        {activeLedgerTab === 'records' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Payment Ref & Category</th>
                  <th className="py-3 px-4">Milestone Covered</th>
                  <th className="py-3 px-4">Payment Method & Banking Channel</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                  <th className="py-3 px-4">Date Cleared</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Receipt #</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paymentRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-neutral-900 text-[11px]">
                        {rec.paymentReference}
                      </span>
                      <span
                        className={`ml-2 text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                          rec.category === 'land'
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {rec.category}
                      </span>
                      <p className="text-[10px] text-stone-400 mt-0.5">{rec.illustrativeNote}</p>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-900 font-medium">
                      {rec.milestoneTitle}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600">
                      <p className="font-semibold text-stone-800">{rec.paymentMethod}</p>
                      <p className="text-[11px] text-stone-400 font-mono">
                        {rec.originatingBank} → {rec.beneficiaryAccount}
                      </p>
                      <p className="text-[10px] text-stone-400 font-mono">
                        Channel Ref: {rec.channelReference}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                      ₦{rec.amountNgn.toLocaleString('en-NG')}
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {rec.paymentDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        Cleared in Escrow
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-stone-500 text-[11px]">
                      {rec.receiptNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Diaspora Escrow Safeguard Callout */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 flex flex-col md:flex-row items-start gap-4">
        <Landmark className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs text-stone-600 leading-relaxed">
          <strong className="text-neutral-900 block text-sm">
            Wellsprings Diaspora Escrow & CBN Compliance Protocol
          </strong>
          <p>
            Overseas funds are banked into designated ring-fenced client project accounts with authorized Nigerian Tier-1 commercial institutions. Contractor disbursements occur only when our independent structural engineer issues a signed COREN formwork inspection report and material crush-test certificate.
          </p>
        </div>
      </div>
    </div>
  );
};
