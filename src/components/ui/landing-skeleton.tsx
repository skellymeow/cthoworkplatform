import { Skeleton } from "./skeleton"

export function LandingSkeleton() {
  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* Header skeleton */}
      <div className="border-b border-zinc-800 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>

      {/* Hero Section skeleton */}
      <section className="min-h-[85vh] flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Content */}
            <div className="text-left">
              <Skeleton className="h-16 w-96 mb-6" />
              <Skeleton className="h-6 w-80 mb-8" />
              <Skeleton className="h-14 w-48" />
            </div>

            {/* Right Side - Social Media Logos */}
            <div className="flex flex-col items-center lg:items-end justify-center space-y-8">
              <div className="text-center lg:text-right mb-8">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-2xl" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section skeleton */}
      <section className="min-h-screen flex items-center justify-center bg-black px-4 py-12 sm:py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-3 sm:mb-4" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center group p-4 sm:p-6">
                <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full mx-auto mb-4 sm:mb-6" />
                <Skeleton className="h-6 w-48 mx-auto mb-3 sm:mb-4" />
                <Skeleton className="h-4 w-full mx-auto" />
                <Skeleton className="h-4 w-3/4 mx-auto mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 