import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import { EventPageSkeleton } from '@/components/skeletons/EventPageSkeleton';
import EventPageClient from '@/components/EventPageClient';

interface PageParams {
  id: string;
}

interface Props {
  params: Promise<PageParams>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <Suspense fallback={<EventPageSkeleton />}>
      <EventPageClient event={event} />
    </Suspense>
  );
}
