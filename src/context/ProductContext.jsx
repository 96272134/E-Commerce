// src/context/ProductContext.jsx
import React, { createContext, useState, useEffect } from 'react'

export const ProductContext = createContext()

export const ProductProvider = ({ children }) => {
  const [products] = useState([
    { id: 1, name: "Elegant  Midi Dress", category: "dresses", price: 89.99, originalPrice: 129.99, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop", description: "Beautiful midi dress perfect for any occasion" },
    { id: 2, name: "Silk Blouse", category: "tops", price: 64.99, originalPrice: 89.99, image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop", description: "Luxurious silk blouse for professional wear" },
    { id: 3, name: "High-Waist Jeans", category: "bottoms", price: 79.99, originalPrice: 99.99, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=600&fit=crop", description: "Comfortable high-waist jeans with perfect fit" },
    { id: 4, name: "Pearl Necklace", category: "jewellery", price: 149.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop", description: "Elegant pearl necklace for special occasions" },
    { id: 5, name: "Summer Maxi Dress", category: "dresses", price: 94.99, originalPrice: 119.99, image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=600&fit=crop", description: "Flowy maxi dress perfect for summer days" },
    { id: 6, name: "Cashmere Sweater", category: "tops", price: 129.99, originalPrice: 159.99, image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=400&h=600&fit=crop", description: "Luxurious cashmere sweater for cozy comfort" },
    { id: 7, name: "Gold Bracelet", category: "jewellery", price: 199.99, originalPrice: 249.99, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop", description: "Delicate gold bracelet with elegant design" },
    { id: 8, name: "Tailored Blazer", category: "tops", price: 159.99, originalPrice: 199.99, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", description: "Professional tailored blazer for work" },
    { id: 9, name: "Leather Handbag", category: "accessories", price: 249.99, originalPrice: 299.99, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", description: "Premium leather handbag with elegant design" },
    { id: 10, name: "Diamond Earrings", category: "jewellery", price: 299.99, originalPrice: 399.99, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop", description: "Sparkling diamond earrings for special events" },
    { id: 11, name: "Floral Print Dress", category: "dresses", price: 74.99, originalPrice: 94.99, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=600&fit=crop", description: "Charming floral print dress for spring" },
    { id: 12, name: "Wide-Leg Trousers", category: "bottoms", price: 89.99, originalPrice: 109.99, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", description: "Elegant wide-leg trousers for professional wear" }
  ])

  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [searchActive, setSearchActive] = useState(false) // NEW

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => { localStorage.setItem('cart', JSON.stringify(cart)) }, [cart])
  useEffect(() => { localStorage.setItem('wishlist', JSON.stringify(wishlist)) }, [wishlist])

  const addToCart = (product) => {
    const existing = cart.find(i => i.id === product.id)
    if (existing) setCart(cart.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i))
    else setCart([...cart, { ...product, quantity: 1 }])
  }

  const removeFromCart = (id) => setCart(cart.filter(i => i.id !== id))
  const updateCartQuantity = (id, q) =>
    q === 0 ? removeFromCart(id) : setCart(cart.map(i => i.id === id ? { ...i, quantity: q } : i))

  const addToWishlist = (p) => { if (!wishlist.find(i => i.id === p.id)) setWishlist([...wishlist, p]) }
  const removeFromWishlist = (id) => setWishlist(wishlist.filter(i => i.id !== id))

  // UPDATED: mark search active + set filtered result
  const searchProducts = (term) => {
    const f = products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.category.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredProducts(f)
    setSearchActive(true) // NEW
  }

  // NEW: clear search to restore default listings
  const clearSearch = () => {
    setFilteredProducts(products)
    setSearchActive(false)
  }

  const filterByCategory = (category) => {
    if (category === 'all') setFilteredProducts(products)
    else setFilteredProducts(products.filter(p => p.category.toLowerCase() === category.toLowerCase()))
    setSearchActive(false) // category filter lagta hai to search mode off
  }

  const value = {
    products,
    filteredProducts,
    searchActive,            // NEW
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    addToWishlist,
    removeFromWishlist,
    searchProducts,
    clearSearch,             // NEW
    filterByCategory
  }

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
}

