const slugify = require("slugify");

const subCategoryModel = require('../../Models/subCategoryModel');







exports.create = async (req, res) => {
  try {
       
    const { subCategory,parent } = req.body;
    const newSubCategory = await new subCategoryModel({ name:subCategory,parent, slug: slugify(subCategory) }).save();
    return res.json(newSubCategory);
    
  } catch (err) {
     console.log("err.errors is =============================>",Object.entries(err.errors)[0][1].properties.message);
     console.table(err.errors);
    res.status(400).json("***Create subcategory failed***"+" | "+"Error Message == "+err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
};




exports.list = async (req, res) =>
  res.json(await subCategoryModel.find({}).sort({ createdAt: -1 }).exec());




exports.read = async (req, res) => {
  let subCategory = await subCategoryModel.findOne({ slug: req.params.slug }).exec();
  res.json(subCategory);
};




exports.update = async (req, res) => {

  console.log(req.body)
  const { subCategory } = req.body;
  try {
    const updated = await subCategoryModel.findOneAndUpdate(
      { slug: req.params.slug },
      { name:subCategory, slug: slugify(subCategory) },
      { new: true }
    );

      if(updated === null){ return res.json("Please Check --- the SubCategory Name --- That You want to Update")}
    
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};



exports.remove = async (req, res) => {
  try {
    const deleted = await subCategoryModel.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
};