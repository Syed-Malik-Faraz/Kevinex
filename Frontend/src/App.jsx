import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
// import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import AdminAddProduct from './pages/AdminAddProduct'
import AdminDashboard from './pages/AdminDashboard'
import AdminProductList from './pages/AdminProductList'
import AdminEditProduct from './pages/AdminEditProduct'
import AdminOrderDetails from './pages/AdminOrderDetails'
import AdminUserList from './pages/AdminUserList'
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import AboutUs from './pages/AboutUs'
import Contact from './pages/Contact'
import AdminRoute from './components/AdminRoute'




const App = () => {
  return (
    <>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />

        {/* Admin Routes */}
        <Route path="/admin/add-product" element={<AdminRoute><AdminAddProduct /></AdminRoute>} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/product-list" element={<AdminRoute><AdminProductList /></AdminRoute>} />
        <Route path="/admin/order/:id" element={<AdminRoute><AdminOrderDetails /></AdminRoute>} />
        <Route path="/admin/user-list" element={<AdminRoute><AdminUserList /></AdminRoute>} />
        <Route path="/admin/product/:id/edit" element={<AdminRoute><AdminEditProduct /></AdminRoute>} />

        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products" element={<Products />} />
        <Route path='/About' element={<AboutUs />} />

        <Route path='/contact' element={<Contact />} />


      </Routes>

    </>
  )
}

export default App

