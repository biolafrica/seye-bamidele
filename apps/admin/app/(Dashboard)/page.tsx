'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalSubscribers: number;
  totalNewsletters: number;
  totalArticles: number;
  totalEvents: number;
}

interface RecentSubscriber {
  id: string;
  email: string;
  name?: string;
  created_at: string;
}

interface RecentArticle {
  id: string;
  title: string;
  created_at: string;
  status?: string;
}

interface DashboardData {
  stats: DashboardStats;
  recentSubscribers: RecentSubscriber[];
  recentArticles: RecentArticle[];
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch('/api/dashboard');
      const result = await res.json();
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <DashboardLoadingSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Failed to load dashboard</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <StatCard
            label="Total Subscribers"
            value={data.stats.totalSubscribers}
            icon="👥"
            href="/admin/subscribers"
          />
          <StatCard
            label="Total Newsletters"
            value={data.stats.totalNewsletters}
            icon="📧"
            href="/admin/newsletters"
          />
          <StatCard
            label="Total Articles"
            value={data.stats.totalArticles}
            icon="📝"
            href="/admin/articles"
          />
          <StatCard
            label="Total Events"
            value={data.stats.totalEvents}
            icon="📅"
            href="/admin/events"
          />
        </div>
      </div>

      {/* Recent Items Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Subscribers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Subscribers</h2>
              <Link
                href="/admin/subscribers"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {data.recentSubscribers.length > 0 ? (
              data.recentSubscribers.map((subscriber) => (
                <SubscriberItem key={subscriber.id} subscriber={subscriber} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No subscribers yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Articles</h2>
              <Link
                href="/admin/articles"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View all →
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {data.recentArticles.length > 0 ? (
              data.recentArticles.map((article) => (
                <ArticleItem key={article.id} article={article} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p className="text-sm">No articles yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number;
  icon: string;
  href: string;
}) {
  return (
    <Link href={href} className="p-6 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-600">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
        {value.toLocaleString()}
      </p>
    </Link>
  );
}

function SubscriberItem({ subscriber }: { subscriber: RecentSubscriber }) {
  const date = new Date(subscriber.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {subscriber.email}
          </p>
          {subscriber.name && (
            <p className="text-sm text-gray-500 truncate">{subscriber.name}</p>
          )}
        </div>
        <div className="ml-4 text-right flex-shrink-0">
          <p className="text-xs text-gray-500">{formattedDate}</p>
          <p className="text-xs text-gray-400">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
}

function ArticleItem({ article }: { article: RecentArticle }) {
  const date = new Date(article.created_at);
  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">
            {article.title}
          </p>
          {article.status && (
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(
                article.status
              )}`}
            >
              {article.status}
            </span>
          )}
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-500">{formattedDate}</p>
          <p className="text-xs text-gray-400">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
}

function DashboardLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-64"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Items Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2].map((cardIndex) => (
          <div key={cardIndex} className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="h-6 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                    <div className="ml-4">
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
