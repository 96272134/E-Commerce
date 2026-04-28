// src/pages/Women.jsx
import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

const Women = () => {
  const { products, filteredProducts, searchActive, clearSearch } = useContext(ProductContext)

  // Category state
  const [selectedCategory, setSelectedCategory] = useState('all')
  const womenCategories = ['all', 'dresses', 'tops', 'bottoms', 'accessories']

  // Base list: search results else category-filtered
  const baseList = searchActive
    ? filteredProducts
    : (selectedCategory === 'all'
        ? products.filter(p => ['dresses','tops','bottoms','accessories'].includes(p.category))
        : products.filter(p => p.category === selectedCategory))

  // Price filter (number inputs)
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const parseNum = (v) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : null
  }

  const minN = parseNum(minPrice)
  const maxN = parseNum(maxPrice)
  const priceFiltered = baseList.filter(p => {
    const okMin = minN == null ? true : p.price >= minN
    const okMax = maxN == null ? true : p.price <= maxN
    return okMin && okMax
  })

  // Pagination
  const [page, setPage] = useState(1)
  const pageSize = 8

  // Reset page on filters/data change
  useEffect(() => {
    setPage(1)
  }, [selectedCategory, searchActive, minPrice, maxPrice, baseList.length])

  const totalPages = Math.ceil((priceFiltered?.length || 0) / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = priceFiltered.slice(start, end)

  const onCategoryClick = (c) => {
    if (searchActive) clearSearch?.()
    setSelectedCategory(c)
  }

  // Price input handlers
  const onPriceChange = ({ min, max }) => {
    if (min !== undefined) setMinPrice(min)
    if (max !== undefined) setMaxPrice(max)
  }
  const onPriceClear = () => { setMinPrice(''); setMaxPrice('') }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Women's Collection</h1>
          <p className="text-gray-600">Curated selection of Panaacreations clothing for every day and occasion.</p>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {womenCategories.map(c => (
            <button
              key={c}
              onClick={() => onCategoryClick(c)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === c && !searchActive
                  ? 'bg-pink-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-pink-100'
              }`}
            >
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </button>
          ))}
        </div>

        {/* Price filter (number inputs) */}
        <div className="flex items-end justify-end gap-3 mb-6">
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

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Empty states */}
        {priceFiltered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchActive ? 'No items matched the search in this price range.' : 'No products found in this price range.'}
            </p>
          </div>
        )}

        {/* Pagination */}
        {priceFiltered.length > 0 && (
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        )}
      </div>
    </div>
  )
}

export default Women
