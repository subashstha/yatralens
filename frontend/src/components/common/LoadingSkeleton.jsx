export function DestinationCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="w-full h-56 bg-gray-200 dark:bg-gray-800" />
      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
        </div>
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 w-24 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-800" />
      <div className="p-5 space-y-3">
        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="h-6 w-full bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
        <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-800 rounded" />
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}
