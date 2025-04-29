var category = require("../Model/categorymodel");
var Product = require("../Model/productmodel");
// Category Create //
var categorycreate = async function (req, res, next) {
  try {
    const { name, categoryId } = req.body;
    let Create = await category.create({ name, categoryId });

    res.status(200).json({
      status: "Category Create",
      message: "Category Create Successful",
      Data: Create,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//  Category Get //
var categoryget = async function (req, res, next) {
  try {
    
    const CategoryGet = await category.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "categoryId",
          as: "subcategories",
        },
      },
      {
        $match: {
          categoryId: { $exists: false },
          status: 1,
        },
      },
    ]);

    res.status(200).json({
      status: "Category Get",
      message: "Category Get Successful",
      Data: CategoryGet,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//  Category Update //
var categoryupdate = async function (req, res, next) {
  try {
    let Id = req.body.id;
    const Update = await category.findByIdAndUpdate(Id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: "Update Get",
      message: "Update Get Successful",
      Data: Update,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

//  Category Delete //
var categorydelete = async function (req, res, next) {
  try {
    let id = req.body.id;

    await category.findByIdAndDelete(id);
   
    await category.deleteMany({ categoryId: id });

    let product = await Product.find({ categoryId: id });

    product.map(async (data) => {
      data.status = 0;
      await data.save();
    });

    res.status(200).json({
      status: "Delete",
      message: "Delete Successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// Category Active Inactive//
var CategoryActiveInactive = async function (req, res, next) {
  try {
    const id = req.body.id;
    const FindId = await category.findById(id);

    FindId.status = FindId.status === 1 ? 0 : 1;
    await FindId.save();

    res.status(200).json({
      status: "SUCCESS",
      message: "Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  categorycreate,
  categoryget,
  categoryupdate,
  categorydelete,
  CategoryActiveInactive,
};
