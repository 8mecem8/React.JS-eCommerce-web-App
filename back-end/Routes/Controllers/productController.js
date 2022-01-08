const slugify = require("slugify");

const productModel = require('../../Models/productModel');



exports.listAll = async (req, res) =>
  res.json(await productModel.find({})
  .limit(parseInt(req.params.count)).populate('category').populate('subcategory').sort([["createdAt","desc"]]).exec());


exports.orderList = async (req, res) => 
{
  try {

    const {sort , order, limit} = req.body

    const products = await productModel.find({}).populate('category').populate('subcategory').sort([[sort, order]]).limit(limit).exec()
    
    console.log(products)

    res.json(products)
    
  } catch (error) {
    console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Create category failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
}
  



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



exports.update = async (req, res) => {

  console.log(req.body)
  console.log(req.params.slug)

  const { title, description, price, category, subcategory, shipping, quantity, images, color,} = req.body.product;
  try {
    const updated = await productModel.findOneAndUpdate(
      { slug: req.params.slug },
      { titlee:title,
        description:description,
        price:price,
        category:category,
        subcategory:subcategory,
        shipping:shipping,
        quantity:quantity,
        images:images,
        color:color,
        slug: slugify(title) },
      { new: true }
    ).populate('category').populate('subcategory')

      if(updated === null){ return res.json("Please Check --- the Product Name --- That You want to Update")}
    
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};