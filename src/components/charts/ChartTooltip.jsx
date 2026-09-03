export default function ChartTooltip({ active, payload, label, formatValue }) {
  if (!active || !payload || payload.length === 0) return null

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-900">
      <p className="mb-1.5 font-medium text-gray-900 dark:text-gray-100">
        {label}
      </p>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-6"
          >
            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color || entry.fill }}
                aria-hidden="true"
              />
              {entry.name}
            </span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">
              {formatValue ? formatValue(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
