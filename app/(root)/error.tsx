'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center">
      <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
      <Button
        onClick={() => reset()}
        className="bg-[#6a7bff] hover:bg-[#6a7bff]/90 text-white"
      >
        Try again
      </Button>
    </div>
  );
} 