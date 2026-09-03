import { useId } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../utils/cn'

export default function Select({
  label,
  options,
  error,
  className,
  id,
  ...props
}) {
  const autoId = useId()
  const selectId = id || autoId

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'block w-full appearance-none rounded-lg border bg-white px-3 py-2 pr-9 text-sm',
            'text-gray-900 shadow-sm dark:bg-gray-900 dark:text-gray-100',
            'border-gray-300 dark:border-gray-700',
            'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none',
            error && 'border-rose-500',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">
          {error}
        </p>
      )}
    </div>
  )
}
