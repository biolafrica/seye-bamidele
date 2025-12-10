import { getStatusColor } from "@/app/utils/common/getStatusColor";
import { BaseListItemProps, ListItemContentProps, RecentArticle, RecentSubscriber } from "@/types/dashboard";
import { formatDate, formatTime } from "@seye-bamidele/ui";

export function ListItem({
  content,
  timestamp,
  className = "p-4 hover:bg-gray-50 transition-colors",
}: BaseListItemProps & { content: ListItemContentProps }) {
  return (
    <div className={className}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900">
            {content.primary}
          </div>
          {content.secondary && (
            <div className="text-sm text-gray-500">
              {content.secondary}
            </div>
          )}
          {content.badge && (
            <div className="mt-1">
              {content.badge}
            </div>
          )}
        </div>
        
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-500">{formatDate(timestamp)}</p>
          <p className="text-xs text-gray-400">{formatTime(timestamp)}</p>
        </div>
      </div>
    </div>
  );
}

export function SubscriberItem({ subscriber }: { subscriber: RecentSubscriber }) {
  return (
    <ListItem
      content={{
        primary: <span className="truncate">{subscriber.email}</span>,
        secondary: subscriber.name && (
          <span className="truncate">{subscriber.name}</span>
        ),
      }}
      timestamp={subscriber.created_at}
    />
  );
}

export function ArticleItem({ article }: { article: RecentArticle }) {
  return (
    <ListItem
      content={{
        primary: <span className="line-clamp-2">{article.title}</span>,
        badge: article.status && (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
              article.status
            )}`}
          >
            {article.status}
          </span>
        ),
      }}
      timestamp={article.created_at}
    />
  );
}