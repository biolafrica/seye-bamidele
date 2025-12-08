'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface AnalyticsData {
  newsletter: {
    id: string;
    subject: string;
    sent_at: string;
  };
  stats: {
    sent: number;
    opened: number;
    clicked: number;
    openRate: string;
    clickRate: string;
  };
  uniqueOpens: number;
  uniqueClicks: number;
  clicksByUrl: Record<string, number>;
}

export default function NewsletterAnalyticsPage() {
  const params = useParams();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/newsletters/${params.id}/analytics`);
      const result = await res.json();
      console.log('Fetched analytics:', result);
      if (result.success) {
        setData(result);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading analytics...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Failed to load analytics</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{data.newsletter.subject}</h1>
        <p className="text-gray-600">
          Sent on {new Date(data.newsletter.sent_at).toLocaleString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Sent"
          value={data.stats.sent}
          icon="📧"
        />
        <StatCard
          title="Opened"
          value={`${data.stats.opened} (${data.stats.openRate}%)`}
          icon="📖"
          subtitle={`${data.uniqueOpens} unique`}
        />
        <StatCard
          title="Clicked"
          value={`${data.stats.clicked} (${data.stats.clickRate}%)`}
          icon="🖱️"
          subtitle={`${data.uniqueClicks} unique`}
        />
        <StatCard
          title="Engagement"
          value={`${((data.uniqueOpens / data.stats.sent) * 100).toFixed(1)}%`}
          icon="📊"
        />
      </div>

      {/* Click Details */}
      {Object.keys(data.clicksByUrl).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Link Performance</h2>
          <div className="space-y-3">
            {Object.entries(data.clicksByUrl).map(([url, clicks]) => (
              <div key={url} className="border-b pb-3">
                <div className="flex justify-between items-start">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm flex-1 mr-4"
                  >
                    {url}
                  </a>
                  <span className="text-gray-600 font-medium">
                    {clicks} clicks
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}