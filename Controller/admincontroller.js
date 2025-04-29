var Admin = require("../Model/adminmodel");
var jwt = require("jsonwebtoken");
var AdminSignup = async function (req, res, next) {
  try {
    const myobj = {
      name: "Rutvk",
      email: "rutvikvora8780@gmail.com",
      password: "Rutvik@26",
    };

    const { name, email, password } = myobj;
    const SignupAdmin = await Admin.create({ name, email, password });

    res.status(200).json({
      status: "Signup",
      message: "Signup Successful",
      Data: SignupAdmin,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

var AdminLogin = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    let find = await Admin.findOne({ email: email });

    if (find.password !== password) {
      throw new Error("Password Not Valid");
    }

    token = jwt.sign({ payload: find }, "AdminToken", { expiresIn: "24hr" });

    res.status(200).json({
      status: "Login",
      message: "Login Successful",
      Data: find,
      token,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error.message,
    });
  }
};

module.exports = { AdminSignup, AdminLogin };
