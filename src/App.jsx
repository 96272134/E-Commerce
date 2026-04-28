// src/App.jsx
import React, { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Women from './pages/Women'
import Jewellery from './pages/Jewellery'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Cart from './pages/Cart'
import { ProductProvider } from './context/ProductContext'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />
      case 'women':
        return <Women />
      case 'jewellery':
        return <Jewellery />
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      case 'login':
        return <Login />
      case 'cart':
        // UPDATED: pass setCurrentPage so Cart's "Continue Shopping" can go Home
        return <Cart setCurrentPage={setCurrentPage} />
      default:
        return <Home setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <ProductProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-1">{renderPage()}</main>
        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </ProductProvider>
  )
}

export default App
