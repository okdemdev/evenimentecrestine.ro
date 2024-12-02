'use client';
import { TicketActions } from './TicketActions';
import { TicketBarcode } from './TicketBarcode';
import { TicketDetails } from './TicketDetails';
import { TicketHeader } from './TicketHeader';
import { TicketImage } from './TicketImage';
import { useRef } from 'react';

interface TicketViewProps {
  participant: {
    email: string;
    phoneNumber: string;
    eventId: {
      title: string;
      location: string;
      day: string;
      month: string;
      hour: string;
      image?: string;
      organizer: string;
    };
  };
}

export function TicketView({ participant }: TicketViewProps) {
  const ticketRef = useRef<HTMLDivElement>(null);

  const formatDate = () => {
    return `${participant.eventId.month} ${participant.eventId.day}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div ref={ticketRef} className="max-w-md mx-auto bg-white rounded-xl shadow-sm">
        <TicketHeader />
        <TicketImage imageUrl={participant.eventId.image} />
        <TicketDetails
          eventTitle={participant.eventId.title}
          organizer={participant.eventId.organizer}
          location={participant.eventId.location}
          name={participant.email.split('@')[0]}
          seat="Fără loc"
          date={formatDate()}
          time={participant.eventId.hour}
        />
        <TicketBarcode />
        <TicketActions ticketRef={ticketRef} />
        <div className="text-center text-sm text-gray-500 p-4">
          <p>Acest bilet este doar informativ și nu trebuie prezentat la intrarea în eveniment.</p>
          <p className="mt-1">Te așteptăm cu drag!</p>
        </div>
      </div>
    </div>
  );
}
