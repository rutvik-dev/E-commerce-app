var express = require("express");
var router = express.Router();
var Control =  require('../Controller/usercontroller.js')
var {usertoken} = require('../middleware/jwttoken.js')
var Validator = require('../middleware/emailvalidator.js')
// SIGNUP //
// SentEmail
router.post("/signupadmin",Validator.Signupvalidtion,Control.Signup);

// Signupverifyotp
router.post("/verifyotp",Control.verifyotp);


// LOGIN //
// SentEmail
router.post("/email",Control.sendemail);

// Loginverifyotp 
router.post('/loginverifyotp',Control.loginverifyotp)

// Login
router.get('/login',Validator.Loginvalidtion,Control.Login)


// Get
router.get("/getsingledeta",usertoken,Control.Get);


// Change Password 
router.patch("/changepassword",usertoken,Validator.ChangePassvalidtion,Control.ChangePassword);


// Forget Password
// SentEmail
router.post("/forgetpasswordemail",Control.ForgetPasswordSendEmail);

// Verify
router.post("/ForgetPasswordVerify",Control.ForgetPasswordVerify);
    
// Forget Password
router.patch("/ForgetPassword",usertoken,Validator.ForgetPassvalidtion,Control.ForgetPassword);

module.exports = router;