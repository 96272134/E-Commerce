// src/components/PriceFilter.jsx
import React from 'react'

const PriceFilter = ({ minPrice, maxPrice, onChange, onClear }) => {
  const toNum = (v) => (v === '' || v === null || v === undefined ? '' : String(v)) // keep controlled [web:276]

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Min Price</label>
        <input
          type="number"
          inputMode="decimal"
          step="0.01"            // allow decimals [web:281]
          min="0"                // non-negative guard [web:289]
          value={toNum(minPrice)}
          onChange={(e) => onChange({ min: e.target.value })}
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
          step="0.01"            // decimals allowed [web:281]
          min="0"
          value={toNum(maxPrice)}
          onChange={(e) => onChange({ max: e.target.value })}
          placeholder="500"
          className="w-36 rounded-md border-gray-300 focus:border-pink-600 focus:ring-pink-600 px-3 py-2"
          aria-label="Maximum price"
        />
      </div>

      <button
        type="button"
        onClick={onClear}
        className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Clear
      </button>
    </div>
  )
}

export default PriceFilter
