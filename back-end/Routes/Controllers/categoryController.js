const slugify = require("slugify");

const categoryModel = require('../../Models/catagory');







exports.create = async (req, res) => {
  try {

    const { category } = req.body;
    const newCategory = await new categoryModel({ name:category, slug: slugify(category) }).save();
    return res.json(newCategory);
    
  } catch (err) {
     console.log("err.errors is =============================>",Object.entries(err.errors)[0][1].properties.message);
     console.table(err.errors);
    res.status(400).json("***Create category failed***"+" | "+"Error Message == "+err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
  }
};




exports.list = async (req, res) =>
  res.json(await categoryModel.find({}).sort({ createdAt: -1 }).exec());




exports.read = async (req, res) => {
  let category = await categoryModel.findOne({ slug: req.params.slug }).exec();
  res.json(category);
};




exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await categoryModel.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

      if(updated === null){ return res.json("Please Check --- the Category Name --- That You want to Update")}
    
    res.json(updated);
  } catch (err) {
    res.status(400).send("Create update failed");
  }
};



exports.remove = async (req, res) => {
  try {
    const deleted = await categoryModel.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Create delete failed");
  }
};