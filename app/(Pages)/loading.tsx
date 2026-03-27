export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto py-20 px-4 animate-pulse">
      {/* Breadcrumb skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-16 rounded bg-navy-lighter" />
        <div className="h-4 w-4 rounded bg-navy-lighter" />
        <div className="h-4 w-24 rounded bg-navy-lighter" />
      </div>
      {/* Title skeleton */}
      <div className="h-10 w-64 rounded bg-navy-lighter mb-8" />
      {/* Content skeletons */}
      <div className="space-y-4">
        <div className="h-4 w-full rounded bg-navy-lighter" />
        <div className="h-4 w-5/6 rounded bg-navy-lighter" />
        <div className="h-4 w-4/6 rounded bg-navy-lighter" />
      </div>
      {/* Card grid skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="rounded-lg border border-navy-lighter p-6">
            <div className="h-40 rounded bg-navy-lighter mb-4" />
            <div className="h-5 w-3/4 rounded bg-navy-lighter mb-2" />
            <div className="h-4 w-full rounded bg-navy-lighter" />
          </div>
        ))}
      </div>
    </div>
  );
}
