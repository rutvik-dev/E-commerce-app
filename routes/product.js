var express = require("express");
var router = express.Router();
var CONTROL = require('../Controller/productcontroller')
var {admintoken,usertoken} = require('../middleware/jwttoken')
// var {upload,uploadfile} = require('../middleware/multer')
var {uploadfile} = require('../middleware/newmulter.js')
var Validator = require('../middleware/emailvalidator.js')

// Create Product//
router.post('/createproduct',admintoken,Validator.Productvalidtion,CONTROL.CreateProduct)

// Product  Active Inactive //
router.post('/ProductActiveInactive',admintoken,CONTROL.ProductActiveInactive)

// File Upload//
router.post('/multer',uploadfile)

// Product  Update //
router.patch('/update/:id',admintoken,CONTROL.ProductUpdate)

// Product  Delete //
router.delete('/delete/:id',admintoken,CONTROL.ProductDelete)

// Get Product User
router.get("/GetProductUser",usertoken,CONTROL.GetProductUser);

// Get Product Admin
router.get("/GetProductAdmin",admintoken,CONTROL.GetProductAdmin);

module.exports = router;