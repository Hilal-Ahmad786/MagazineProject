import { Skeleton } from '@/components/ui/Skeleton';

export default function IssueDetailLoading() {
  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Cover Image Skeleton */}
            <div className="max-w-md mx-auto lg:mx-0">
              <Skeleton className="aspect-[3/4] w-full rounded-2xl" />
            </div>

            {/* Issue Info Skeleton */}
            <div className="space-y-8">
              {/* Back Link */}
              <Skeleton className="h-5 w-28" />

              {/* Issue Number & Theme */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <Skeleton className="h-14 w-full" />
                <Skeleton className="h-14 w-3/4" />
                <Skeleton className="h-6 w-48" />
              </div>

              {/* Stats */}
              <div className="flex gap-6">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>

              {/* Editor's Note */}
              <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                <Skeleton className="h-6 w-32 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Skeleton className="h-12 w-40 rounded-lg" />
                <Skeleton className="h-12 w-36 rounded-lg" />
              </div>

              {/* Share */}
              <div className="pt-4 border-t border-neutral-800">
                <Skeleton className="h-4 w-32 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Skeleton */}
      <section className="py-16 bg-neutral-900/50">
        <div className="container mx-auto px-4">
          <Skeleton className="h-9 w-40 mb-8" />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center gap-6 p-4 bg-neutral-900 rounded-xl border border-neutral-800"
              >
                <Skeleton className="h-8 w-8" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Issues Skeleton */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <Skeleton className="h-9 w-40" />
            <Skeleton className="h-5 w-24" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-neutral-900 rounded-xl p-4 border border-neutral-800">
                <Skeleton className="aspect-[3/4] w-full rounded-lg mb-4" />
                <Skeleton className="h-5 w-20 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
