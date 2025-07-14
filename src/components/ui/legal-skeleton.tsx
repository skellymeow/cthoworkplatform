import { Skeleton } from "./skeleton"

export function LegalSkeleton() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-16 w-96 mb-4" />
          <Skeleton className="h-6 w-80" />
        </div>

        {/* Content */}
        <div className="space-y-8">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-6 w-48 mb-3" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 