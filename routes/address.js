var express = require("express");
var router = express.Router();
var Control = require("../Controller/addresscontroller");
var CONTROL = require("../middleware/jwttoken.js");
var Valid = require("../middleware/emailvalidator.js");

// Create Address //
router.post("/CreateAddress",CONTROL.usertoken,Valid.Addressvalidtion,Control.CreateAddress);

// Default Address  set//
router.post("/DefaultAddressSet", CONTROL.usertoken, Control.DefaultAddressSet);

module.exports = router;
