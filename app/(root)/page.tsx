import { Suspense } from 'react';
import EventsContainer from '@/components/EventsContainer';
import { getEvents } from '@/app/actions/events';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import SearchForm from '@/components/SearchForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const events = await getEvents();
  
  return (
    <main className="min-h-screen bg-background animate-in fade-in duration-500">
      <div className="container mx-auto px-4 pt-2 pb-8">
        <SearchForm evenimente={events} />
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm text-muted-foreground">Se încarcă evenimentele...</p>
            </div>
          }
        >
          <EventsContainer evenimente={events} />
        </Suspense>
      </div>
    </main>
  );
}
