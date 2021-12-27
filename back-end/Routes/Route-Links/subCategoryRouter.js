const subCategoryRouter = require('express').Router()

// imported Controllers-------------------------------------------------------------------------
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../Controllers/subCategoryController")



// imported Middlewares-------------------------------------------------------------------------
const { authCheck,adminCheck } = require('../Middlewares/authMWs')




// Routes-------------------------------------------------------------------------
subCategoryRouter.post("/subcategory", authCheck, adminCheck, create);
subCategoryRouter.get("/subcategories", list);
subCategoryRouter.get("/subcategory/:slug", read);
subCategoryRouter.put("/subcategory/:slug", authCheck, adminCheck, update);
subCategoryRouter.delete("/subcategory/:slug", authCheck, adminCheck, remove);












module.exports = subCategoryRouter


