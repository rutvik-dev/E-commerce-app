const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const category = new Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    name: {
      type: String,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", category);
module.exports = Category;
