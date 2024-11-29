import { Skeleton } from '@/components/ui/skeleton';

export function TimelineEventSkeleton() {
  return (
    <div className="ml-16 md:ml-32 max-w-full md:max-w-3xl animate-in fade-in duration-700">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-40 md:h-auto">
            <Skeleton className="w-full h-full" />
          </div>
          <div className="flex-1 p-3 md:p-5 space-y-4">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-16 w-full" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
