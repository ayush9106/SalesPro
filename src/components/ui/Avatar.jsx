import { getNameColor, getInitials } from '../../utils/styles'
import { cn } from '../../utils/cn'

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-14 w-14 text-lg',
}

export default function Avatar({ name, src, size = 'md', className }) {
  if (src) {
    return (
      <img
        src={src}
        alt={`${name}'s avatar`}
        className={cn(
          'shrink-0 rounded-full object-cover ring-1 ring-gray-200 dark:ring-gray-700',
          sizes[size],
          className
        )}
      />
    )
  }

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white',
        sizes[size],
        getNameColor(name),
        className
      )}
      aria-hidden="true"
    >
      {getInitials(name)}
    </span>
  )
}
