export const CardSkeleton = () => {
  return (
    <div className="animate-pulse border rounded-lg p-6">
      <div className="h-40 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
    </div>
  );
};