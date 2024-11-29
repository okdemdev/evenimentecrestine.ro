import { Skeleton } from '@/components/ui/skeleton';

export function EventPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-in fade-in duration-700">
      <div className="hidden lg:grid grid-cols-2 gap-8 max-w-7xl mx-auto p-4 lg:p-8">
        {/* Image skeleton */}
        <Skeleton className="aspect-video w-full rounded-[24px]" />

        {/* Content skeleton */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 space-y-8">
          <div className="flex justify-between">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <div className="flex justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </div>

          <div className="space-y-4">
            <Skeleton className="h-24 rounded-lg" />
            <Skeleton className="h-24 rounded-lg" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
