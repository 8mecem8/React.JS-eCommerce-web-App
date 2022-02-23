import React, { lazy, Suspense,useState } from 'react';
import { Routes, Route} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'


import pageLoader from '../UtiComponents/page-loader';
//const PageLoader = lazy(() => import('../UtiComponents/page-loader')) ;
const Login = lazy(() => import('../Components/_Auth-Folders/Login/Login')) 
const Register = lazy(() => import('../Components/_Auth-Folders/Register/Register')) 
const Home = lazy(() => import('../Components/Home/Home')) 
const RegisterComplete = lazy(() => import('../Components/_Auth-Folders/RegisterComplete/RegisterComplete'))
const ForgotPassword = lazy(() => import('../Components/_Auth-Folders/ForgotPassword/forgotPassword'))
const History = lazy(() => import('../Components/User/UserHistory/UserHistory')) 
const UserPassword = lazy(() => import('../Components/User/UserPassword/UserPassword')) 
const UserWishList = lazy(() => import('../Components/User/UserWishList/UserWishList')) 
const AdminDashBoard = lazy(() => import('../Components/Admin/AdminDashBoard/AdminDashBoard')) 
const AdminCategory = lazy(() => import('../Components/Admin/AdminCategory/AdminCategory'))
const AdminProduct = lazy(() => import('../Components/Admin/AdminProduct/ProductModule')) 
const AdminAllProducts = lazy(() => import('../Components/Admin/AdminAllProducts/AllProductsModule')) 
const SingleProductView = lazy(() => import('../Components/Product/SingleProductView/SingleProductView'))
const ShoppingCart = lazy(() => import('../Components/ShoppingCart/ShoppingCart')) 
const BrowseSearch = lazy(() => import('../Components/Product/BrowseSearch/BrowseSearch'))
const Checkout = lazy(() => import('../Components/Checkout/Checkout')) 
const Payment = lazy(() => import('../Components/Payment/Payment')) 
const AdminOrders = lazy(() => import('../Components/Admin/AdminOrders/AdminOrders'))







const NoMatchPage = lazy(() => import('../UtiComponents/not-found/NoMatchPage'));


const Routez = () => {

   

    {/*------------------------ İf there is logged user  ------------------------*/}
        const user = useSelector(state => state.user)

     

        


    return (
        <>
        <Suspense fallback={<pageLoader />}>
             <Routes>
                <Route index element={<Home />} />
                <Route  path="login" element={<Login />} />
                <Route  path="register" element={<Register />} />
                <Route  path="register/complete" element={<RegisterComplete />} />
                <Route  path="/forgot/password" element={<ForgotPassword />} />
                
                {/* User Hamburger Menu */}
                <Route  path="/user/history" element={!user && !user?.token ?  <Login /> : <History />} />
                <Route  path="/user/Password" element={!user && !user?.token ?  <Login /> : <UserPassword />} />
                <Route  path="/user/Wishlist" element={!user && !user?.token ?  <Login /> : <UserWishList />} />


                {/* Only Admin, Routes */}
                <Route  path="/admin/dashboard" element={!user && !user?.token ?  <Login /> : <AdminDashBoard />} />
                <Route  path="/admin/category" element={!user && !user?.token ?  <Login /> : <AdminCategory />} />
                <Route  path="/admin/product" element={!user && !user?.token ?  <Login /> : <AdminProduct />} />
                <Route  path="/admin/products" element={!user && !user?.token ?  <Login /> : <AdminAllProducts />} />
                <Route  path="/admin/orders" element={!user && !user?.token ?  <Login /> : <AdminOrders />} />


                {/* Single Product Page */}
                <Route  path="product/:slug" element={<SingleProductView />} />

                {/* Search */}
                <Route  path="search" element={<BrowseSearch />} />

                {/* Cart*/}
                <Route  path="cart" element={<ShoppingCart />} /> 
                
                {/* Checkout*/}
                <Route  path="checkout" element={<Checkout />} />

                {/* Payment*/}
                <Route  path="payment" element={<Payment />} />
                
                
                <Route path="*" element={<NoMatchPage />} />
            </Routes>

        </Suspense>
        </>
    )
}

export default Routez
