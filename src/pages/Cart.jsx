// src/pages/Cart.jsx
import React, { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

const Cart = ({ setCurrentPage }) => {
  const { cart, updateCartQuantity, removeFromCart } = useContext(ProductContext)
  const total = cart.reduce((s, i) => s + (i.price * i.quantity), 0)
  const itemCount = cart.reduce((s, i) => s + i.quantity, 0)

  const continueShopping = () => {
    setCurrentPage?.('home') // navigate to Home 
    window.scrollTo({ top: 0, behavior: 'smooth' }) // smooth scroll 
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-6">Add some beautiful items to your cart to get started!</p>
            <button
              className="px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700"
              onClick={continueShopping} // go Home on click 
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart ({itemCount} items)</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {cart.map(item => (
            <div key={item.id} className="flex items-center p-6 border-b last:border-b-0">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 capitalize">{item.category}</p>
                <p className="text-pink-600 font-semibold text-lg">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 text-gray-700 hover:text-pink-600"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border-x">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 text-gray-700 hover:text-pink-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="p-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center text-xl font-bold">
              <span>Total: ${total.toFixed(2)}</span>
              <div className="flex gap-3">
                <button
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-base font-semibold"
                  onClick={continueShopping} 
                >
                  Continue Shopping
                </button>
                <button className="px-6 py-3 rounded-lg bg-pink-600 text-white font-semibold hover:bg-pink-700">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
