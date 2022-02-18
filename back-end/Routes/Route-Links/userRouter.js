const authRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const { user, userCart, getUserCart, emptyCart, saveAddress, createOrder, createCashOrder, orders } = require('../Controllers/userController')



// imported Middlewares-------------------------------------------------------------------------
const { authCheck} = require('../Middlewares/authMWs')


// Routes-------------------------------------------------------------------------
authRouter.get('/user',user)
authRouter.post('/user/cart',authCheck,userCart)
authRouter.get("/user/cart", authCheck, getUserCart); // get cart
authRouter.delete("/user/cart", authCheck, emptyCart); // empty cart
authRouter.post("/user/address", authCheck, saveAddress);


authRouter.post("/user/order", authCheck, createOrder); // stripe
authRouter.post("/user/cash-order", authCheck, createCashOrder); // cod
authRouter.get("/user/orders", authCheck, orders);


module.exports = authRouter


