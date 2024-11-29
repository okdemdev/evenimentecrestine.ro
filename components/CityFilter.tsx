'use client';

import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { romanianCities } from '@/utils/cities';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CityFilterProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  userCity: string | null;
}

export default function CityFilter({ selectedCity, onCityChange, userCity }: CityFilterProps) {
  useEffect(() => {
    if (userCity && !selectedCity && romanianCities.includes(userCity)) {
      onCityChange(userCity);
    }
  }, [userCity]);

  return (
    <div className="relative">
      <Select
        value={selectedCity || 'all'}
        onValueChange={(value) => onCityChange(value === 'all' ? '' : value)}
      >
        <SelectTrigger className="w-[180px] bg-white/50 backdrop-blur-sm border-gray-200 hover:bg-white/80 transition-colors">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-[#6a7bff]" />
            <SelectValue placeholder="Alege orașul" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Toate orașele</SelectItem>
          {romanianCities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
