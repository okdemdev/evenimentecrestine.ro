import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import EventPageClient from '@/components/EventPageClient';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface PageParams {
  id: string;
}

interface Props {
  params: Promise<PageParams>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function EventPage({ params }: Props) {
  const { id } = await params;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">Se încarcă evenimentul...</p>
        </div>
      }
    >
      <EventContent id={id} />
    </Suspense>
  );
}

async function EventContent({ id }: { id: string }) {
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
}
