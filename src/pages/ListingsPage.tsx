import React, { useState } from 'react';
import { PROPERTIES } from '../data/mockData';
import { PropertyCard } from '../components/shared/PropertyCard';
import { PlaceholderNotice } from '../components/shared/PlaceholderNotice';
import { useApp } from '../context/AppContext';
import { Search, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const ListingsPage: React.FC = () => {
  const { currency } = useApp();
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredProperties = PROPERTIES.filter((property) => {
    const matchesState = selectedState === 'All' || property.state.toLowerCase().includes(selectedState.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || property.category === selectedCategory;
    const matchesQuery =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesCategory && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 pb-20">
      {/* Foundation State Notice */}
      <PlaceholderNotice
        screenNumber={2}
        screenName="Property Listings"
        roleScope="Public Website"
        description="Presents Wellsprings' curated residential developments and verified serviced plots in Nigeria, structured with transparent title verification status and multi-currency pricing for diaspora purchasers."
        currentFoundationFeatures={[
          'State & Category filter controls (Lagos, Abuja, Epe, Residential, Land)',
          'Instant client-side search across title and location',
          'Responsive property grid matching premium real estate visual standard',
          'Seamless click-through to Screen 03 (Property Details & Enquiry)'
        ]}
        subsequentPromptRoadmap={[
          'Interactive GIS boundary layer & topographic elevation views',
          'Off-plan floorplan switcher with virtual 3D walkthrough integration',
          'Saved properties & diaspora investment portfolio comparison matrix'
        ]}
        nextSuggestedScreen={{ id: 'property-detail', label: '3. Property Details & Enquiry' }}
      />

      {/* Header & Filter Controls */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider block mb-1">
            Exclusive Diaspora Portfolio
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Verified Lands & Residential Developments
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            All listings carry certified government title documents and are eligible for Wellsprings turn-key construction management.
          </p>
        </div>

        {/* Filters Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by development name, district, or landmark..."
              className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-amber-600 focus:bg-white transition"
            />
          </div>

          {/* Location Segmented Filter */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-stone-400 mr-1 text-[11px] font-medium hidden lg:inline">Region:</span>
            {['All', 'Abuja', 'Lagos', 'Ogun / Epe'].map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                  selectedState === state
                    ? 'bg-neutral-900 text-white font-semibold shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:text-neutral-900'
                }`}
              >
                {state}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-700 focus:outline-none focus:border-amber-600 cursor-pointer"
            >
              <option value="All">All Property Types</option>
              <option value="Residential Villa">Residential Villa</option>
              <option value="Serviced Plot">Serviced Plot</option>
            </select>
          </div>
        </div>
      </div>

      {/* Property Results Counter */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>
          Showing <strong className="text-neutral-900">{filteredProperties.length}</strong> verified properties
        </span>
        <span>
          Prices displayed in <strong className="text-neutral-900">{currency}</strong> (toggle in top demo bar)
        </span>
      </div>

      {/* Property Cards Grid */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 p-12 text-center space-y-3">
          <p className="text-sm font-semibold text-neutral-800">No properties match your current filter criteria.</p>
          <p className="text-xs text-stone-500">Try clearing the search query or changing the region filter.</p>
          <button
            onClick={() => {
              setSelectedState('All');
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 text-xs font-semibold text-neutral-900 bg-stone-100 rounded-lg hover:bg-stone-200 transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
