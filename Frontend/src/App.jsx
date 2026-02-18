import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'
import Login from './pages/Login'
import Home from './pages/Home'
import AdminAddProduct from './pages/AdminAddProduct'
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import AboutUs from './pages/AboutUs'




const App = () => {
  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin/add-product" element={<AdminAddProduct />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products />} />
        <Route path='/About'element={<AboutUs />}/>

  
      </Routes>

</>
  )
}

export default App

