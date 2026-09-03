import { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'
import {
  revenueByRange,
  monthlySales,
  customerGrowth,
  conversionByPeriod,
  trafficSources,
} from '../data/analytics'
import ChartCard from '../components/ui/ChartCard'
import RangeSelector from '../components/charts/RangeSelector'
import ChartTooltip from '../components/charts/ChartTooltip'
import { useTheme } from '../hooks/useTheme'
import { formatCompactCurrency, formatNumber } from '../utils/format'

export default function Analytics() {
  const [range, setRange] = useState('30d')
  const { isDark } = useTheme()
  const gridColor = isDark ? '#1f2937' : '#f1f5f9'
  const tickColor = isDark ? '#9ca3af' : '#6b7280'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          In-depth analysis of your business performance.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard
          title="Revenue Trend"
          subtitle="Revenue over selected period"
          actions={<RangeSelector value={range} onChange={setRange} />}
        >
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByRange[range]} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsRevenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3f68ec" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#3f68ec" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="label" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatCompactCurrency(v)} width={48} />
                <Tooltip content={<ChartTooltip formatValue={(v) => formatCompactCurrency(v)} />} cursor={{ stroke: tickColor, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3f68ec" strokeWidth={2.5} fill="url(#analyticsRevenueFill)" activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Monthly Sales vs Target" subtitle="Actual performance against targets">
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} width={48} />
                <Tooltip content={<ChartTooltip formatValue={(v) => v.toLocaleString()} />} cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }} />
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: tickColor }} />
                <Bar dataKey="sales" name="Sales" fill="#3f68ec" radius={[4, 4, 0, 0]} maxBarSize={34} />
                <Bar dataKey="target" name="Target" fill={isDark ? '#334155' : '#e2e8f0'} radius={[4, 4, 0, 0]} maxBarSize={34} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Growth" subtitle="Total customer base over time">
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={customerGrowth} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v)} width={52} />
                <Tooltip content={<ChartTooltip formatValue={(v) => formatNumber(v)} />} cursor={{ stroke: tickColor, strokeDasharray: '4 4' }} />
                <Line type="monotone" dataKey="customers" name="Customers" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Conversion Rate" subtitle="Conversion percentage over time">
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={conversionByPeriod} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                <XAxis dataKey="month" tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} dy={8} />
                <YAxis tick={{ fill: tickColor, fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} width={48} />
                <Tooltip content={<ChartTooltip formatValue={(v) => `${v}%`} />} cursor={{ stroke: tickColor, strokeDasharray: '4 4' }} />
                <Line type="monotone" dataKey="conversion" name="Conversion" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Traffic Sources" subtitle="Where your visitors come from">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="h-64 w-full lg:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={trafficSources}
                  dataKey="value"
                  nameKey="source"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {trafficSources.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                        <p className="text-xs font-semibold text-gray-900 dark:text-gray-100">{data.source}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{data.value}% &middot; {formatNumber(data.visits)} visits</p>
                      </div>
                    )
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-3">
            {trafficSources.map((source) => (
              <div key={source.source} className="flex items-center gap-3">
                <span
                  className="h-3 w-3 shrink-0 rounded-full"
                  style={{ backgroundColor: source.color }}
                  aria-hidden="true"
                />
                <span className="flex-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {source.source}
                </span>
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {source.value}%
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatNumber(source.visits)}
                </span>
                <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 sm:block">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${source.value}%`, backgroundColor: source.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </ChartCard>
    </div>
  )
}
