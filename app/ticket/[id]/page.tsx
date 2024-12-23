import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Participant } from '@/models/Participant';
import dbConnect from '@/lib/mongodb';
import { TicketView } from '@/components/TicketView';
import { ObjectId } from 'mongodb';
import { LoadingSpinner } from '@/components/LoadingSpinner';

export default async function TicketPage({ params }: { params: { id: string } }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-sm text-muted-foreground">Se încarcă biletul...</p>
        </div>
      }
    >
      <TicketContent id={params.id} />
    </Suspense>
  );
}

async function TicketContent({ id }: { id: string }) {
  try {
    await dbConnect();

    // Validate ID format first
    if (!ObjectId.isValid(id)) {
      notFound();
    }

    // Use lean() to get a plain JavaScript object instead of a Mongoose document
    const participant = await Participant.findById(id).populate('eventId').lean().exec();

    if (!participant) {
      notFound();
    }

    // Convert _id to string to prevent circular reference
    const sanitizedParticipant = JSON.parse(JSON.stringify(participant));

    return <TicketView participant={sanitizedParticipant} />;
  } catch (error) {
    console.error('Ticket page error:', error);
    notFound();
  }
}
