'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  newsletter: {
    id: string;
    subject: string;
    content: string;
    sent_at: string;
  };
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    unsubscribed: number;
    openRate: string;
    clickRate: string;
  };
  uniqueOpens: number;
  uniqueClicks: number;
  clicksByUrl: Record<string, number>;
}

interface NewsletterAnalyticsPageProps {
  id: string;
  content: any;
}

export default function NewsletterDetails({ id, content }: NewsletterAnalyticsPageProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, [id]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/newsletters/${id}/analytics`);
      const result = await res.json();
      console.log(result)
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <AnalyticsLoadingSkeleton />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-600 mb-2">Failed to load analytics</p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const engagementRate = ((data.uniqueOpens / data.stats.sent) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.newsletter.subject}
        </h1>
        <p className="text-gray-500">
          Sent on {new Date(data.newsletter.sent_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>

      {/* Stats Grid - Horizontal Layout like the image */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          <StatCard
            label="Total sent"
            value={data.stats.sent.toLocaleString()}
          />
          <StatCard
            label="Open rate"
            value={`${data.stats.openRate}%`}
            subtitle={`${data.uniqueOpens} unique opens`}
          />
          <StatCard
            label="Click rate"
            value={`${data.stats.clickRate}%`}
            subtitle={`${data.uniqueClicks} unique clicks`}
          />
          <StatCard
            label="Engagement"
            value={`${engagementRate}%`}
            subtitle={`${data.stats.unsubscribed} unsubscribed`}
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Newsletter Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Content</h2>
          <div className="space-y-4">
            <p className="text-gray-900">{content}</p>
          </div>
        </div>

        {/* Click Analytics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Link Clicks</h2>
          {Object.keys(data.clicksByUrl).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(data.clicksByUrl)
                .sort(([, a], [, b]) => b - a)
                .map(([url, count]) => (
                  <div key={url} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-sm text-gray-900 truncate" title={url}>
                        {url}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                      <span className="text-xs text-gray-500">clicks</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No link clicks recorded yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Detailed Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DetailedStat
            label="Total Opens"
            value={data.stats.opened}
            percentage={((data.stats.opened / data.stats.sent) * 100).toFixed(1)}
          />
          <DetailedStat
            label="Total Clicks"
            value={data.stats.clicked}
            percentage={((data.stats.clicked / data.stats.sent) * 100).toFixed(1)}
          />
          <DetailedStat
            label="Unsubscribed"
            value={data.stats.unsubscribed}
            percentage={((data.stats.unsubscribed / data.stats.sent) * 100).toFixed(2)}
            isNegative
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  subtitle,
}: {
  label: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <div className="p-6">
      <p className="text-sm text-gray-600 mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  );
}

function DetailedStat({
  label,
  value,
  percentage,
  isNegative = false,
}: {
  label: string;
  value: number;
  percentage: string;
  isNegative?: boolean;
}) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
      <p className={`text-sm ${isNegative ? 'text-red-600' : 'text-green-600'}`}>
        {percentage}% of total
      </p>
    </div>
  );
}

function AnalyticsLoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-6">
              <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-28"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Stats Skeleton */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="h-4 bg-gray-200 rounded w-24 mx-auto mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-16 mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}