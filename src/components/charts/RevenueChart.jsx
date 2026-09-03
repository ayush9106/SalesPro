import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import ChartTooltip from './ChartTooltip'
import { formatCompactCurrency } from '../../utils/format'
import { useTheme } from '../../hooks/useTheme'

export default function RevenueChart({ data }) {
  const { isDark } = useTheme()
  const gridColor = isDark ? '#1f2937' : '#f1f5f9'
  const tickColor = isDark ? '#9ca3af' : '#6b7280'

  return (
    <div className="h-72 w-full sm:h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3f68ec" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#3f68ec" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: tickColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fill: tickColor, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => formatCompactCurrency(value)}
            width={48}
          />
          <Tooltip
            content={
              <ChartTooltip
                formatValue={(value) => formatCompactCurrency(value)}
              />
            }
            cursor={{ stroke: tickColor, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#3f68ec"
            strokeWidth={2.5}
            fill="url(#revenueFill)"
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
