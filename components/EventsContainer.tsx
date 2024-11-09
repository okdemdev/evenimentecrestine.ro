'use client';
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import EventCard from './EventCard';

import { EventCardType } from '@/app';
import TimelineEvents from './TimelineEvents';

interface EventsContainerProps {
  evenimente: EventCardType[];
}

export default function EventsContainer({ evenimente }: EventsContainerProps) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredEvents = evenimente.filter(
    (event) => activeCategory === 'all' || event.category === activeCategory
  );

  return (
    <>
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="mt-6 md:mt-8 mb-3 md:mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-base md:text-xl font-bold text-[#333]">
            Evenimente din apropierea ta
          </h2>

          <button className="text-xs md:text-sm text-[#6a7bff] font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Vezi toate
            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground italic">( Timisoara, Romania )</p>
      </div>

      {/* Scroll Container */}
      <div className="relative">
        {/* Gradient Fade Effect */}
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Cards Container */}
        <div className="flex gap-3 md:gap-4 overflow-x-auto pb-3 md:pb-4 scroll-smooth snap-x pt-3 scrollbar-hidden">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((eveniment) => (
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

      <TimelineEvents events={filteredEvents} />
    </>
  );
}
