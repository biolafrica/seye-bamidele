'use client';

import { useEffect, useState } from 'react';
import { AnalyticsLoadingSkeleton } from '../skeleton/AnalyticLoading';
import { DetailedStat, StatCard } from '../card/newsletter';
import { AnalyticsData, NewsletterAnalyticsPageProps } from '@/types/newsletter';
import { ErrorState } from '../Error/dashboard';
import { formatDate, formatTime } from '@seye-bamidele/ui';

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
    return <ErrorState message="Failed to load analytics" onRetry={fetchAnalytics} />;
  }

  const engagementRate = ((data.uniqueOpens / data.stats.sent) * 100).toFixed(1);

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {data.newsletter.subject}
        </h1>
        <p className="text-gray-500">
          Sent on {formatDate(data.newsletter.sent_at)} at {formatTime(data.newsletter.sent_at)} &bull;
        </p>
      </div>

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


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
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
