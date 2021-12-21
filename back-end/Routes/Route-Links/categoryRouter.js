const categoryRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../Controllers/categoryController")



// imported Middlewares-------------------------------------------------------------------------
const { authCheck,adminCheck } = require('../Middlewares/authMWs')




// Routes-------------------------------------------------------------------------
categoryRouter.post("/category", authCheck, adminCheck, create);
categoryRouter.get("/categories", list);
categoryRouter.get("/category/:slug", read);
categoryRouter.put("/category/:slug", authCheck, adminCheck, update);
categoryRouter.delete("/category/:slug", authCheck, adminCheck, remove);












module.exports = categoryRouter


