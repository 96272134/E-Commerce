// src/pages/Home.jsx
import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const Home = ({ setCurrentPage }) => {
  const { products, clearSearch } = useContext(ProductContext)

  // Price filter (controlled inputs)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const parseNum = (v) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : null
  }

  // Apply price range first
  const minN = parseNum(minPrice)
  const maxN = parseNum(maxPrice)
  const priceFiltered = products.filter(p => {
    const okMin = minN == null ? true : p.price >= minN
    const okMax = maxN == null ? true : p.price <= maxN
    return okMin && okMax
  }) // numeric filtering with Array.filter 

  // Pagination state
  const [page, setPage] = useState(1)
  const pageSize = 8

  // Reset page when filters/data change
  useEffect(() => { setPage(1) }, [minPrice, maxPrice, products.length]) // client-side pagination pattern 

  // Compute current page slice
  const totalPages = Math.ceil((priceFiltered?.length || 0) / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = priceFiltered.slice(start, end) // slice after filtering 

  // Handlers for price inputs (controlled)
  const onPriceChange = ({ min, max }) => {
    if (min !== undefined) setMinPrice(min)
    if (max !== undefined) setMaxPrice(max)
  }
  const onPriceClear = () => { setMinPrice(''); setMaxPrice('') } // controlled forms reset 

  // Navigation helpers
  const go = (pageName) => {
    clearSearch?.()
    setCurrentPage?.(pageName)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Elegant Fashion for Modern Women
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover our curated collection of sophisticated clothing and exquisite jewelry
            designed to celebrate your unique style and elegance.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => go('women')}
              className="bg-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-700 transition-colors"
            >
              Shop Women
            </button>
            <button
              onClick={() => go('jewellery')}
              className="bg-white text-pink-600 border-2 border-pink-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-pink-600 hover:text-white transition-colors"
            >
              View Jewellery
            </button>
          </div>
        </div>
      </section>

      {/* Featured Products + Price Filter + Pagination */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>

            {/* Number-based Min/Max price filter */}
            <div className="flex flex-wrap items-end gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={minPrice}
                  onChange={(e) => onPriceChange({ min: e.target.value })}
                  placeholder="0"
                  className="w-36 rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600 px-3 py-2"
                  aria-label="Minimum price"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Max Price</label>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={maxPrice}
                  onChange={(e) => onPriceChange({ max: e.target.value })}
                  placeholder="500"
                  className="w-36 rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600 px-3 py-2"
                  aria-label="Maximum price"
                />
              </div>

              <button
                type="button"
                onClick={onPriceClear}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Grid (paginated after price filter) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {list.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {priceFiltered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products in this price range.</p>
            </div>
          )}

          {/* Pagination */}
          {priceFiltered.length > 0 && (
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          )}
        </div>
      </section>
    </div>
  )
}

export default Home
