import React, { useState, useContext, useEffect, useRef } from 'react'
import { ProductContext } from '../context/ProductContext'

const Header = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { cart, searchProducts, clearSearch } = useContext(ProductContext) // added clearSearch

  const inputRef = useRef(null)
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const openSearch = () => {
    setSearchOpen(true)
    setSearchTerm('') // clear on open
    setTimeout(() => inputRef.current?.focus(), 0)
  }
  const closeSearch = () => {
    setSearchOpen(false)
    setSearchTerm('') // clear on close
  }

  // ESC to close + clear
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && searchOpen) {
        closeSearch()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [searchOpen])

  // Submit search -> filter + go to Women + scroll top
  const handleSearch = (e) => {
    e.preventDefault()
    if (!searchTerm.trim()) {
      closeSearch()
      return
    }
    searchProducts(searchTerm)         // update filteredProducts
    setSearchTerm('')                  // clear controlled input
    closeSearch()                      // hide panel
    setCurrentPage?.('women')          // show results on Women page
    window.scrollTo({ top: 0, behavior: 'smooth' }) // scroll to top
  }

  // Helper for nav clicks: reset any search and navigate + scroll
  const go = (page) => {
    clearSearch?.() // ensure default listings (no stale search)
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold text-pink-600 cursor-pointer"
              onClick={() => go('home')}
            >
              Elegant Threads
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['home', 'women', 'jewellery', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => go(page)}
                className={`text-gray-700 hover:text-pink-600 transition-colors capitalize ${currentPage === page ? 'text-pink-600 font-semibold' : ''}`}
              >
                {page}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Visible Search button in header */}
            <button
              onClick={openSearch}
              className="px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              aria-expanded={searchOpen}
              aria-controls="global-search"
            >
              Search
            </button>

            <button
              onClick={() => go('login')}
              className="text-gray-700 hover:text-pink-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => go('cart')}
              className="relative text-gray-700 hover:text-pink-600 transition-colors"
            >
              🛒 Cart ({cartItemCount})
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle menu"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {['home', 'women', 'jewellery', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  go(page)               // reset search + navigate + scroll
                  setMobileMenuOpen(false)
                }}
                className="block w-full text-left py-2 text-gray-700 hover:text-pink-600 transition-colors capitalize"
              >
                {page}
              </button>
            ))}
          </div>
        )}

        {/* Search Panel with a real submit button */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b shadow-lg p-4 z-50" id="global-search">
            <form onSubmit={handleSearch} role="search" aria-label="Sitewide" className="max-w-md mx-auto flex items-center gap-2">
              <input
                ref={inputRef}
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-600 focus:ring-1 focus:ring-pink-600"
                aria-label="Search products"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700"
              >
                Search
              </button>
              <button
                type="button"
                onClick={closeSearch}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                aria-label="Close search"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
