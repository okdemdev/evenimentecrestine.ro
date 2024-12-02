import { Suspense } from 'react';
import { EventCardSkeleton } from '@/components/skeletons/EventCardSkeleton';
import { TimelineEventSkeleton } from '@/components/skeletons/TimelineEventSkeleton';
import EventsContainer from '@/components/EventsContainer';
import { getEvents } from '@/app/actions/events';

export default async function Home() {
  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-500">
      <div className="container mx-auto px-4 pt-2 pb-8">
        <Suspense
          fallback={
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Horizontal scrolling events */}
              <div className="flex gap-4 overflow-x-auto pb-4">
                {[1, 2, 3, 4].map((i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>

              {/* Timeline events */}
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <TimelineEventSkeleton key={i} />
                ))}
              </div>
            </div>
          }
        >
          <EventsContainer evenimente={await getEvents()} />
        </Suspense>
      </div>
    </main>
  );
}
