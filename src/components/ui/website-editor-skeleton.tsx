import { Skeleton } from "./skeleton"

export function WebsiteEditorSkeleton() {
  return (
    <div className="flex-1 w-full px-6 py-8 flex flex-col md:flex-row gap-8 max-w-7xl mx-auto">
      {/* Left: Editor Form */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
        
        {/* Form fields */}
        <div className="flex flex-col gap-4 w-full">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>
        </div>

        {/* Social links section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-4 border border-zinc-800 rounded-lg">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="w-6 h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg shadow-lg p-8 flex flex-col gap-6 min-h-[400px]">
        <div className="flex items-center gap-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-md" />
          <Skeleton className="h-6 w-24" />
        </div>
        
        {/* Preview container */}
        <div className="flex-1 bg-black border border-zinc-800 rounded-lg p-6 flex flex-col items-center justify-center">
          <Skeleton className="w-16 h-16 rounded-full mb-4" />
          <Skeleton className="h-6 w-32 mb-2" />
          <Skeleton className="h-4 w-48 mb-6" />
          <div className="w-full space-y-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 