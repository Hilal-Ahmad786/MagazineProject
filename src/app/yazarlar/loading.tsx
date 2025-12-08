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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-32 bg-gray-800 animate-pulse" />
            ))}
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-gray-800 animate-pulse p-8 text-center">
                <div className="w-28 h-28 rounded-full bg-gray-700 mx-auto mb-6" />
                <div className="h-6 w-32 bg-gray-700 mx-auto mb-2" />
                <div className="h-4 w-24 bg-gray-700 mx-auto mb-4" />
                <div className="h-4 w-full bg-gray-700 mb-2" />
                <div className="h-4 w-3/4 bg-gray-700 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
