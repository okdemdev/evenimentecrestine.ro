'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import EventCard from './EventCard';
import TimelineEvents from './TimelineEvents';
import CityFilter from './CityFilter';
import { useGeolocation } from '@/hooks/useGeolocation';
import { sortEventsByDateAndLocation } from '@/utils/eventUtils';
import type { EventCardType } from '@/app/(root)/page';

interface EventsContainerProps {
  evenimente: EventCardType[];
}

export default function EventsContainer({ evenimente }: EventsContainerProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const { city, country, loading, error } = useGeolocation();

  const filteredAndSortedEvents = useMemo(() => {
    // First filter by category
    let filteredEvents =
      activeCategory === 'all'
        ? evenimente
        : evenimente.filter((event) => event.category === activeCategory);

    // Then filter by selected city if one is chosen
    if (selectedCity) {
      filteredEvents = filteredEvents.filter((event) =>
        event.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }

    // Finally sort by location and date
    return sortEventsByDateAndLocation(filteredEvents, selectedCity || city);
  }, [evenimente, activeCategory, selectedCity, city]);

  const locationText = loading
    ? 'Se încarcă locația...'
    : error || (!city && !selectedCity)
    ? 'Evenimente ordonate după dată'
    : selectedCity
    ? `Evenimente din ${selectedCity}`
    : `Evenimente din ${city}, ${country}`;

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>
      <CityFilter selectedCity={selectedCity} onCityChange={setSelectedCity} />
      <div className="mt-4 md:mt-4 mb-3 md:mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base md:text-xl font-bold text-[#333]">Evenimente disponibile</h2>

          <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Vezi toate
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground italic">{locationText}</p>
      </div>

      <div className="relative">
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 md:pb-4 scroll-smooth snap-x pt-3 scrollbar-hidden">
          {filteredAndSortedEvents.length > 0 ? (
            filteredAndSortedEvents.map((eveniment) => (
              <div key={eveniment._id} className="snap-start">
                <EventCard event={eveniment} />
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">Nu au fost găsite evenimente</p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h2 className="text-base md:text-xl font-bold text-[#333]">Evenimente care vor urma</h2>

        <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          Vezi toate
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>

      <TimelineEvents events={filteredAndSortedEvents} />
    </>
  );
}
