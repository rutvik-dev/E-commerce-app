const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const address = new Schema({
  addressLine1: {
    type: String,
    require: true
  },
  addressLine2: {
    type: String,
    require: true
  },
  city: {
    type: String,
    require: true
  },
  pincode: {
    type: Number,
    require: true
  },
  UserId:{
    type: mongoose.Schema.Types.ObjectId ,
    ref: 'User' 
  },
  setAsDefault:{
    type: Boolean,
    default: false
  }
}, {timestamps: true});

const Address = mongoose.model("Address", address);
module.exports = Address;
