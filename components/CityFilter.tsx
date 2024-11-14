'use client';

import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { romanianCities } from '@/utils/cities';

interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  userCity: string | null;
}

export default function CityFilter({ selectedCity, onCityChange, userCity }: CityFilterProps) {
  // Automatically set the city when userCity changes
  useEffect(() => {
    if (userCity && romanianCities.includes(userCity) && !selectedCity) {
      onCityChange(userCity);
    }
  }, [userCity, onCityChange, selectedCity]);

  return (
    <div className="flex items-center gap-2">
      <MapPin className="w-6 h-6 text-[#6a7bff]" />
      <select
        value={selectedCity}
        onChange={(e) => onCityChange(e.target.value)}
        className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#6a7bff] focus:border-transparent"
      >
        <option value="">Selecteaza orasul</option>
        {romanianCities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}
