import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import { EventPageSkeleton } from '@/components/skeletons/EventPageSkeleton';
import EventPageClient from '@/components/EventPageClient';

export default async function EventPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<EventPageSkeleton />}>
      <EventContent params={params} />
    </Suspense>
  );
}

async function EventContent({ params }: { params: { id: string } }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
}
