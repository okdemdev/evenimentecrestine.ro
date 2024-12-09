'use client';

import { ChevronLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function TicketHeader() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    setLoading(true);
    router.push('/');
  };

  return (
    <div className="p-4 space-y-4">
      <Button
        variant="ghost"
        className="flex items-center gap-2"
        onClick={handleBack}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Se încarcă...</span>
          </>
        ) : (
          <>
            <ChevronLeft className="h-5 w-5" />
            <span>Mergi înapoi</span>
          </>
        )}
      </Button>
      <div className="text-center">
        <h1 className="text-lg font-semibold">Bilet</h1>
      </div>
    </div>
  );
}
