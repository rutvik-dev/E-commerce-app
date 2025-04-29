var Product = require("../Model/productmodel");
var path = require("path");
var fs = require("fs");
var category = require("../Model/categorymodel");

// Create Product//
var CreateProduct = async function (req, res, next) {
  try {
    const { productName, description, price, image, categoryId } = req.body;

    const find = await category.findById(categoryId);

    if (find.status == 0) {
      throw new Error("status is not Active");
    }

    const Create = await Product.create({
      categoryId,
      productName,
      description,
      price,
      image,
    });

    res.status(200).json({
      status: "Product Create",
      message: "Product Create Successful",
      Data: Create,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// Product Active Inactive//
var ProductActiveInactive = async function (req, res, next) {
  try {
    const id = req.body.id;
    const FindId = await Product.findById(id);

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

// Product Update //
var ProductUpdate = async function (req, res, next) {
  try {
    let Id = req.params.id;
    const findid = await Product.findById(Id);

    await Product.findByIdAndUpdate(Id, {
      productName: req.body.productName ?? findid.productName,
      description: req.body.description ?? findid.description,
      price: req.body.price ?? findid.price,
      image: req.body.image ?? findid.image,
    });

    findid.image.map((data) => {
      fs.unlink(path.join(`./public/images/${data}`), (err) => {
        if (err) throw err;
        console.log("path is not defind");
      });
    });
    res.status(200).json({
      status: "UPDATE SUCCESS",
      message: "Update Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// Product Delete //
var ProductDelete = async function (req, res, next) {
  try {
    let Id = req.params.id;
    const findid = await Product.findById(Id);

    findid.image.map((data) => {
      fs.unlink(path.join(`./public/images/${data}`), (err) => {
        if (err) throw err;
        console.log("path is not defind");
      });
    });

    const Delete = await Product.findByIdAndDelete(Id);

    if (!Delete) {
      throw new Error("Product Not Found");
    }

    res.status(200).json({
      status: "DELETE SUCCESS",
      message: "Delete Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var GetProductUser = async function (req, res, next) {
  try {
    const CategoryGet = await Product.aggregate([
      {
        $match: { status: 1 },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categories",
        },
      },
      {
        $unwind: "$categories",
      },
      {
        $addFields: { name: "$categories.name" },
      },
      { $project: { categories: 0 } },
    ]);

    // const find = await Product.find({status : 1})

    res.status(200).json({
      status: "Product Get",
      message: "Product Get Successful",
      Data: CategoryGet,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var GetProductAdmin = async function (req, res, next) {
  try {
    const find = await Product.find();

    res.status(200).json({
      status: "Product Get Admin",
      message: "Product Get Admin Successful",
      Data: find,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  CreateProduct,
  ProductActiveInactive,
  ProductUpdate,
  ProductDelete,
  GetProductUser,
  GetProductAdmin,
};
