'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface DataPoint {
  [key: string]: string | number;
}

interface BarConfig {
  key: string;
  color?: string;
  label?: string;
}

interface StatsChartProps {
  data: DataPoint[];
  bars?: BarConfig[];
  xKey?: string;
  height?: number;
  title?: string;
  className?: string;
}

export function StatsChart({
  data,
  bars,
  xKey = 'name',
  height = 280,
  title,
  className,
}: StatsChartProps) {
  const defaultColors = ['#0d9488', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];

  const resolvedBars: BarConfig[] = bars ??
    Object.keys(data[0] ?? {})
      .filter((k) => k !== xKey)
      .map((k, i) => ({ key: k, color: defaultColors[i % defaultColors.length], label: k }));

  return (
    <div className={className}>
      {title && <p className="mb-3 text-sm font-semibold text-brand-teal">{title}</p>}
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey={xKey}
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#64748b' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: '1px solid #e2e8f0',
            }}
          />
          {resolvedBars.length > 1 && <Legend iconSize={10} wrapperStyle={{ fontSize: 11 }} />}
          {resolvedBars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.label ?? bar.key}
              fill={bar.color ?? '#0d9488'}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatsChart;
