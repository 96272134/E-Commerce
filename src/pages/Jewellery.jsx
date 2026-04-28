// src/pages/Jewellery.jsx
import React, { useContext, useState, useEffect } from 'react'
import { ProductContext } from '../context/ProductContext'
import ProductCard from '../components/ProductCard'
import Pagination from '../components/Pagination'

// OPTIONAL: If you created a shared PriceFilter component, import it.
// Otherwise, inline inputs are included below.
import PriceFilter from '../components/PriceFilter'

const Jewellery = () => {
  const { products } = useContext(ProductContext) // read catalog from context 

  // Base jewellery-only list
  const baseList = products.filter(p => p.category === 'jewellery') // array filter by category

  // Price filter state (controlled inputs)
  const [minPrice, setMinPrice] = useState('') // keep '' for controlled number input when empty 
  const [maxPrice, setMaxPrice] = useState('') // keep '' for controlled number input when empty

  const parseNum = (v) => {
    const n = parseFloat(v)
    return Number.isFinite(n) ? n : null
  }

  // Apply price range first
  const minN = parseNum(minPrice)
  const maxN = parseNum(maxPrice)
  const priceFiltered = baseList.filter(p => {
    const okMin = minN == null ? true : p.price >= minN
    const okMax = maxN == null ? true : p.price <= maxN
    return okMin && okMax
  }) // numeric range filtering with Array.filter 

  // Pagination state
  const [page, setPage] = useState(1)
  const pageSize = 8

  // Reset to page 1 when filters or data change
  useEffect(() => { setPage(1) }, [minPrice, maxPrice, baseList.length]) // reset on dependency change [web:259]

  // Compute slice for current page
  const totalPages = Math.ceil((priceFiltered?.length || 0) / pageSize)
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = priceFiltered.slice(start, end) // slice pagination window 

  // Handlers for PriceFilter
  const onPriceChange = ({ min, max }) => {
    if (min !== undefined) setMinPrice(min)
    if (max !== undefined) setMaxPrice(max)
  }
  const onPriceClear = () => { setMinPrice(''); setMaxPrice('') }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Jewelry Collection</h1>
          <p className="text-gray-600">Exquisite pieces to complement every look.</p>
        </div>

        {/* Price Filter (right-aligned) */}
        <div className="flex items-end justify-end mb-6">
          {/* If using shared PriceFilter component */}
          <PriceFilter
            minPrice={minPrice}
            maxPrice={maxPrice}
            onChange={onPriceChange}
            onClear={onPriceClear}
          />
          {/* If you do NOT have PriceFilter component, you can replace the above block with:
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
          */}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {list.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        {/* Empty state (respect price filter) */}
        {priceFiltered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No jewelry products in this price range.</p>
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

export default Jewellery
