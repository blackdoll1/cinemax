import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendDataPoint {
  date: string;
  value: number;
}

interface TrendChartProps {
  data: TrendDataPoint[];
  title: string;
  color?: string;
  type?: 'line' | 'area';
}

export function TrendChart({ data, title, color = '#F59E0B', type = 'area' }: TrendChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-neutral-900 border border-amber-500/30 rounded-lg p-3 shadow-xl">
          <p className="text-amber-200/60 text-xs mb-1">{payload[0].payload.date}</p>
          <p className="text-white font-bold text-lg">{payload[0].value}€</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-neutral-900 border border-amber-500/10 rounded-2xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <div className="w-1 h-6 bg-amber-500"></div>
        {title}
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        {type === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis
              dataKey="date"
              stroke="#a1a1aa"
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
            />
            <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill="url(#colorValue)"
              animationDuration={1000}
            />
          </AreaChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
            <XAxis
              dataKey="date"
              stroke="#a1a1aa"
              tick={{ fill: '#a1a1aa', fontSize: 12 }}
            />
            <YAxis stroke="#a1a1aa" tick={{ fill: '#a1a1aa' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
