const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const admin = new Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
  
}, {timestamps: true});

const Admin = mongoose.model("admin", admin);
module.exports = Admin;