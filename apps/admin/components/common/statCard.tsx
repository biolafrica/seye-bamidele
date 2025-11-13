"use client";

import {
  UserGroupIcon,
  EnvelopeIcon,
  CalendarDateRangeIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  link: string;
}

const StatCard = ({ icon, label, value, link}: StatCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between transition hover:shadow-md">
      <div className="flex items-center gap-4 p-6">
        <div className="bg-accent-hover text-white p-3 rounded-xl">
          {icon}
        </div>
        <div>
          <p className="text-secondary text-sm font-medium">{label}</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-text">{value}</h3>
          </div>
        </div>
      </div>
      <div className="px-6 py-3 border-t border-separate">
        <Link href={link} className="text-accent text-sm font-semibold hover:underline">
          View all
        </Link>
      </div>
    </div>
  );
};

export default function StatsCards() {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 ">
      <StatCard
        icon={<UserGroupIcon className="h-6 w-6" />}
        label="Total Subscribers"
        value="1000"
        link="/subscribers"
      />
      <StatCard
        icon={<EnvelopeIcon className="h-6 w-6" />}
        label="Total Articles"
        value="6"
        link="/articles"
      />
      <StatCard
        icon={<CalendarDateRangeIcon className="h-6 w-6" />}
        label="Total Events"
        value="7"
        link="/events"
      />
    </div>
  );
}

