import React,{useState,useEffect} from 'react'
import  {Link} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';









/* Custom Css */
import useStyles from './ShoppingCartStyles'


function ShoppingCart() {

    const sty = useStyles()
    const dispatch = useDispatch()


    let {user,cart} = useSelector(state => ({...state}))








  return <div>

    CART

  </div>;
}

export default ShoppingCart;
