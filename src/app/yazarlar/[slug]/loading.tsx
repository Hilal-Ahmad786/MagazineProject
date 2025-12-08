export default function Loading() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Profile Header Skeleton */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Avatar */}
              <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full bg-gray-800 animate-pulse" />
              
              {/* Info */}
              <div className="flex-1">
                <div className="h-8 w-24 bg-gray-800 animate-pulse mb-4" />
                <div className="h-16 w-64 bg-gray-800 animate-pulse mb-4" />
                <div className="h-6 w-48 bg-gray-800 animate-pulse mb-6" />
                <div className="space-y-2 mb-8">
                  <div className="h-4 w-full bg-gray-800 animate-pulse" />
                  <div className="h-4 w-5/6 bg-gray-800 animate-pulse" />
                  <div className="h-4 w-4/6 bg-gray-800 animate-pulse" />
                </div>
                <div className="flex gap-8">
                  <div className="h-10 w-24 bg-gray-800 animate-pulse" />
                  <div className="flex gap-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-10 h-10 bg-gray-800 animate-pulse" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-800 mb-16" />

          {/* Articles Skeleton */}
          <div>
            <div className="h-10 w-64 bg-gray-800 animate-pulse mb-8" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-800 animate-pulse h-40 flex">
                  <div className="w-1 bg-gray-700" />
                  <div className="w-56 bg-gray-700 hidden sm:block" />
                  <div className="flex-1 p-8">
                    <div className="h-4 w-20 bg-gray-700 mb-3" />
                    <div className="h-8 w-3/4 bg-gray-700 mb-2" />
                    <div className="h-4 w-full bg-gray-700 mb-4" />
                    <div className="h-4 w-32 bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
