import { cn } from '../../utils/cn'

export default function ChartCard({
  title,
  subtitle,
  actions,
  children,
  className,
  footer,
}) {
  return (
    <section className={cn('card flex flex-col', className)}>
      <div className="flex flex-wrap items-start justify-between gap-3 px-5 pt-5">
        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {actions}
      </div>
      <div className="flex-1 px-2 pb-3 pt-4">{children}</div>
      {footer && <div className="border-t px-5 py-3">{footer}</div>}
    </section>
  )
}
