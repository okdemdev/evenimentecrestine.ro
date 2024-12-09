'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ParticipateDialog } from './ParticipateDialog';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export function ParticipateButton() {
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const eventId = params.id as string;

  const handleClick = () => {
    setLoading(true);
    setShowDialog(true);
    // Simulate loading for better UX
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Se încarcă...</span>
          </div>
        ) : (
          'Participă'
        )}
      </Button>

      <ParticipateDialog
        eventId={eventId}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}
