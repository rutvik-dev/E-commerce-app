var express = require("express");
var router = express.Router();
var Control =  require('../Controller/cartcontroller')
var {usertoken} = require('../middleware/jwttoken.js')

// Add To Cart //
router.post('/AddToCart',usertoken,Control.AddToCart)

// Add To Cart //
router.get('/GetCart',usertoken,Control.GetCart)

// Cart Update //
router.patch('/CartUpdate',usertoken,Control.CartUpdate)

// Cart Delete //
router.delete('/CartDelete',usertoken,Control.CartDelete)


module.exports = router;
