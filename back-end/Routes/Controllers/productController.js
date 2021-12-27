const slugify = require("slugify");

const productModel = require('../../Models/productModel');






exports.create = async (req, res) => {
  try {

    console.log(req.body);
    req.body.product.slug = await slugify(req.body.product.title);
    const newProduct = await new productModel(req.body.product).save();
    res.json(newProduct);
    next()
   
  } catch (err) {
     console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Create category failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
};