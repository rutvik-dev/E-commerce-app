var express = require("express");
var router = express.Router();
var Control =  require('../Controller/categorycontroller')
var {admintoken} = require('../middleware/jwttoken.js')

// Create Category //
router.post('/createcategory',admintoken,Control.categorycreate)

// Get Category //
router.get('/getcategory',admintoken,Control.categoryget)

// Update Category //
router.patch('/updatecategory',admintoken,Control.categoryupdate)

// Delete Category //
router.delete('/deletecategory',admintoken,Control.categorydelete)

// Category Active InActive //
router.patch('/categoryactiveinactive',admintoken,Control.CategoryActiveInactive)

module.exports = router;
