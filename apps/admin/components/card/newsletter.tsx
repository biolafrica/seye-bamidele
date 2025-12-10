export function StatCard({
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

export function DetailedStat({
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
