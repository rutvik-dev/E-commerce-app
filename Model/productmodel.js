const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const product = new Schema({
  categoryId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
   },
   productName: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  price: {
    type: String,
    require: true
  },
  image:{
    type: Array,
    require: true
  },
  status:{
    type: Number,
    default:1
  }

}, {timestamps: true});

const Product = mongoose.model("product", product);
module.exports = Product;
