const userRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const { user, userCart, getUserCart, emptyCart, saveAddress, createOrder, createCashOrder, orders, addToWishlist, wishlist, removeFromWishlist } = require('../Controllers/userController')



// imported Middlewares-------------------------------------------------------------------------
const { authCheck} = require('../Middlewares/authMWs')


// Routes-------------------------------------------------------------------------
userRouter.get('/user',user)
userRouter.post('/user/cart',authCheck,userCart)
userRouter.get("/user/cart", authCheck, getUserCart); // get cart
userRouter.delete("/user/cart", authCheck, emptyCart); // empty cart
userRouter.post("/user/address", authCheck, saveAddress);


userRouter.post("/user/order", authCheck, createOrder); // stripe
userRouter.post("/user/cash-order", authCheck, createCashOrder); // cod
userRouter.get("/user/orders", authCheck, orders);


// wishlist
userRouter.post("/user/wishlist", authCheck, addToWishlist);
userRouter.get("/user/wishlist", authCheck, wishlist);
userRouter.put("/user/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = userRouter


