import { useState, useMemo } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { products as allProducts, productCategories } from '../data/products'
import SearchInput from '../components/ui/SearchInput'
import Select from '../components/ui/Select'
import Pagination from '../components/ui/Pagination'
import StatusBadge from '../components/ui/StatusBadge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import Input from '../components/ui/Input'
import SortHeader from '../components/tables/SortHeader'
import { useSortableData } from '../hooks/useSortableData'
import { usePagination } from '../hooks/usePagination'
import { formatCurrency, formatNumber } from '../utils/format'

const categoryOptions = productCategories.map((c) => ({
  value: c.toLowerCase(),
  label: c,
}))

export default function Products() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [viewMode, setViewMode] = useState('table')
  const [addOpen, setAddOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [deleteProduct, setDeleteProduct] = useState(null)
  const [toast, setToast] = useState(null)

  const [formName, setFormName] = useState('')
  const [formCategory, setFormCategory] = useState('Electronics')
  const [formPrice, setFormPrice] = useState('')
  const [formStock, setFormStock] = useState('')
  const [formErrors, setFormErrors] = useState({})

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        categoryFilter === 'all' || p.category.toLowerCase() === categoryFilter
      return matchesSearch && matchesCategory
    })
  }, [search, categoryFilter])

  const { sortedItems, sortConfig, requestSort } = useSortableData(filtered)
  const { page, totalPages, currentItems, goToPage } = usePagination(sortedItems, 8)

  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  function resetForm() {
    setFormName('')
    setFormCategory('Electronics')
    setFormPrice('')
    setFormStock('')
    setFormErrors({})
  }

  function openAdd() {
    resetForm()
    setAddOpen(true)
  }

  function openEdit(product) {
    setFormName(product.name)
    setFormCategory(product.category)
    setFormPrice(String(product.price))
    setFormStock(String(product.stock))
    setFormErrors({})
    setEditProduct(product)
  }

  function validate() {
    const errors = {}
    if (!formName.trim()) errors.name = 'Product name is required'
    if (!formPrice || Number(formPrice) <= 0) errors.price = 'Enter a valid price'
    if (!formStock || Number(formStock) < 0) errors.stock = 'Enter valid stock'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  function handleSave() {
    if (!validate()) return
    if (editProduct) {
      showToast(`"${formName}" updated successfully`)
      setEditProduct(null)
    } else {
      showToast(`"${formName}" added successfully`)
      setAddOpen(false)
    }
    resetForm()
  }

  function handleDelete() {
    showToast(`"${deleteProduct.name}" deleted`)
    setDeleteProduct(null)
  }

  const productFormModal = (
    <Modal
      isOpen={addOpen || !!editProduct}
      onClose={() => { setAddOpen(false); setEditProduct(null); resetForm() }}
      title={editProduct ? 'Edit Product' : 'Add Product'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={() => { setAddOpen(false); setEditProduct(null); resetForm() }}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editProduct ? 'Save Changes' : 'Add Product'}
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Input
          label="Product Name"
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          error={formErrors.name}
          placeholder="e.g. Wireless Mouse"
        />
        <Select
          label="Category"
          options={productCategories.filter((c) => c !== 'All').map((c) => ({ value: c, label: c }))}
          value={formCategory}
          onChange={(e) => setFormCategory(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price ($)"
            type="number"
            min="0"
            step="0.01"
            value={formPrice}
            onChange={(e) => setFormPrice(e.target.value)}
            error={formErrors.price}
            placeholder="0.00"
          />
          <Input
            label="Stock"
            type="number"
            min="0"
            value={formStock}
            onChange={(e) => setFormStock(e.target.value)}
            error={formErrors.stock}
            placeholder="0"
          />
        </div>
      </div>
    </Modal>
  )

  return (
    <div className="space-y-6">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900">
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Products
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your product catalog.
          </p>
        </div>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="sm:w-72"
          ariaLabel="Search products"
        />
        <Select
          options={categoryOptions}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full sm:w-44"
        />
        <div className="ml-auto flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filtered.length} product{filtered.length !== 1 && 's'}
          </span>
          <div className="hidden items-center rounded-lg bg-gray-100 p-1 dark:bg-gray-800 sm:flex">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Table
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
              }`}
            >
              Grid
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50">
                <tr>
                  <SortHeader
                    label="Product"
                    sortKey="name"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.name}
                  />
                  <SortHeader
                    label="Category"
                    sortKey="category"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.category}
                  />
                  <SortHeader
                    label="Price"
                    sortKey="price"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.price}
                    align="right"
                  />
                  <SortHeader
                    label="Stock"
                    sortKey="stock"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.stock}
                    align="right"
                  />
                  <SortHeader
                    label="Sales"
                    sortKey="sales"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.sales}
                    align="right"
                  />
                  <SortHeader
                    label="Status"
                    sortKey="status"
                    sortConfig={sortConfig}
                    onSort={requestSort}
                    accessor={(p) => p.status}
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
                      No products found.
                    </td>
                  </tr>
                ) : (
                  currentItems.map((product) => (
                    <tr
                      key={product.id}
                      className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <td className="whitespace-nowrap px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg object-cover ring-1 ring-gray-200 dark:ring-gray-700"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-gray-100">
                              {product.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {product.sku}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-gray-600 dark:text-gray-400">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                        {formatCurrency(product.price)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                        {formatNumber(product.stock)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right text-gray-600 dark:text-gray-400">
                        {formatNumber(product.sales)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEdit(product)}
                            aria-label={`Edit ${product.name}`}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-200"
                          >
                            <Pencil className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteProduct(product)}
                            aria-label={`Delete ${product.name}`}
                            className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400"
                          >
                            <Trash2 className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentItems.map((product) => (
              <div
                key={product.id}
                className="card group flex flex-col overflow-hidden"
              >
                <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute right-2 top-2 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => openEdit(product)}
                      aria-label={`Edit ${product.name}`}
                      className="rounded-lg bg-white/90 p-1.5 text-gray-600 shadow-sm backdrop-blur transition-colors hover:bg-white dark:bg-gray-900/90 dark:text-gray-300 dark:hover:bg-gray-900"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteProduct(product)}
                      aria-label={`Delete ${product.name}`}
                      className="rounded-lg bg-white/90 p-1.5 text-rose-500 shadow-sm backdrop-blur transition-colors hover:bg-white dark:bg-gray-900/90 dark:hover:bg-gray-900"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {product.name}
                    </h3>
                    <StatusBadge status={product.status} />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {product.category}
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-3">
                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatNumber(product.sales)} sold
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
        </>
      )}

      {productFormModal}

      <Modal
        isOpen={!!deleteProduct}
        onClose={() => setDeleteProduct(null)}
        title="Delete Product"
        description="This action cannot be undone."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteProduct(null)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Are you sure you want to delete{' '}
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {deleteProduct?.name}
          </span>
          ? This will permanently remove the product from your catalog.
        </p>
      </Modal>
    </div>
  )
}
