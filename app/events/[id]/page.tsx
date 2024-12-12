import { Metadata } from 'next';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { getEventById } from '@/app/actions/events';
import EventPageClient from '@/components/EventPageClient';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { generateEventStructuredData } from '@/utils/structuredData';

interface PageParams {
  id: string;
}

interface Props {
  params: Promise<PageParams>;
  searchParams: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventById((await params).id);

  if (!event) return {};

  return {
    title: event.title,
    description: event.about,
    openGraph: {
      title: event.title,
      description: event.about,
      url: `https://evenimentecrestine.ro/events/${event._id}`,
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: event.title,
      description: event.about,
      images: [event.image],
    },
  };
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateEventStructuredData(event)),
        }}
      />
      <EventPageClient event={event} />
    </>
  );
}
