import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { formatCurrency } from '../utils/formatters';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Building,
  Sparkles,
  ShieldCheck,
  Landmark,
  BadgeAlert,
  Calculator,
  Info,
  AlertTriangle,
} from 'lucide-react';

export const FinancialOverviewPage: React.FC = () => {
  const { currency, project, customer, paymentPlan, paymentRecords } = useApp();
  const [activeLedgerTab, setActiveLedgerTab] = useState<'schedule' | 'records'>('schedule');

  // Format explicitly in Nigerian Naira (₦)
  const formatNaira = (amount: number): string => {
    return `₦${Math.round(amount).toLocaleString('en-NG')}`;
  };

  // --------------------------------------------------------------------------
  // 1. PAYMENT TOTALS RECONCILIATION (Item 1)
  // Ensure the ₦292.5 million paid figure strictly matches the 3 cleared tranches:
  // ₦120,000,000 (Land) + ₦82,500,000 (Foundation) + ₦90,000,000 (Blockwork)
  // --------------------------------------------------------------------------
  const {
    clearedPayments,
    calculatedTotalPaidNgn,
    clearedLandPaidNgn,
    clearedConstructionPaidNgn,
    calculatedTotalRemainingNgn,
    calculatedConstructionRemainingNgn,
  } = useMemo(() => {
    const cleared = paymentRecords.filter((r) => r.status === 'confirmed_cleared');

    const landPaid = cleared
      .filter((r) => r.category === 'land')
      .reduce((sum, r) => sum + r.amountNgn, 0);

    const constructionPaid = cleared
      .filter((r) => r.category === 'construction')
      .reduce((sum, r) => sum + r.amountNgn, 0);

    const totalPaid = landPaid + constructionPaid;
    const totalRemaining = Math.max(0, (project.totalBudgetNgn || 450_000_000) - totalPaid);
    const constructionRemaining = Math.max(
      0,
      (project.constructionBudgetNgn || 330_000_000) - constructionPaid
    );

    return {
      clearedPayments: cleared,
      calculatedTotalPaidNgn: totalPaid,
      clearedLandPaidNgn: landPaid,
      clearedConstructionPaidNgn: constructionPaid,
      calculatedTotalRemainingNgn: totalRemaining,
      calculatedConstructionRemainingNgn: constructionRemaining,
    };
  }, [paymentRecords, project]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={6}
        screenName="Financial Overview"
        roleScope="Simulated Customer Portal"
        description="Comprehensive milestone payment schedule and diaspora foreign exchange tracking. Built around Wellsprings' illustrative escrow model — separate land and construction budgets are managed so funds are disbursed to contractors strictly when physical construction passes stage engineering sign-off."
        currentFoundationFeatures={[
          'Reconciled payment totals: ₦292.5M paid figure strictly matches the 3 cleared tranches (₦120M + ₦82.5M + ₦90M)',
          'Clear tranche status distinction: ₦55M next tranche is labelled as a scheduled future amount, not an immediately payable bill',
          'All trust mechanisms (escrow, bank channels, compliance protocols) clearly labelled as simulated demo content',
          'Explicit separation between Land Acquisition (₦120M) and Construction (₦330M) budgets',
          'Contractual 6-tranche payment schedule with milestone triggers and multi-currency conversions'
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
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <span>Client Ledger: {customer.fullName}</span>
            <span aria-hidden="true">·</span>
            <span>Ref: {project.projectCode}</span>
            <span aria-hidden="true">·</span>
            <span className="bg-amber-100 text-amber-900 text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold border border-amber-200">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Simulated Demo Escrow Ledger
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1 font-display">
            Financial Ledger & Milestone Escrow
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Separated land and construction budgets illustrating diaspora capital protection under simulated escrow governance.
          </p>
        </div>

        {/* Currency reminder */}
        <div className="text-xs text-stone-600 bg-stone-100 px-3.5 py-2 rounded-xl border border-stone-200 self-start md:self-auto">
          <span>Active Display Currency: </span>
          <strong className="text-neutral-900 font-bold">{currency}</strong>
          <span className="text-xs text-stone-400 block mt-0.5">Switch currency in demo navigator bar anytime</span>
        </div>
      </div>

      {/* =========================================================================
          FINANCIAL KPI CARDS (Item 1, 2, 3: Reconciled Totals, Scheduled Status, Demo Labels)
          ========================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Turnkey Commitment"
          value={formatCurrency(project.totalBudgetNgn, currency)}
          subValue="Combined Land + Construction"
          icon={<Building className="w-5 h-5 text-stone-600" />}
        />

        {/* Reconciled ₦292.5M Paid Figure (Item 1 & 3) */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Total Cleared to Date (Simulated)
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {formatCurrency(calculatedTotalPaidNgn, currency)}
              </span>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Cleared
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              Exact sum of 3 cleared tranches (₦292.5M)
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs text-emerald-700 font-medium">
              Land (₦120M) + Foundation (₦82.5M) + Blockwork (₦90M)
            </p>
          </div>
        </div>

        {/* Scheduled Tranche Status (Item 2: Clearly distinguish scheduled vs due) */}
        <div className="bg-white p-5 rounded-xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3">
          <div className="flex items-start justify-between">
            <span className="text-xs sm:text-sm font-medium text-stone-600">
              Next Scheduled Tranche
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 font-mono">
                {formatCurrency(55_000_000, currency)}
              </span>
              <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Scheduled
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-1 font-medium">
              Tranche 4: Roofing & Parapet Enclosure
            </p>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <p className="text-xs text-stone-500">
              <span className="font-semibold text-amber-800">Not currently due:</span> Payable only upon certified completion of Stage 2 (Blockwork)
            </p>
          </div>
        </div>

        <MetricCard
          label="Remaining Construction Balance"
          value={formatCurrency(calculatedConstructionRemainingNgn, currency)}
          subValue="Scheduled Tranches 4, 5, 6 pending"
          icon={<CreditCard className="w-5 h-5 text-sky-600" />}
        />
      </div>

      {/* =========================================================================
          PAYMENT TOTALS RECONCILIATION AUDIT BOX (Item 1)
          ========================================================================= */}
      <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-sm sm:text-base font-bold text-neutral-900 font-display">
              Payment Totals Verification: ₦292,500,000 Matches Cleared Tranches
            </h2>
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 self-start sm:self-auto">
            Strict Reconciliation Confirmed
          </span>
        </div>

        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          The <strong>{formatNaira(calculatedTotalPaidNgn)}</strong> total cleared amount reflects the exact sum of the three confirmed payment records in the project ledger. No unconfirmed, projected, or scheduled installments are counted toward this total:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {clearedPayments.map((p, idx) => (
            <div key={p.id} className="bg-white p-4 rounded-xl border border-stone-200 space-y-2 shadow-2xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                  Tranche 0{idx + 1} · {p.category.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Cleared (Simulated)
                </span>
              </div>
              <p className="text-base sm:text-lg font-extrabold text-neutral-900 font-mono">
                {formatNaira(p.amountNgn)}
              </p>
              <p className="text-xs text-stone-600 font-medium line-clamp-1">
                {p.milestoneTitle}
              </p>
              <div className="flex justify-between text-xs text-stone-500 pt-1.5 border-t border-stone-100 font-mono">
                <span>{p.paymentDate}</span>
                <span>{p.paymentReference}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-stone-200 text-xs text-stone-600">
          <span className="font-mono font-semibold text-neutral-900">
            Reconciliation Formula: ₦120,000,000 (Land) + ₦82,500,000 (Foundation) + ₦90,000,000 (Blockwork) = ₦292,500,000
          </span>
          <span className="text-stone-500 italic">
            * 3 scheduled construction tranches (₦157.5M) remain pending and are not counted as paid.
          </span>
        </div>
      </div>

      {/* =========================================================================
          SEPARATE LAND & CONSTRUCTION BUDGET BREAKDOWN (Item 3: Labelled as Simulated)
          ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Land Budget Ledger Box */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Land Acquisition Account (Simulated)
              </span>
              <h2 className="text-xl font-bold text-neutral-900 mt-0.5 font-mono">
                {formatCurrency(project.landBudgetNgn, currency)}
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Settled (Demo Record)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Covers prime 850sqm plot acquisition in Guzape Hills, FCDA title perfection, legal conveyancing, registered beacon survey, and Certificate of Occupancy documentation (simulated property record).
          </p>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Sample Channel Used:</span>
              <span className="font-medium text-neutral-900">Direct Wire (Simulated Banking Channel)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Settlement Status:</span>
              <span className="text-emerald-700 font-semibold">Cleared & Reconciled (Simulated Demo · 14 May 2025)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Remaining Balance:</span>
              <strong className="text-neutral-900 font-mono font-bold">{formatCurrency(project.landRemainingNgn, currency)}</strong>
            </div>
          </div>
        </div>

        {/* Construction Budget Ledger Box */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">
                Residential Construction Account (Simulated)
              </span>
              <h2 className="text-xl font-bold text-neutral-900 mt-0.5 font-mono">
                {formatCurrency(project.constructionBudgetNgn, currency)}
              </h2>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 flex items-center gap-1 border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              52% Disbursed in Escrow (Simulated)
            </span>
          </div>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Illustrative sample model: Funds held across 5 engineering milestones under simulated escrow governance. Real-world funds are unlocked only upon submission of verified engineering sign-offs.
          </p>

          <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-100 text-xs space-y-2.5">
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Cleared to Date (Foundation + Blockwork):</span>
              <strong className="text-emerald-700 font-mono font-bold">{formatCurrency(clearedConstructionPaidNgn, currency)}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Next Scheduled Tranche (Roofing):</span>
              <strong className="text-amber-800 font-mono font-bold">
                {formatCurrency(55_000_000, currency)} <span className="font-sans text-[11px] font-normal text-stone-500">(Due Post-Certification)</span>
              </strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Remaining Construction Balance:</span>
              <strong className="text-neutral-900 font-mono font-bold">{formatCurrency(calculatedConstructionRemainingNgn, currency)}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          TABS: CONTRACTUAL MILESTONE SCHEDULE VS ACTUAL PAYMENT RECORDS
          ========================================================================= */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setActiveLedgerTab('schedule')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex-1 sm:flex-initial text-center ${
                activeLedgerTab === 'schedule'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-neutral-900'
              }`}
            >
              Milestone Schedule (6 Tranches)
            </button>
            <button
              onClick={() => setActiveLedgerTab('records')}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition cursor-pointer flex-1 sm:flex-initial text-center ${
                activeLedgerTab === 'records'
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-neutral-900'
              }`}
            >
              Payment Records ({clearedPayments.length} Cleared Tranches)
            </button>
          </div>

          <span className="text-xs text-stone-500 italic">
            * All figures, bank channels, and escrow records are illustrative demo simulations
          </span>
        </div>

        {/* Tab 1: Contractual Payment Schedule (Item 2: Clearly distinguish scheduled vs due) */}
        {activeLedgerTab === 'schedule' && (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4">Tranche & Category</th>
                  <th className="py-3 px-4">Milestone Trigger</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                  <th className="py-3 px-4 text-right">Converted ({currency})</th>
                  <th className="py-3 px-4">Target Timeline</th>
                  <th className="py-3 px-4">Escrow Status</th>
                  <th className="py-3 px-4 text-right">Invoice Ref</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paymentPlan.schedule.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-neutral-900 text-xs sm:text-sm">
                          Tranche 0{item.trancheNumber}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded capitalize ${
                            item.category === 'land'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-blue-100 text-blue-900'
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                      <p className="text-stone-500 text-xs mt-0.5">{item.title}</p>
                    </td>

                    <td className="py-3.5 px-4 text-stone-700">
                      <span>{item.milestoneTrigger}</span>
                      <span className="text-xs text-stone-400 block font-mono">
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

                    {/* Escrow Status (Item 2: Scheduled vs Due distinction) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.status === 'paid' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Cleared in Escrow
                        </span>
                      )}
                      {item.status === 'due' && (
                        <div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            Scheduled (Pending Stage 2 Sign-off)
                          </span>
                          <span className="text-[11px] text-stone-400 block mt-0.5 font-normal">
                            Not currently payable
                          </span>
                        </div>
                      )}
                      {item.status === 'upcoming' && (
                        <span className="inline-flex items-center gap-1 text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded border border-stone-200">
                          Upcoming Milestone
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-stone-400 text-xs">
                      {item.invoiceReference}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Actual Diaspora Payment Records (Item 3: Clearly labelled as simulated) */}
        {activeLedgerTab === 'records' && (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-xs">
                <tr>
                  <th className="py-3 px-4">Payment Ref & Category</th>
                  <th className="py-3 px-4">Milestone Covered</th>
                  <th className="py-3 px-4">Sample Payment Channel</th>
                  <th className="py-3 px-4 text-right">Amount (NGN)</th>
                  <th className="py-3 px-4">Date Cleared</th>
                  <th className="py-3 px-4">Verification Status</th>
                  <th className="py-3 px-4 text-right">Receipt #</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {paymentRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-mono font-bold text-neutral-900 text-xs sm:text-sm">
                        {rec.paymentReference}
                      </span>
                      <span
                        className={`ml-2 text-xs font-semibold px-2 py-0.5 rounded uppercase ${
                          rec.category === 'land'
                            ? 'bg-purple-100 text-purple-900'
                            : 'bg-blue-100 text-blue-900'
                        }`}
                      >
                        {rec.category}
                      </span>
                      <p className="text-xs text-stone-400 mt-0.5">{rec.illustrativeNote}</p>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-900 font-medium">
                      {rec.milestoneTitle}
                    </td>

                    <td className="py-3.5 px-4 text-stone-600">
                      <p className="font-semibold text-stone-800">{rec.paymentMethod}</p>
                      <p className="text-xs text-stone-500 font-mono">
                        {rec.originatingBank} → {rec.beneficiaryAccount} (Simulated Channel)
                      </p>
                      <p className="text-xs text-stone-400 font-mono">
                        Ref: {rec.channelReference}
                      </p>
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono font-bold text-neutral-900">
                      ₦{rec.amountNgn.toLocaleString('en-NG')}
                    </td>

                    <td className="py-3.5 px-4 text-stone-500 whitespace-nowrap">
                      {rec.paymentDate}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {rec.status === 'confirmed_cleared' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Cleared in Escrow (Simulated)
                        </span>
                      )}
                      {rec.status === 'processing_in_escrow' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded border border-sky-200">
                          <Clock className="w-3.5 h-3.5 text-sky-600" />
                          Processing in Escrow (Simulated)
                        </span>
                      )}
                      {rec.status === 'pending_verification' && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                          Pending Bank Verification (Simulated)
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right font-mono text-stone-500 text-xs">
                      {rec.receiptNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================================================================
          DIASPORA ESCROW PROTOCOL CALLOUT (Item 3: Labelled as Simulated Demo Content)
          ========================================================================= */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start gap-4">
        <Landmark className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm text-stone-600 leading-relaxed">
          <div className="flex flex-wrap items-center gap-2">
            <strong className="text-neutral-900 text-sm sm:text-base font-display">
              Diaspora Escrow Architecture (Simulated Framework)
            </strong>
            <span className="bg-amber-100 text-amber-900 text-xs font-semibold px-2 py-0.5 rounded-full border border-amber-200">
              Illustrative Demonstration Only
            </span>
          </div>
          <p>
            This demo screen illustrates how diaspora funds can be managed via dedicated ring-fenced client project accounts with Tier-1 commercial banks. All references to regulatory compliance frameworks, banking partnerships, and stage-by-stage structural engineer sign-off triggers represent simulated operating models for testing the Wellsprings application, not active legal or financial commitments.
          </p>
        </div>
      </div>
    </div>
  );
};
