import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import {
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Check,
  Send,
  Calendar,
  Building2,
  FileText,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const { selectedProperty, navigateTo, currency } = useApp();
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    diasporaCountry: 'United Kingdom',
    interestType: 'Outright Purchase & Construction',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={3}
        screenName="Property Details & Enquiry"
        roleScope="Public Website"
        description="Detailed view of individual property parcels and architectural villa designs. Integrates title deed verification status, specification breakdowns, and an international diaspora inquiry workflow."
        currentFoundationFeatures={[
          'Detailed architectural presentation of selected development',
          'Document verification status (C of O / Governor’s Consent) display',
          'Multi-currency investment breakdown (NGN, GBP, USD)',
          'Interactive diaspora enquiry form with confirmation feedback'
        ]}
        subsequentPromptRoadmap={[
          'Downloadable Title Deed PDF abstract and survey beacon plan',
          'Virtual appointment scheduler with London / Lagos project architects',
          'Custom construction cost estimation calculator based on client finishes'
        ]}
        nextSuggestedScreen={{ id: 'customer-dashboard', label: '4. Customer Project Dashboard' }}
      />

      {/* Back button */}
      <div>
        <button
          onClick={() => navigateTo('listings')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-neutral-900 transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Property Listings</span>
        </button>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Image & Property Specs */}
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visual Showcase */}
          <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-neutral-900 border border-stone-200 shadow-sm">
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-neutral-900/90 text-white text-xs font-semibold px-3 py-1 rounded backdrop-blur-xs">
              {selectedProperty.status}
            </div>
            <div className="absolute bottom-4 right-4 bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1 rounded shadow-sm">
              {selectedProperty.category}
            </div>
          </div>

          {/* Heading & Location */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-amber-800 font-semibold uppercase tracking-wider">
              <span>{selectedProperty.state}</span>
              <span aria-hidden="true">·</span>
              <span>Title: {selectedProperty.titleDeed}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {selectedProperty.title}
            </h1>
            <p className="flex items-center gap-1.5 text-xs sm:text-sm text-stone-500">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{selectedProperty.location}</span>
            </p>
          </div>

          {/* Core Specs Bar */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-stone-100/80 rounded-xl border border-stone-200">
            {selectedProperty.bedrooms ? (
              <div className="text-center">
                <span className="text-[11px] text-stone-500 uppercase font-medium block">Bedrooms</span>
                <span className="text-lg font-bold text-neutral-900 tabular-nums">
                  {selectedProperty.bedrooms} Ensuite
                </span>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-[11px] text-stone-500 uppercase font-medium block">Zoning</span>
                <span className="text-lg font-bold text-neutral-900">Residential</span>
              </div>
            )}

            {selectedProperty.bathrooms ? (
              <div className="text-center border-x border-stone-200">
                <span className="text-[11px] text-stone-500 uppercase font-medium block">Bathrooms</span>
                <span className="text-lg font-bold text-neutral-900 tabular-nums">
                  {selectedProperty.bathrooms} Luxury
                </span>
              </div>
            ) : (
              <div className="text-center border-x border-stone-200">
                <span className="text-[11px] text-stone-500 uppercase font-medium block">Topography</span>
                <span className="text-lg font-bold text-neutral-900">100% Dry Land</span>
              </div>
            )}

            <div className="text-center">
              <span className="text-[11px] text-stone-500 uppercase font-medium block">Plot Extent</span>
              <span className="text-lg font-bold text-neutral-900 tabular-nums">
                {selectedProperty.landSizeSqm} SQM
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900">Architectural & Development Overview</h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {selectedProperty.description}
            </p>
          </div>

          {/* Verified Highlights */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900">Key Development Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {selectedProperty.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-stone-700 bg-white p-3 rounded-lg border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Infrastructure Guarantee */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-neutral-900">Infrastructure & Estate Services</h2>
            <div className="space-y-2">
              {selectedProperty.infrastructure.map((inf, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{inf}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pricing & Enquiry Form Placeholder */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider block font-medium">
                Investment Value
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tabular-nums mt-1">
                {formatCurrency(selectedProperty.priceNgn, currency)}
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Direct developer price with no agency markups or proxy commissions.
              </p>
            </div>

            <div className="pt-3 border-t border-stone-100 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Title Verification:</span>
                <strong className="text-emerald-700">100% Certified</strong>
              </div>
              <div className="flex justify-between">
                <span>Standard Escrow:</span>
                <span className="text-neutral-900">Stage Milestone Based</span>
              </div>
              <div className="flex justify-between">
                <span>Remote Inspection:</span>
                <span className="text-neutral-900">Bi-Weekly 4K Drone Logs</span>
              </div>
            </div>
          </div>

          {/* Interactive Diaspora Enquiry Form */}
          <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 shadow-xs">
            <div className="mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                Diaspora Consultation & Site Inspection
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Connect directly with our Diaspora Client Desk in London or Lagos.
              </p>
            </div>

            {enquirySubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-5 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="text-sm font-bold text-emerald-900">Enquiry Successfully Logged</p>
                <p className="text-xs text-emerald-700">
                  Thank you! Our Diaspora Client Director will reach out to you within 24 hours with the title dossier and milestone schedule.
                </p>
                <button
                  onClick={() => setEnquirySubmitted(false)}
                  className="mt-3 text-xs text-emerald-800 underline hover:text-emerald-950 font-medium cursor-pointer"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block text-stone-700 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Dayo Adeleke"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="dayo@example.co.uk"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Your Diaspora Country</label>
                  <select
                    value={formData.diasporaCountry}
                    onChange={(e) => setFormData({ ...formData, diasporaCountry: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  >
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="Europe (EU)">Europe (EU)</option>
                    <option value="Other">Other Diaspora Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 7911 123456"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-medium mb-1">Specific Questions or Preferred Timeline</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your residential vision or request the verified title deed packet..."
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>Submit Diaspora Enquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
