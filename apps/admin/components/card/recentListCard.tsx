import Link from "next/link";

interface RecentListCardProps<T> {
  title: string;
  viewAllHref: string;
  items: T[];
  emptyMessage: string;
  renderItem: (item: T) => React.ReactNode;
}

export function RecentListCard<T>({
  title,
  viewAllHref,
  items,
  emptyMessage,
  renderItem,
}: RecentListCardProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

          <Link
            href={viewAllHref}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            View all →
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {items.length > 0 ? (
          items.map((item) => renderItem(item))
        ) : (
          <div className="p-8 text-center text-gray-500">
            <p className="text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}
