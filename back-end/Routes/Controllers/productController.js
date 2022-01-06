const slugify = require("slugify");

const productModel = require('../../Models/productModel');



exports.listAll = async (req, res) =>
  res.json(await productModel.find({})
  .limit(parseInt(req.params.count)).populate('category').populate('subcategory').sort([["createdAt","desc"]]).exec());


exports.create = async (req, res) => {
  try {

    req.body.product.slug = await slugify(req.body.product.title);
   
    const newProduct = await new productModel(req.body.product).save();
    
    return res.json(newProduct);
    
   
  } catch (err) {
     console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Create category failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await productModel.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
};