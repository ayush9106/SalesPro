import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import { cn } from '../../utils/cn'

const alignClasses = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

export default function SortHeader({
  label,
  sortKey,
  sortConfig,
  onSort,
  accessor,
  align = 'left',
  className,
}) {
  const isActive = sortConfig?.key === sortKey
  const isAsc = isActive && sortConfig.direction === 'asc'

  return (
    <th
      scope="col"
      className={cn('px-4 py-3', alignClasses[align], className)}
    >
      {sortKey ? (
        <button
          type="button"
          onClick={() => onSort(sortKey, accessor)}
          className={cn(
            'group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors',
            align === 'right' && 'flex-row-reverse',
            isActive
              ? 'text-brand-600 dark:text-brand-400'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          )}
        >
          {label}
          <span aria-hidden="true">
            {isActive ? (
              isAsc ? (
                <ArrowUp className="h-3.5 w-3.5" />
              ) : (
                <ArrowDown className="h-3.5 w-3.5" />
              )
            ) : (
              <ArrowUpDown className="h-3.5 w-3.5 text-gray-300 group-hover:text-gray-400 dark:text-gray-600" />
            )}
          </span>
        </button>
      ) : (
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          {label}
        </span>
      )}
    </th>
  )
}
