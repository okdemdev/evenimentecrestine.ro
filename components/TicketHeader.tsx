'use client';

import { ChevronLeft, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function TicketHeader() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between p-4">
      <Button variant="ghost" size="icon" onClick={() => router.push('/')}>
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <h1 className="text-lg font-semibold">Bilet</h1>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-6 w-6" />
      </Button>
    </div>
  );
}
