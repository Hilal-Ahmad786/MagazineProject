export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-12">
            <div className="flex gap-3 mb-6">
              <div className="h-8 w-24 bg-gray-800 animate-pulse" />
              <div className="h-8 w-20 bg-gray-800 animate-pulse" />
            </div>
            <div className="h-16 w-full bg-gray-800 animate-pulse mb-4" />
            <div className="h-8 w-2/3 bg-gray-800 animate-pulse mb-8" />
            <div className="flex items-center gap-6 pb-8 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-800 animate-pulse" />
                <div>
                  <div className="h-4 w-32 bg-gray-800 animate-pulse mb-2" />
                  <div className="h-3 w-24 bg-gray-700 animate-pulse" />
                </div>
              </div>
              <div className="h-4 w-40 bg-gray-800 animate-pulse" />
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-4 bg-gray-800 animate-pulse" style={{ width: `${Math.random() * 30 + 70}%` }} />
            ))}
            <div className="h-4 w-0" />
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-gray-800 animate-pulse" style={{ width: `${Math.random() * 30 + 70}%` }} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
