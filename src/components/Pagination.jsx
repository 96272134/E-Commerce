// src/components/Pagination.jsx
import React from 'react'

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null

  const go = (p) => {
    if (p < 1 || p > totalPages) return
    onPageChange(p)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // UX: scroll to top [web:263]
  }

  // Simple numeric window (you can enhance with ellipsis later)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-2 select-none">
      <button
        onClick={() => go(1)}
        disabled={page === 1}
        className={`px-3 py-1.5 rounded border ${page === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
      >
        First
      </button>
      <button
        onClick={() => go(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1.5 rounded border ${page === 1 ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
      >
        Prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          aria-current={p === page ? 'page' : undefined}
          className={`px-3 py-1.5 rounded border ${
            p === page
              ? 'bg-pink-600 border-pink-600 text-white'
              : 'text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
          aria-label={`Page ${p}`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1.5 rounded border ${page === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
      >
        Next
      </button>
      <button
        onClick={() => go(totalPages)}
        disabled={page === totalPages}
        className={`px-3 py-1.5 rounded border ${page === totalPages ? 'text-gray-400 border-gray-200' : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
      >
        Last
      </button>
    </nav>
  )
}

export default Pagination
