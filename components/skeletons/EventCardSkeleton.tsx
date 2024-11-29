import { Skeleton } from '@/components/ui/skeleton';

export function EventCardSkeleton() {
  return (
    <div className="w-[240px] md:w-[300px] shrink-0 bg-white rounded-lg border border-gray-100 animate-in fade-in duration-700">
      <div className="relative w-full pb-[56.25%]">
        <Skeleton className="absolute inset-0 rounded-t-lg" />
      </div>
      <div className="p-3 md:p-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex justify-between gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-32" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </div>
  );
}
