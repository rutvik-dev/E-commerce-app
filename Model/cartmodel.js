const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cart = new Schema({
     UserId:{
        type: mongoose.Schema.Types.ObjectId ,
        ref: 'User' 
      },
      Products:{
        type: Array,
        require: true
      },
      TotalPrice:{
        type: Number,
        require: true
      },
      status:{
        type: String,
        require: true
      }

}, {timestamps: true});

const Cart = mongoose.model("cart", cart);
module.exports = Cart;
