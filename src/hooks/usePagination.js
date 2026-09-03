import { useMemo, useState } from 'react'

export function usePagination(items, pageSize = 10) {
  const [page, setPage] = useState(1)

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))

  const safePage = Math.min(page, totalPages)

  const currentItems = useMemo(
    () => items.slice((safePage - 1) * pageSize, safePage * pageSize),
    [items, safePage, pageSize]
  )

  const goToPage = (target) => {
    setPage(Math.min(Math.max(1, target), totalPages))
  }

  return { page: safePage, totalPages, currentItems, goToPage, setPage }
}
