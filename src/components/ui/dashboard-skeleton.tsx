import { Skeleton } from "./skeleton"

export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-4 sm:gap-8 max-w-4xl mx-auto w-full">
      {/* Your Website Card Skeleton */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-none sm:rounded-lg shadow-lg p-4 sm:p-8 flex flex-col gap-6 items-center min-h-[240px] w-full">
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-16" />
              </div>
              <Skeleton className="h-3 w-24 mt-1" />
              <Skeleton className="h-3 w-48 mt-1" />
            </div>
          </div>
          <Skeleton className="h-6 w-12" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-16" />
                <Skeleton className="h-7 w-20" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-7 w-16" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Lockers Card Skeleton */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-none sm:rounded-lg shadow-lg p-4 sm:p-8 flex flex-col gap-6 items-center min-h-[240px] w-full">
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-6 w-24" />
              </div>
              <Skeleton className="h-3 w-48 mt-1" />
            </div>
          </div>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="w-full mt-4">
          <Skeleton className="h-3 w-24 mb-2" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-5 w-8 rounded-full" />
                </div>
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Card Skeleton */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-none sm:rounded-lg shadow-lg p-4 sm:p-8 flex flex-col gap-6 items-center min-h-[240px] w-full">
        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-md" />
            <div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-3 w-32 mt-1" />
            </div>
          </div>
          <Skeleton className="h-6 w-28" />
        </div>
        <div className="w-full mt-4">
          <Skeleton className="h-3 w-20 mb-2" />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-6 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 