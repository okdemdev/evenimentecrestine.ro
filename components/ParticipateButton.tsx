'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ParticipateDialog } from './ParticipateDialog';
import { useParams } from 'next/navigation';

export function ParticipateButton() {
  const [showDialog, setShowDialog] = useState(false);
  const params = useParams();
  const eventId = params.id as string;

  return (
    <>
      <Button
        onClick={() => setShowDialog(true)}
        className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white"
      >
        Participă
      </Button>

      <ParticipateDialog
        eventId={eventId}
        isOpen={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </>
  );
}
