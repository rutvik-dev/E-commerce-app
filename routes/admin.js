var express = require("express");
var router = express.Router();
var CONTROL = require('../Controller/admincontroller')

// Signup Admin //
router.post('/signup',CONTROL.AdminSignup)


// Login Admin //
router.post('/login',CONTROL.AdminLogin)

module.exports = router;
