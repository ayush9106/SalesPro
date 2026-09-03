import { cn } from '../../utils/cn'

const options = [
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '6m', label: '6 months' },
  { value: '1y', label: '1 year' },
]

export default function RangeSelector({ value, onChange }) {
  return (
    <div
      className="inline-flex items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800"
      role="group"
      aria-label="Date range"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={cn(
            'rounded-md px-2.5 py-1 text-xs font-medium transition-colors sm:px-3',
            value === option.value
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
