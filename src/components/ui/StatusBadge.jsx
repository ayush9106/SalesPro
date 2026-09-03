import { getStatusStyles } from '../../utils/styles'
import { cn } from '../../utils/cn'

export default function StatusBadge({ status }) {
  const styles = getStatusStyles(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        styles.badge
      )}
    >
      <span
        className={cn('h-1.5 w-1.5 rounded-full', styles.dot)}
        aria-hidden="true"
      />
      <span className="capitalize">{status}</span>
    </span>
  )
}
