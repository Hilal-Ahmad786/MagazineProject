export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          {/* Hero Skeleton */}
          <div className="mb-16">
            <div className="h-16 w-64 bg-gray-800 animate-pulse mb-6" />
            <div className="h-6 w-96 bg-gray-800 animate-pulse" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex gap-3 mb-12">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-24 bg-gray-800 animate-pulse" />
            ))}
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-gray-800 animate-pulse">
                <div className="h-48 bg-gray-700" />
                <div className="p-6">
                  <div className="h-4 w-16 bg-gray-700 mb-4" />
                  <div className="h-6 w-full bg-gray-700 mb-2" />
                  <div className="h-4 w-3/4 bg-gray-700 mb-4" />
                  <div className="h-4 w-1/2 bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
