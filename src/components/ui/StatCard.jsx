import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react'
import { formatCompactCurrency, formatNumber } from '../../utils/format'
import { cn } from '../../utils/cn'

const icons = {
  dollar: DollarSign,
  cart: ShoppingCart,
  users: Users,
  trending: TrendingUp,
}

const accentStyles = {
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  emerald:
    'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
}

export default function StatCard({ kpi }) {
  const Icon = icons[kpi.icon] || DollarSign
  const isNegative = kpi.change < 0
  const value =
    kpi.id === 'revenue'
      ? formatCompactCurrency(kpi.value)
      : kpi.id === 'conversion'
      ? `${kpi.value}%`
      : formatNumber(kpi.value)

  return (
    <div className="card flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {kpi.label}
          </p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {value}
          </p>
        </div>
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            accentStyles[kpi.accent]
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
            isNegative
              ? 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'
              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400'
          )}
        >
          <TrendingUp
            className={cn('h-3 w-3', isNegative && 'rotate-180')}
            aria-hidden="true"
          />
          {isNegative ? '' : '+'}
          {kpi.change}%
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {kpi.comparison}
        </span>
      </div>
    </div>
  )
}
