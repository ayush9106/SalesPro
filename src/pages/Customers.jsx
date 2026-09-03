import { useState, useMemo } from 'react'
import { customers as allCustomers, customerSegments, customerStatuses } from '../data/customers'
import SearchInput from '../components/ui/SearchInput'
import Select from '../components/ui/Select'
import Pagination from '../components/ui/Pagination'
import StatusBadge from '../components/ui/StatusBadge'
import Avatar from '../components/ui/Avatar'
import SortHeader from '../components/tables/SortHeader'
import { useSortableData } from '../hooks/useSortableData'
import { usePagination } from '../hooks/usePagination'
import { formatCurrency, formatDate } from '../utils/format'

const segmentOptions = customerSegments.map((s) => ({
  value: s.toLowerCase(),
  label: s,
}))

const statusOptions = customerStatuses.map((s) => ({
  value: s.toLowerCase(),
  label: s,
}))

export default function Customers() {
  const [search, setSearch] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => {
    return allCustomers.filter((c) => {
      const matchesSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase())
      const matchesSegment =
        segmentFilter === 'all' || c.segment.toLowerCase() === segmentFilter
      const matchesStatus =
        statusFilter === 'all' || c.status.toLowerCase() === statusFilter
      return matchesSearch && matchesSegment && matchesStatus
    })
  }, [search, segmentFilter, statusFilter])

  const { sortedItems, sortConfig, requestSort } = useSortableData(filtered)
  const { page, totalPages, currentItems, goToPage } = usePagination(sortedItems, 10)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Customers
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage your customer base.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search customers..."
          className="sm:w-72"
          ariaLabel="Search customers"
        />
        <Select
          options={segmentOptions}
          value={segmentFilter}
          onChange={(e) => setSegmentFilter(e.target.value)}
          className="w-full sm:w-36"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-36"
        />
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} customer{filtered.length !== 1 && 's'}
        </span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
              <tr>
                <SortHeader
                  label="Customer"
                  sortKey="name"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.name}
                />
                <SortHeader
                  label="Email"
                  sortKey="email"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.email}
                />
                <SortHeader
                  label="Orders"
                  sortKey="orders"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.orders}
                  align="right"
                />
                <SortHeader
                  label="Total Spent"
                  sortKey="totalSpent"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.totalSpent}
                  align="right"
                />
                <SortHeader
                  label="Last Order"
                  sortKey="lastOrder"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.lastOrder}
                />
                <SortHeader
                  label="Status"
                  sortKey="status"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.status}
                />
                <SortHeader
                  label="Segment"
                  sortKey="segment"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(c) => c.segment}
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                currentItems.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={customer.name} size="sm" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">
                            {customer.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {customer.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                      {customer.email}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                      {customer.orders}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(customer.totalSpent)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                      {formatDate(customer.lastOrder)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={customer.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <span
                        className={
                          customer.segment === 'VIP'
                            ? 'inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
                            : customer.segment === 'New'
                            ? 'inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-xs font-medium text-sky-700 dark:bg-sky-500/10 dark:text-sky-400'
                            : 'inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-500/10 dark:text-gray-400'
                        }
                      >
                        {customer.segment}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>
    </div>
  )
}
