import { useState } from 'react'

function compareValues(a, b, accessor) {
  const av = accessor ? accessor(a) : a
  const bv = accessor ? accessor(b) : b

  if (typeof av === 'number' && typeof bv === 'number') {
    return av - bv
  }
  if (av && bv && typeof av.toLocaleLowerCase === 'function') {
    return av.toLocaleLowerCase().localeCompare(String(bv).toLocaleLowerCase())
  }
  return String(av).localeCompare(String(bv))
}

export function useSortableData(items, config = null) {
  const [sortConfig, setSortConfig] = useState(config)

  const sortedItems = [...items].sort((a, b) => {
    if (!sortConfig) return 0
    const result = compareValues(a, b, sortConfig.accessor)
    return sortConfig.direction === 'desc' ? -result : result
  })

  const requestSort = (key, accessor) => {
    setSortConfig((current) => {
      if (current && current.key === key) {
        return current.direction === 'asc'
          ? { key, accessor, direction: 'desc' }
          : { key: null, accessor: null, direction: 'asc' }
      }
      return { key, accessor, direction: 'asc' }
    })
  }

  return { sortedItems, sortConfig, requestSort }
}
