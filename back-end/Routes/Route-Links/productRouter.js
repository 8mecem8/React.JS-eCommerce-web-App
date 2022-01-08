const productRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const {
  create,
  read,
  update,
  remove,
  listAll,
} = require("../Controllers/productController")



// imported Middlewares-------------------------------------------------------------------------
const { authCheck,adminCheck } = require('../Middlewares/authMWs')




// Routes-------------------------------------------------------------------------
productRouter.post("/product", authCheck, adminCheck, create);
productRouter.get("/products/:count", listAll);
productRouter.delete("/product/:slug", authCheck, adminCheck, remove);
productRouter.put("/product/:slug", authCheck, adminCheck, update);
productRouter.post("/category", orderList);











module.exports = productRouter


