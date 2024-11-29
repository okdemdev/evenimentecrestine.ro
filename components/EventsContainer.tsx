'use client';

import React, { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import EventCard from './EventCard';
import TimelineEvents from './TimelineEvents';
import CityFilter from './CityFilter';
import LocationPermissionPopup from './LocationPermissionPopup';
import { useGeolocation } from '@/hooks/useGeolocation';
import { sortEventsByDateAndLocation } from '@/utils/eventUtils';
import { IEvent } from '@/types';

interface EventsContainerProps {
  evenimente: IEvent[];
}

export default function EventsContainer({ evenimente }: EventsContainerProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('');
  const {
    city,
    country,
    loading,
    error,
    showPermissionPopup,
    setShowPermissionPopup,
    requestGeolocation,
  } = useGeolocation();

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

  const handleRequestLocation = () => {
    setShowPermissionPopup(false);
    requestGeolocation();
  };

  const locationText = loading
    ? 'Se încarcă locația...'
    : selectedCity === ''
    ? 'Evenimentele sunt sortate în funcție de dată'
    : selectedCity
    ? `Evenimente din ${selectedCity}`
    : city
    ? `Evenimente din ${city}, ${country}`
    : 'Evenimentele sunt sortate în funcție de dată';

  const getEventsHeading = () => {
    if (loading) return 'Evenimente disponibile';
    if (selectedCity === '') return 'Evenimente din toate orașele';
    if (selectedCity) return `Evenimente din ${selectedCity}`;
    if (city) return 'Evenimente din aproprierea ta';
    return 'Evenimente din toate orașele';
  };

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
        <h2 className="text-base md:text-xl font-bold text-[#333]">Toate evenimentele</h2>
        <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
          Vezi toate
          <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>

      <TimelineEvents
        events={filteredByCategory}
        userCity={selectedCity || city}
        category={activeCategory}
      />

      {showPermissionPopup && (
        <LocationPermissionPopup
          onClose={() => setShowPermissionPopup(false)}
          onRequestLocation={handleRequestLocation}
        />
      )}
    </>
  );
}
