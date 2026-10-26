import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { STAFF_PROJECTS } from '../data/mockData';
import { MetricCard } from '../components/shared/MetricCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import {
  Shield,
  HardHat,
  Users,
  Search,
  Plus,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Upload,
  FileSpreadsheet,
  Activity,
  Layers,
} from 'lucide-react';

export const StaffManagementPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [filterHealth, setFilterHealth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProjects = STAFF_PROJECTS.filter((proj) => {
    const matchesHealth = filterHealth === 'All' || proj.health === filterHealth;
    const matchesQuery =
      proj.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.projectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHealth && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={7}
        screenName="Staff Project Management"
        roleScope="Simulated Staff Interface"
        description="The internal operational command console for Wellsprings project directors, resident site engineers, and diaspora relationship managers. Used to oversee multiple client sites across Nigeria, track QA sign-offs, and publish milestone drone reports."
        currentFoundationFeatures={[
          'Multi-project diaspora portfolio table with engineering health indicators',
          'Instant client-side filtering by site health (On Track, Ahead of Schedule, Attention Required)',
          'Cross-navigation: One-click jump to inspect specific client views in Customer Portal',
          'Operational quick actions for resident engineers'
        ]}
        subsequentPromptRoadmap={[
          'Engineering snag-list tracker with contractor work-order assignments',
          'Automated WhatsApp/Email dispatch of bi-weekly drone logs to overseas clients',
          'Material procurement inventory & supply chain lead-time monitor'
        ]}
        nextSuggestedScreen={{ id: 'home', label: '1. Public Home Page' }}
      />

      {/* Staff Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800">
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>Developer Internal Management</span>
            <span aria-hidden="true">·</span>
            <span>Wellsprings Executive Desk</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight mt-1">
            Active Diaspora Project Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Monitoring 14 concurrent residential developments across Lagos and Abuja.
          </p>
        </div>

        {/* Staff Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => alert('Simulated action: New Site Inspection Log modal will open in the next phase.')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-amber-400" />
            <span>Log Site Inspection</span>
          </button>
          <button
            onClick={() => alert('Simulated action: Bi-Weekly Diaspora PDF Report generated.')}
            className="px-3.5 py-2 text-xs font-semibold text-stone-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition flex items-center gap-1.5 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-stone-500" />
            <span>Generate Portfolio Report</span>
          </button>
        </div>
      </div>

      {/* Operational KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Active Diaspora Sites"
          value="14 Sites"
          subValue="9 Lagos · 5 Abuja"
          icon={<HardHat className="w-5 h-5 text-amber-600" />}
          highlightColor="amber"
        />

        <MetricCard
          label="Scheduled Milestone Audits"
          value="3 Pending"
          subValue="Formwork & MEP first fix"
          icon={<Activity className="w-5 h-5 text-sky-600" />}
          highlightColor="blue"
        />

        <MetricCard
          label="On-Time Delivery Rate"
          value="96.4%"
          subValue="Measured against client charter"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
          trend={{ positive: true, text: 'Industry top quartile in Nigeria' }}
          highlightColor="emerald"
        />

        <MetricCard
          label="Total Portfolio Value"
          value="₦5.2 Billion"
          subValue="Approx. £2.6M Diaspora Investment"
          icon={<Users className="w-5 h-5 text-stone-600" />}
        />
      </div>

      {/* Staff Management Project Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-neutral-900">
              Assigned Residential Projects
            </h2>
            <p className="text-xs text-stone-500">
              Live tracking for project directors and lead structural consultants.
            </p>
          </div>

          {/* Search & Health Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search project or client..."
                className="pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 w-44 sm:w-56"
              />
            </div>

            <select
              value={filterHealth}
              onChange={(e) => setFilterHealth(e.target.value)}
              className="px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="All">All Health Statuses</option>
              <option value="On Track">On Track</option>
              <option value="Ahead of Schedule">Ahead of Schedule</option>
              <option value="Attention Required">Attention Required</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-y border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Code & Client</th>
                <th className="py-3 px-4">Development & Location</th>
                <th className="py-3 px-4">Active Stage & Progress</th>
                <th className="py-3 px-4">Health Status</th>
                <th className="py-3 px-4">Assigned Engineer</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-mono text-stone-400 text-[11px] font-semibold">{p.projectCode}</p>
                    <p className="font-bold text-neutral-900 mt-0.5">{p.clientName}</p>
                    <p className="text-[11px] text-stone-500">{p.diasporaCity}</p>
                  </td>

                  <td className="py-4 px-4">
                    <p className="font-semibold text-neutral-800">{p.projectTitle}</p>
                    <p className="text-[11px] text-stone-500">{p.location}</p>
                  </td>

                  <td className="py-4 px-4">
                    <p className="text-stone-700 font-medium">{p.stage}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="h-1.5 w-24 bg-stone-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${p.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] font-bold text-stone-600 tabular-nums">
                        {p.progressPercent}%
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 whitespace-nowrap">
                    {p.health === 'On Track' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3 h-3" />
                        On Track
                      </span>
                    )}
                    {p.health === 'Ahead of Schedule' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                        Ahead of Schedule
                      </span>
                    )}
                    {p.health === 'Attention Required' && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
                        <AlertTriangle className="w-3 h-3 text-amber-600" />
                        Attention Required
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 text-stone-600">
                    <p className="font-medium text-neutral-900">{p.assignedEngineer}</p>
                    <p className="text-[11px] text-stone-400">Last: {p.lastUpdateDate}</p>
                  </td>

                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigateTo('customer-dashboard')}
                        className="px-2.5 py-1 text-[11px] font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition cursor-pointer"
                        title="Simulate viewing as this client"
                      >
                        Client View
                      </button>
                      <button
                        onClick={() => navigateTo('construction-progress')}
                        className="px-2.5 py-1 text-[11px] font-semibold text-neutral-900 bg-amber-400 hover:bg-amber-300 rounded transition flex items-center gap-1 cursor-pointer"
                      >
                        <span>Audit</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
