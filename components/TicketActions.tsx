'use client';

import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { generateTicketPDF } from '@/utils/pdfUtils';
import { shareTicket } from '@/utils/shareUtils';
import { RefObject } from 'react';

interface TicketActionsProps {
  ticketRef: RefObject<HTMLDivElement>;
}

export function TicketActions({ ticketRef }: TicketActionsProps) {
  const handleDownload = async () => {
    if (!ticketRef.current) return;

    toast.loading('Se generează PDF-ul...', { id: 'pdf-loading' });

    const success = await generateTicketPDF(ticketRef.current);

    if (success) {
      toast.success('Biletul a fost descărcat cu succes!', { id: 'pdf-loading' });
    } else {
      toast.error('A apărut o eroare la descărcarea biletului', { id: 'pdf-loading' });
    }
  };

  const handleShare = async () => {
    const result = await shareTicket();

    if (result.success) {
      if (result.copied) {
        toast.success('Link-ul a fost copiat în clipboard!');
      } else {
        toast.success('Mulțumim pentru distribuire!');
      }
    } else {
      toast.error('Nu s-a putut distribui biletul');
    }
  };

  return (
    <div className="p-4 space-y-3">
      <Button
        onClick={handleDownload}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-2"
      >
        <Download className="h-5 w-5" />
        Descarcă Bilet
      </Button>
      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Share2 className="h-5 w-5" />
        Distribuie
      </Button>
    </div>
  );
}