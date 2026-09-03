import { Search, X } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  ariaLabel = 'Search',
  ...props
}) {
  return (
    <div className={cn('relative', className)}>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-9 text-sm',
          'text-gray-900 placeholder:text-gray-400 shadow-sm',
          'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none'
        )}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange({ target: { value: '' } })}
          aria-label="Clear search"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-0.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
