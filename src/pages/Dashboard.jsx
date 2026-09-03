import { useState } from 'react'
import { orders } from '../data/orders'
import { topProducts } from '../data/notifications'
import { kpis, revenueByRange, monthlySales } from '../data/analytics'
import StatCard from '../components/ui/StatCard'
import ChartCard from '../components/ui/ChartCard'
import StatusBadge from '../components/ui/StatusBadge'
import Avatar from '../components/ui/Avatar'
import RevenueChart from '../components/charts/RevenueChart'
import SalesBarChart from '../components/charts/SalesBarChart'
import RangeSelector from '../components/charts/RangeSelector'
import { formatCurrency, formatDate, formatNumber } from '../utils/format'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const [range, setRange] = useState('30d')
  const recentOrders = orders.slice(0, 6)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back, Alex. Here's what's happening today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <StatCard key={kpi.id} kpi={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ChartCard
          title="Revenue Overview"
          subtitle="Track revenue trends over time"
          className="xl:col-span-2"
          actions={
            <RangeSelector value={range} onChange={setRange} />
          }
        >
          <RevenueChart data={revenueByRange[range]} />
        </ChartCard>

        <ChartCard title="Sales vs Target" subtitle="Monthly comparison">
          <SalesBarChart data={monthlySales} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <section className="card col-span-1 xl:col-span-2 flex flex-col">
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Recent Orders
              </h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Latest customer orders
              </p>
            </div>
            <Link
              to="/orders"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              View all
            </Link>
          </div>
          <div className="mt-4 flex-1 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Order
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Customer
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Product
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 text-right">
                    Amount
                  </th>
                  <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    <td className="whitespace-nowrap px-5 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={order.customer} size="sm" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-gray-600 dark:text-gray-400">
                      {order.product}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-gray-500 dark:text-gray-400">
                      {formatDate(order.date)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                      {formatCurrency(order.amount)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card flex flex-col">
          <div className="flex items-center justify-between px-5 pt-5">
            <div>
              <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                Top Products
              </h2>
              <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                Best sellers this month
              </p>
            </div>
            <Link
              to="/products"
              className="text-sm font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              View all
            </Link>
          </div>
          <ul className="mt-4 flex-1 divide-y divide-gray-100 dark:divide-gray-800">
            {topProducts.map((product, index) => (
              <li
                key={product.id}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  {index + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatNumber(product.sales)} sales
                  </p>
                </div>
                <p className="whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {formatCurrency(product.revenue)}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
