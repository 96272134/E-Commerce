import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } = useContext(ProductContext)
  const isInWishlist = wishlist.some(i => i.id === product.id)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const toggleWishlist = () => isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition card-hover">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover" loading="lazy" />
        <button
          onClick={toggleWishlist}
          className={`absolute top-2 right-2 p-2 rounded-full ${isInWishlist ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'} hover:bg-pink-600 hover:text-white`}
        >
          ❤️
        </button>
        {discount > 0 && (
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">-{discount}%</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-3">{product.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
        <button onClick={() => addToCart(product)} className="w-full py-2 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700">
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
