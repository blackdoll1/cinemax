import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function StatCard({ title, value, icon, trend, subtitle }: StatCardProps) {
  return (
    <div className="group relative bg-neutral-900 border border-amber-500/10 rounded-2xl p-6 overflow-hidden hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5">
      {/* Effet de brillance au survol */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="bg-amber-500/10 backdrop-blur-sm p-3 rounded-xl group-hover:bg-amber-500/20 transition-colors">
            {icon}
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                trend.isPositive
                  ? 'bg-green-500/10 text-green-400'
                  : trend.value === 0
                  ? 'bg-neutral-700 text-neutral-400'
                  : 'bg-red-500/10 text-red-400'
              }`}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : trend.value === 0 ? (
                <Minus className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div>
          <div className="text-sm font-medium text-amber-200/60 mb-1">{title}</div>
          <div className="text-3xl font-bold text-white mb-1">{value}</div>
          {subtitle && <div className="text-xs text-neutral-400">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}
