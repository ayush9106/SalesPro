import { useState, useMemo } from 'react'
import { orders as allOrders, orderStatuses } from '../data/orders'
import SearchInput from '../components/ui/SearchInput'
import Select from '../components/ui/Select'
import Pagination from '../components/ui/Pagination'
import StatusBadge from '../components/ui/StatusBadge'
import Avatar from '../components/ui/Avatar'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'
import SortHeader from '../components/tables/SortHeader'
import { useSortableData } from '../hooks/useSortableData'
import { usePagination } from '../hooks/usePagination'
import { formatCurrency, formatDate, formatDateTime } from '../utils/format'

const statusOptions = [
  { value: 'all', label: 'All Statuses' },
  ...orderStatuses.map((s) => ({ value: s, label: s.charAt(0).toUpperCase() + s.slice(1) })),
]

export default function Orders() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState(null)

  const filtered = useMemo(() => {
    return allOrders.filter((order) => {
      const matchesSearch =
        !search ||
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase()) ||
        order.product.toLowerCase().includes(search.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [search, statusFilter])

  const { sortedItems, sortConfig, requestSort } = useSortableData(filtered)
  const { page, totalPages, currentItems, goToPage } = usePagination(sortedItems, 8)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage and track all customer orders.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search orders..."
          className="sm:w-72"
          ariaLabel="Search orders"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-44"
        />
        <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} order{filtered.length !== 1 && 's'}
        </span>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
              <tr>
                <SortHeader
                  label="Order"
                  sortKey="id"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.id}
                />
                <SortHeader
                  label="Customer"
                  sortKey="customer"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.customer}
                />
                <SortHeader
                  label="Product"
                  sortKey="product"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.product}
                />
                <SortHeader
                  label="Date"
                  sortKey="date"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.date}
                />
                <SortHeader
                  label="Amount"
                  sortKey="amount"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.amount}
                  align="right"
                />
                <SortHeader
                  label="Status"
                  sortKey="status"
                  sortConfig={sortConfig}
                  onSort={requestSort}
                  accessor={(o) => o.status}
                />
                <th scope="col" className="px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-500 dark:text-gray-400">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={order.customer} size="sm" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                      {order.product}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500 dark:text-gray-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
      </div>

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Order ${selectedOrder?.id || ''}`}
        description="Order details"
        size="lg"
        footer={
          <Button variant="secondary" onClick={() => setSelectedOrder(null)}>
            Close
          </Button>
        }
      >
        {selectedOrder && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <Avatar name={selectedOrder.customer} size="lg" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {selectedOrder.customer}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedOrder.email}
                </p>
              </div>
              <div className="ml-auto">
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Product
                </p>
                <p className="mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {selectedOrder.product}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {selectedOrder.category} &middot; Qty: {selectedOrder.quantity}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Amount
                </p>
                <p className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                  {formatCurrency(selectedOrder.amount)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Date
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {formatDateTime(selectedOrder.date)}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Payment
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {selectedOrder.payment}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Shipping
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {selectedOrder.shipping}
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                  {selectedOrder.address}
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
