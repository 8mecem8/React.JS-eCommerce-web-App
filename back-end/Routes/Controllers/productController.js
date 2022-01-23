const slugify = require("slugify");

const productModel = require('../../Models/productModel');

const userModel = require('../../Models/userModel')


exports.listAll = async (req, res) =>
  res.json(await productModel.find({})
  .limit(parseInt(req.params.count)).populate('category').populate('subcategory').sort([["createdAt","desc"]]).exec());


exports.totalNumberProduct = async (req, res) =>
  res.json(await productModel.find({}).estimatedDocumentCount().exec());


 
/* exports.orderList = async (req, res) => 
{
  try {

    const {sort , order, limit} = req.body

    const products = await productModel.find({}).populate('category').populate('subcategory').sort([[sort, order]]).limit(limit).exec()
    
    
    res.json(products)
    
  } catch (error) {
    console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Create category failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
} */
  


    {/*------------------------ with Pagination ------------------------*/}

exports.orderList = async (req, res) => 
{
  try {

    const {sort , order, page} = req.body

    const currentPage = page || 1
    const perPAge = 3

    const products = await productModel.find({}).skip((currentPage - 1) * perPAge).populate('category').populate('subcategory').sort([[sort, order]]).limit(perPAge).exec()
    
    
    res.json(products)
    
  } catch (error) {
    console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Getting Ordder info failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
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








exports.getSingleProductInfo = async(req, res)=>
{
  const {slug} = req.params
  try {

      let slugtoUse

      if(slug.startsWith(":")){slugtoUse = slug.slice(1) }
      else {slugtoUse = slug}


      const singleProduct = await productModel.findOne({slug:slugtoUse}).populate('category').populate('subcategory').exec()
       
      
      res.json(singleProduct)

  } catch (err) {
     console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Get Single Prodcut info failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
}










exports.productStar = async (req, res) => 
{
  try {
    
  const product = await productModel.findById(req.params.productId).exec();
  const user = await userModel.findOne({ email: req.body.user.email }).exec();
  const { star } = req.body;

    

  // who is updating?
  // check if currently logged in user have already added rating to this product?
  let existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );



  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await productModel.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();


    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {


    // if user have already left rating, update it
    const ratingUpdated = await productModel.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();

    
    
    res.json(ratingUpdated);
  }

  } catch (err) {
    console.log(err.message)
     
     //console.log("error is ================>",Reflect.ownKeys(err))
     
    res.status(400).json("***Giving Rating failed***"+" | "+"Error Message = "+err.message || err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
  

};






exports.listRelated = async (req, res) => {
  const product = await productModel.findById(req.params.productId).exec();

  console.log("product.category is ===>",product.category)

  const related = await productModel.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(5)
    .populate('category')
    .populate('subcategory')
    .populate({
      path: 'ratings',
     populate: {
       path: 'postedBy',
       model: 'User'
     } 
    })
    .exec();

    console.log(related)

  res.json(related);
};


// Search and Filter-------------------------------------------------------------------------

const handleQuery = async (req, res, query) => 
{
  const products = await productModel.find({ $text:{ $search: query}})
    .populate('category')
    .populate('subcategory')
    .populate({
      path: 'ratings',
     populate: {
       path: 'postedBy',
       model: 'User'
     } 
    })
    .exec();

    return res.json(products)
}


exports.searchFilters = async (req, res) => 
{
  const {query} = req.body

  if(query){
    console.log("query",query)
    await handleQuery(req, res, query)
  }
}