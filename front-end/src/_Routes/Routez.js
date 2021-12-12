import React, { lazy, Suspense } from 'react';
import PageLoader from '../UtiComponents/page-loader';
import { Routes, Route} from "react-router-dom";
import Login from "../Components/_Auth-Folders/Login/Login"
import Register from "../Components/_Auth-Folders/Register/Register"
import Home from "../Components/Home/Home"
import RegisterComplete from '../Components/_Auth-Folders/RegisterComplete/RegisterComplete';
import ForgotPassword from '../Components/_Auth-Folders/ForgotPassword/forgotPassword';


const NoMatchPage = lazy(() => import('../UtiComponents/not-found/NoMatchPage'));


const Routez = () => {
    return (
        <>
        <Suspense fallback={<PageLoader />}>
             <Routes>
                <Route index element={<Home />} />
                <Route  path="login" element={<Login />} />
                <Route  path="register" element={<Register />} />
                <Route  path="register/complete" element={<RegisterComplete />} />
                <Route  path="/forgot/password" element={<ForgotPassword />} />


                 <Route path="*" element={<NoMatchPage />} />
            </Routes>

        </Suspense>
        </>
    )
}

export default Routez
