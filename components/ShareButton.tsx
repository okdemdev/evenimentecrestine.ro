'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function ShareButton() {
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    // Set the URL only after component mounts (client-side)
    setShareUrl(window.location.href);
  }, []);

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareUrl)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button variant="outline" className="gap-2" onClick={shareOnWhatsApp}>
      <Share2 className="w-4 h-4" />
      Share
    </Button>
  );
}
