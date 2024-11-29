'use client';

import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { toast } from 'sonner';

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
    };
  };
}

export function TicketView({ participant }: TicketViewProps) {
  const handleDownload = () => {
    // Implement PDF download logic
    toast.success('Biletul a fost descărcat!');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Biletul meu',
        text: 'Voi participa la acest eveniment!',
        url: window.location.href,
      });
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="text-center space-y-2 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Bilet de participare</h1>
            <p className="text-sm text-gray-500">
              Acest bilet este doar informativ, nu trebuie să îl prezinți la eveniment
            </p>
          </div>

          {/* Ticket details */}
          <div className="space-y-4">
            <div className="border-t border-b border-dashed border-gray-200 py-4 space-y-2">
              <h2 className="font-semibold text-lg">{participant.eventId.title}</h2>
              <p className="text-gray-600">
                {participant.eventId.day} {participant.eventId.month}, {participant.eventId.hour}
              </p>
              <p className="text-gray-600">{participant.eventId.location}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{participant.email}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-500">Telefon</p>
              <p className="font-medium">{participant.phoneNumber}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Button onClick={handleDownload} className="w-full gap-2">
              <Download className="w-4 h-4" />
              Descarcă PDF
            </Button>
            <Button onClick={handleShare} variant="outline" className="w-full gap-2">
              <Share2 className="w-4 h-4" />
              Distribuie
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Acest bilet este doar informativ și nu trebuie prezentat la intrarea în eveniment. Te
            așteptăm cu drag!
          </p>
        </div>
      </div>
    </div>
  );
}
