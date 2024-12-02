'use client';

import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function TicketActions() {
  const handleDownload = () => {
    toast.success('Biletul a fost descărcat cu succes!');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Biletul meu',
        text: 'Voi participa la acest eveniment!',
        url: window.location.href,
      });
    } catch (err) {
      toast.error('Partajarea nu a fost posibilă');
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
