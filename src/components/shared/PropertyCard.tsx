import React, { useState } from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { MapPin, Bed, Bath, Maximize2, ArrowUpRight, Image as ImageIcon } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { navigateTo, currency } = useApp();
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col hover:border-stone-300 transition-all duration-200 group">
      {/* Property Media */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        {!imageError ? (
          <img
            src={property.image}
            alt={property.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-stone-400 bg-stone-100">
            <ImageIcon className="w-8 h-8 mb-2 text-stone-300" />
            <span className="text-xs font-medium text-stone-500">{property.title}</span>
          </div>
        )}

        {/* Status Kicker (Single unboxed or soft pill for essential state) */}
        <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
          {property.status}
        </div>

        {/* State/Region indicator */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-medium px-2.5 py-1 rounded shadow-xs">
          {property.state}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>{property.category}</span>
            <span aria-hidden="true">·</span>
            <span>{property.titleDeed}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-neutral-900 tracking-tight group-hover:text-amber-800 transition-colors">
            {property.title}
          </h3>

          {/* Location */}
          <p className="flex items-center gap-1.5 text-xs text-stone-500 mt-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>{property.location}</span>
          </p>

          {/* Specs: Bed, Bath, Sqm */}
          <div className="flex items-center gap-4 text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100">
            {property.bedrooms && (
              <div className="flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-stone-400" />
                <span className="tabular-nums">{property.bedrooms} Beds</span>
              </div>
            )}
            {property.bathrooms && (
              <div className="flex items-center gap-1.5">
                <Bath className="w-4 h-4 text-stone-400" />
                <span className="tabular-nums">{property.bathrooms} Baths</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
              <span className="tabular-nums">{property.landSizeSqm} sqm</span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] text-stone-400 uppercase tracking-wider block font-medium">
              Investment Guide
            </span>
            <span className="text-base font-bold text-neutral-900 tabular-nums">
              {formatCurrency(property.priceNgn, currency)}
            </span>
          </div>

          <button
            onClick={() => navigateTo('property-detail', property.id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-stone-100 rounded-lg hover:bg-amber-100 hover:text-amber-900 transition-colors cursor-pointer"
          >
            <span>View Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
