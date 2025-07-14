import { Skeleton } from "./skeleton"

export function ContentLockersSkeleton() {
  return (
    <div className="flex-1 w-full px-6 py-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      {/* Left: Create Locker */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        {/* Form fields */}
        <div className="flex flex-col gap-4 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>
        
        <Skeleton className="h-12 w-full rounded-lg mt-2" />
      </div>

      {/* Right: Manage Lockers */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        <div className="flex flex-col gap-3 w-full">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
              <div className="flex flex-col">
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 