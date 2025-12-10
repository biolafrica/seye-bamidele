import Link from "next/link";

export function StatCard({
  label,
  value,
  icon,
  href,
}: {
  label: string;
  value: number;
  icon: any;
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