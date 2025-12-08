export default function Loading() {
  return (
    <main className="min-h-screen">
      {/* Hero Skeleton */}
      <section className="min-h-[70vh] flex items-center justify-center pt-32 pb-20">
        <div className="px-6 md:px-12 w-full">
          <div className="max-w-[1200px] mx-auto text-center">
            <div className="h-8 w-32 bg-gray-800 animate-pulse mx-auto mb-8" />
            <div className="h-20 w-3/4 bg-gray-800 animate-pulse mx-auto mb-4" />
            <div className="h-20 w-2/3 bg-gray-800 animate-pulse mx-auto mb-4" />
            <div className="h-20 w-1/2 bg-gray-800 animate-pulse mx-auto mb-8" />
            <div className="h-6 w-2/3 bg-gray-800 animate-pulse mx-auto mb-2" />
            <div className="h-6 w-1/2 bg-gray-800 animate-pulse mx-auto" />
          </div>
        </div>
      </section>

      {/* Mission & Vision Skeleton */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="h-80 bg-gray-800 animate-pulse" />
            <div className="h-80 bg-gray-800 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Values Skeleton */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="h-4 w-24 bg-gray-800 animate-pulse mx-auto mb-4" />
            <div className="h-12 w-64 bg-gray-800 animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-gray-800 animate-pulse" />
            ))}
          </div>
        </div>
      </section>

      {/* Team Skeleton */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="h-4 w-24 bg-gray-800 animate-pulse mx-auto mb-4" />
            <div className="h-12 w-80 bg-gray-800 animate-pulse mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-800 animate-pulse mx-auto mb-6" />
                <div className="h-6 w-32 bg-gray-800 animate-pulse mx-auto mb-2" />
                <div className="h-4 w-24 bg-gray-800 animate-pulse mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
