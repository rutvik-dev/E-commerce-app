var Cart = require("../Model/cartmodel");
var Product = require("../Model/productmodel");

// AddToCart //
var AddToCart = async function (req, res, next) {
  try {
    const { ProductId, Quantity } = req.body;
    const UserId = req.headers.userId;
    const Find = await Product.findById(ProductId);

    const MyObj = {
      ProductId: Find.id,
      productName: Find.populateroductName,
      description: Find.description,
      price: Find.price,
      image: Find.image,
      Quantity: Quantity,
      Amount: Find.price * Quantity,
    };

    let CartData = await Cart.findOne({ UserId });

    if (!CartData) {
      CartData = new Cart({
        UserId,
        Products: [MyObj],
        TotalPrice: Find.price * Quantity,
      });
    } else {
      CartData.Products.push(MyObj);  
      CartData.TotalPrice += Find.price * Quantity;
    }

    await CartData.save();

    res.status(200).json({
      status: "Cart Create",
      message: "Cart Create Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var GetCart = async function (req, res, next) {
  try {
    const UserId = req.headers.userId;
    const Find = await Cart.findOne({ UserId });

    res.status(200).json({
      status: "Get",
      message: "Get Successful",
      Find,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var CartUpdate = async function (req, res, next) {
  try {
    const { ProductId, Quantity } = req.body;

    const UserId = req.headers.userId;
    let cartData = await Cart.findOne({ UserId });

    const findIndex = cartData.Products.findIndex(
      (product) => product.ProductId === ProductId
    );

    if (findIndex === -1) {
      return res
        .status(404)
        .send({ success: false, message: "product not found in cart" });
    }

    const product = cartData.Products[findIndex];
    product.Quantity = Quantity;
    cartData.Products[findIndex] = product;

    const Store = cartData.Products[findIndex];
    Store.Amount = product.price * product.Quantity;
    cartData.Products[findIndex] = Store;

    const MAP = cartData.Products;

    let totAmount = 0;
    MAP.map((data) => {
      totAmount += data.Amount;
    });

    cartData.TotalPrice = totAmount;

    await cartData.save();
    res.status(200).json({
      status: "Cart Update",
      message: "Cart Update Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var CartDelete = async function (req, res, next) {
  try {
    const { ProductId } = req.body;
    const UserId = req.headers.userId;

    let cartData = await Cart.findOne({ UserId });

    const findIndex = cartData.Products.findIndex(
      (product) => product.ProductId === ProductId
    );
    if (findIndex === -1) {
      return res
        .status(404)
        .send({ success: false, message: "product not found in cart" });
    }

    const product = cartData.Products[findIndex];
    const totalAmount = product.price * product.Quantity;

    cartData.Products.splice(findIndex, 1);
    cartData.TotalPrice -= totalAmount;

    if (cartData.Products.length === 0) {
      await Cart.deleteOne({ UserId });
      return res
        .status(200)
        .send({ success: true, message: "product deleted" });
    }

    await cartData.save();

    res.status(200).json({
      status: "Cart Delete",
      message: "Cart Delete Successful",
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = {
  AddToCart,
  GetCart,
  CartUpdate,
  CartDelete,
};
 