import React, { lazy, Suspense,useState } from 'react';
import { Routes, Route} from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'


import PageLoader from '../UtiComponents/page-loader';
import Login from "../Components/_Auth-Folders/Login/Login"
import Register from "../Components/_Auth-Folders/Register/Register"
import Home from "../Components/Home/Home"
import RegisterComplete from '../Components/_Auth-Folders/RegisterComplete/RegisterComplete';
import ForgotPassword from '../Components/_Auth-Folders/ForgotPassword/forgotPassword';
import History from '../Components/User/UserHistory/UserHistory';
import UserPassword from '../Components/User/UserPassword/UserPassword';
import UserWishList from '../Components/User/UserWishList/UserWishList';
import AdminDashBoard from '../Components/Admin/AdminDashBoard/AdminDashBoard';
import AdminCategory from '../Components/Admin/AdminCategory/AdminCategory';
import AdminProduct from '../Components/Admin/AdminProduct/ProductModule';
import AdminAllProducts from '../Components/Admin/AdminAllProducts/AllProductsModule';
import SingleProductView from '../Components/Product/SingleProductView/SingleProductView';


import LoadPage from '../UtiComponents/page-loader/index'
import BrowseSearch from '../Components/Product/BrowseSearch/BrowseSearch';


const NoMatchPage = lazy(() => import('../UtiComponents/not-found/NoMatchPage'));


const Routez = () => {

   

    {/*------------------------ İf there is logged user  ------------------------*/}
        const user = useSelector(state => state.user)

     

        
    


    return (
        <>
        <Suspense fallback={<PageLoader />}>
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


                {/* Sİngle Product Page */}
                <Route  path="product/:slug" element={<SingleProductView />} />

                {/* Search */}
                <Route  path="search" element={<BrowseSearch />} />

                 <Route path="*" element={<NoMatchPage />} />
            </Routes>

        </Suspense>
        </>
    )
}

export default Routez
