'use client'

import { useEffect, useState } from "react";
import { DashboardData } from "@/types/dashboard";
import { DashboardLoadingSkeleton } from "@/components/skeleton/DashboardLoading";
import { ErrorState } from "@/components/Error/dashboard";
import PageHeader from "@/components/common/PageHeader";
import { StatCard } from "@/components/card/dashboard";
import { ArchiveBoxIcon, CalendarDaysIcon, EnvelopeIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { RecentListCard } from "@/components/card/recentListCard";
import { ArticleItem, SubscriberItem } from "./DashboardItem";

export default function DashboardClient() {
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
    return <ErrorState message="Failed to load dashboard" onRetry={fetchDashboardData} />;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      <PageHeader
        heading="Dashboard"
        subHeading="Welcome back! Here's what's happening."
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <StatCard
            label="Total Subscribers"
            value={data.stats.totalSubscribers}
            icon={<UserGroupIcon className='w-5 h-5 text-blue-500'/>}
            href="/newsletter"
          />
          <StatCard
            label="Total Newsletters"
            value={data.stats.totalNewsletters}
            icon={<EnvelopeIcon className='w-5 h-5 text-green-500'/>}
            href="/newsletter"
          />
          <StatCard
            label="Total Articles"
            value={data.stats.totalArticles}
            icon={<ArchiveBoxIcon className='w-5 h-5 text-purple-500'/>}
            href="/articles"
          />
          <StatCard
            label="Total Events"
            value={data.stats.totalEvents}
            icon={<CalendarDaysIcon className='w-5 h-5 text-yellow-500'/>}
            href="/events"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
        <RecentListCard
          title="Recent Subscribers"
          viewAllHref="/newsletter"
          items={data.recentSubscribers}
          emptyMessage="No subscribers yet"
          renderItem={(subscriber) => (
            <SubscriberItem key={subscriber.id} subscriber={subscriber} />
          )}
        />

        <RecentListCard
          title="Recent Articles"
          viewAllHref="/articles"
          items={data.recentArticles}
          emptyMessage="No articles yet"
          renderItem={(article) => (
            <ArticleItem key={article.id} article={article} />
          )}
        />

      </div>
    </div>
  );
}
