const adminRouter= require('express').Router();
const { auth } = require("../../Firebase/index");


// imported Controllers-------------------------------------------------------------------------
const { authCheck, adminCheck } = require('../Middlewares/authMWs');



// imported Middlewares-------------------------------------------------------------------------
const { orders,orderStatus } = require('../Controllers/adminController');


// routes
adminRouter.get("/admin/orders", authCheck, adminCheck, orders);
adminRouter.put("/admin/order-status", authCheck, adminCheck, orderStatus);

module.exports = adminRouter;
