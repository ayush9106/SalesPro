import { useId } from 'react'
import { cn } from '../../utils/cn'

export default function Input({
  label,
  error,
  hint,
  className,
  id,
  ...props
}) {
  const autoId = useId()
  const inputId = id || autoId

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'block w-full rounded-lg border bg-white px-3 py-2 text-sm',
          'text-gray-900 placeholder:text-gray-400 shadow-sm',
          'dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-500',
          'border-gray-300 dark:border-gray-700',
          'focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30 focus:outline-none',
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/30'
            : 'border-gray-300',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={
          error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
        }
        {...props}
      />
      {error ? (
        <p
          id={`${inputId}-error`}
          className="mt-1.5 text-sm text-rose-600 dark:text-rose-400"
        >
          {error}
        </p>
      ) : hint ? (
        <p
          id={`${inputId}-hint`}
          className="mt-1.5 text-sm text-gray-500 dark:text-gray-400"
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
