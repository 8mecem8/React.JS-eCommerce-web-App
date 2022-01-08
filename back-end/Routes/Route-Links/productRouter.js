const productRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const {
  create,
  update,
  remove,
  listAll,
  orderList,
} = require("../Controllers/productController")



// imported Middlewares-------------------------------------------------------------------------
const { authCheck,adminCheck } = require('../Middlewares/authMWs')




// Routes-------------------------------------------------------------------------
productRouter.post("/product", authCheck, adminCheck, create);
productRouter.get("/products/:count", listAll);
productRouter.delete("/product/:slug", authCheck, adminCheck, remove);
productRouter.put("/product/:slug", authCheck, adminCheck, update);
productRouter.post("/products", orderList);











module.exports = productRouter


