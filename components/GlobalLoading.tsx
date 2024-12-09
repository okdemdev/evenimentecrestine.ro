import { LoadingSpinner } from '@/components/LoadingSpinner';

interface GlobalLoadingProps {
  message?: string;
}

export function GlobalLoading({ message = 'Se încarcă...' }: GlobalLoadingProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
