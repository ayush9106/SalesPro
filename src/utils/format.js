const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const numberFormatter = new Intl.NumberFormat('en-US')

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatCompactCurrency(value) {
  return compactCurrencyFormatter.format(value)
}

export function formatNumber(value) {
  return numberFormatter.format(value)
}

export function formatPercent(value, digits = 1) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(digits)}%`
}

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
})

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
})

export function formatDate(iso) {
  return dateTimeFormatter.format(new Date(iso))
}

export function formatDateTime(iso) {
  const date = dateTimeFormatter.format(new Date(iso))
  const time = timeFormatter.format(new Date(iso))
  return `${date}, ${time}`
}

export function formatRelativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const minutes = Math.round(diff / 60000)
  const hours = Math.round(minutes / 60)
  const days = Math.round(hours / 24)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 30) return `${days}d ago`
  return formatDate(iso)
}

export function truncate(text, length = 30) {
  if (!text) return ''
  return text.length > length ? `${text.slice(0, length)}...` : text
}

export function initials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
