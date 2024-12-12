'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import EventCard from './EventCard';
import TimelineEvents from './TimelineEvents';
import CityFilter from './CityFilter';
import { useGeolocation } from '@/hooks/useGeolocation';
import { sortEventsByDateAndLocation } from '@/utils/eventUtils';
import { IEvent } from '@/types';
import { EventCardSkeleton } from '@/components/skeletons/EventCardSkeleton';

interface EventsContainerProps {
  evenimente: IEvent[];
}

// Add this helper function at the top of the file, outside the component
const getCategoryPlural = (category: string): string => {
  // Convert category to lowercase for consistent matching
  const normalizedCategory = category.toLowerCase();

  const pluralMap: { [key: string]: string } = {
    all: 'evenimentele',
    conferințe: 'conferințele',
    conferinte: 'conferințele',
    seminarii: 'seminariile',
    seminar: 'seminariile',
    concerte: 'concertele',
    concert: 'concertele',
    întâlniri: 'întâlnirile',
    intalniri: 'întâlnirile',
    tabere: 'taberele',
    tabără: 'taberele',
    tabara: 'taberele',
  };

  return pluralMap[normalizedCategory] || 'evenimentele';
};

export default function EventsContainer({ evenimente }: EventsContainerProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const { city, loading } = useGeolocation();

  // First, filter events by category
  const filteredByCategory = useMemo(() => {
    if (!evenimente) return [];
    return activeCategory === 'all'
      ? evenimente
      : evenimente.filter((event) => event.category.toLowerCase() === activeCategory.toLowerCase());
  }, [evenimente, activeCategory]);

  // Then, apply location filtering if a city is selected
  const filteredByLocation = useMemo(() => {
    if (!filteredByCategory) return [];
    if (!selectedCity && !city) return filteredByCategory;

    const userLocation = selectedCity || city;
    if (!userLocation) return filteredByCategory;

    return filteredByCategory.filter((event) =>
      event.location.toLowerCase().includes(userLocation.toLowerCase())
    );
  }, [filteredByCategory, selectedCity, city]);

  // Finally, sort events by location and date
  const sortedEvents = useMemo(() => {
    if (!filteredByLocation) return [];
    return sortEventsByDateAndLocation(filteredByLocation, selectedCity || city);
  }, [filteredByLocation, selectedCity, city]);

  const locationText = loading
    ? 'Se încarcă locația...'
    : selectedCity === ''
    ? 'Evenimentele sunt sortate în funcție de dată'
    : selectedCity
    ? `Evenimente din ${selectedCity}`
    : city
    ? `Evenimente din ${city}`
    : 'Evenimentele sunt sortate în funcție de dată';

  const getEventsHeading = () => {
    if (loading) return 'Evenimente disponibile';

    // Get the category text (capitalize first letter)
    const categoryText =
      activeCategory === 'all'
        ? 'Evenimente'
        : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);

    if (selectedCity === '') return `${categoryText} din toate orașele`;
    if (selectedCity) return `${categoryText} din ${selectedCity}`;
    if (city) return `${categoryText} din aproprierea ta`;
    return `${categoryText} din toate orașele`;
  };

  if (loading) {
    return (
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 md:pb-4">
        {[1, 2, 3].map((i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <CityFilter selectedCity={selectedCity} onCityChange={setSelectedCity} userCity={city} />
      </div>

      <div className="mt-6 md:mt-8 mb-3 md:mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base md:text-xl font-bold text-[#333]">{getEventsHeading()}</h2>
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
          {sortedEvents.length > 0 ? (
            sortedEvents.map((eveniment) => (
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
        <div className="flex items-baseline gap-2">
          <h2 className="text-base md:text-xl font-bold text-[#333]">
            Toate {getCategoryPlural(activeCategory)}
          </h2>
          <span className="text-sm md:text-base text-gray-500">(din toată țara)</span>
        </div>
        <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          Vezi toate
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>

      <TimelineEvents
        events={filteredByCategory}
        userCity={selectedCity || city}
        category={activeCategory}
        loading={loading}
      />
    </>
  );
}
