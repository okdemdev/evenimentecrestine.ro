import React from 'react';
import SearchForm from '@/components/SearchForm';
import EventsContainer from '@/components/EventsContainer';
import { getEvents } from '@/app/actions/events';

export default async function Home() {
  const evenimente = await getEvents();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-[1400px] mx-auto px-3 md:px-8">
        <SearchForm evenimente={evenimente} />
        <EventsContainer evenimente={evenimente} />
      </div>
    </div>
  );
}
