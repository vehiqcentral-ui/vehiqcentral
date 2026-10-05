'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

interface DonutChartProps {
  title?: string;
  data: DonutSlice[];
  centerLabel?: string;
  centerValue?: string;
  size?: number;
}

export function DonutChart({
  title,
  data,
  centerLabel,
  centerValue,
  size = 220,
}: DonutChartProps) {
  const innerRadius = size * 0.32;
  const outerRadius = size * 0.45;

  return (
    <div className="flex flex-col gap-4">
      {title && <p className="text-sm font-semibold text-brand-teal">{title}</p>}

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div style={{ width: size, height: size }} className="relative flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                dataKey="value"
                strokeWidth={2}
                stroke="#fff"
              >
                {data.map((slice, i) => (
                  <Cell key={i} fill={slice.color} />
                ))}
              </Pie>
              <Tooltip
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                formatter={(val: number, _: string, entry: any) => [
                  val,
                  (entry?.payload as DonutSlice)?.label ?? '',
                ]}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #e2e8f0',
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {(centerLabel || centerValue) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              {centerValue && (
                <span className="text-xl font-bold text-brand-teal leading-none">{centerValue}</span>
              )}
              {centerLabel && (
                <span className="text-xs text-brand-muted mt-0.5">{centerLabel}</span>
              )}
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-2 min-w-0">
          {data.map((slice, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-brand-muted truncate">{slice.label}</span>
              <span className="ml-auto font-semibold text-brand-teal pl-4">{slice.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DonutChart;
