import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import EventPageClient from '@/components/EventPageClient';

export default async function EventPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
}
