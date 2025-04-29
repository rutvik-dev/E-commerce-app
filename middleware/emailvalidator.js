let Validator = require('validatorjs');

// Signup Validation //
const Signupvalidtion = async(req, res, next) => {

  const KEY = {
       deviceType: "required|string",
       email:"required|string", 
       password: "required"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}

// Login Validation //
const Loginvalidtion = async(req, res, next) => {

  const KEY = {
       email:"required|string",
       password: "required|string"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}

// Change Password validtion //
const ChangePassvalidtion = async(req, res, next) => {

  const KEY = {
       email:"required|string",
       oldpass: "required",
       newpass:"required"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}

// Forget Password validtion //
const ForgetPassvalidtion = async(req, res, next) => {

  const KEY = {
       newpass:"required",
       confirmpass: "required"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}

// Address validtion //
const Addressvalidtion = async(req, res, next) => {

  const KEY = {
      addressLine1: "required|string",
      addressLine2:"required|string",
      city: "required",
      pincode: "required"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}

const Productvalidtion = async(req, res, next) => {

  const KEY = {
      productName: "required|string",
      description:"required|string",
      price: "required"
    };
    const validation = new Validator(req.body, KEY);
    
    if (validation.fails()) {
      return res.status(400).json({ message: "validate fail", errors: validation.errors.all() });
    }
    next(); 
}


module.exports = {
    Signupvalidtion,
    Loginvalidtion,
    ChangePassvalidtion,
    ForgetPassvalidtion,
    Addressvalidtion,
    Productvalidtion
}