    var User = require("../Model/usermodel");
    var bcrypt = require("bcrypt");
    var jwt = require("jsonwebtoken");
    const nodemailer = require("nodemailer");
    const client = require("../Config/redis");

    // SIGNUP //
    var Signup = async function (req, res, next) {
      try {
        const { email, deviceType, password } = req.body;
        const hashedpassword = await bcrypt.hash(password, 10);

        let userData = {
          email: email,
          deviceType: deviceType,
          password: hashedpassword,
        };

        const OTP = Math.floor(Math.random() * 121212); 

        let SetDeta = await client.set(
          "email",
          JSON.stringify({ userData: userData, otp: OTP })
        );

        // mail //
          let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "rutvikvora8780@gmail.com",
              pass: "kfck hjcy azzl rfms",
            },
          });

        res.render("index", { OTP }, async (err, html) => {
          if (err) {
            return res.status(500).json({ message: "error", error: err.message });  
          }
          await mailTransporter.sendMail({
            from: "rutvikvora8780@gmail.com",
            to: userData.email,
            subject: "Your OTP for Registration",
            html: html,
          });
        });

        res.status(200).json({
          status: "Create",
          message: "Create Successful",
          Data: SetDeta,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    //  SIGNUP VERIFY OTP
    const verifyotp = async function (req, res, next) {
      try {
        const { otp } = req.body;

        let GetDeta = await client.get("email");
          
        if (!GetDeta) {
          throw new Error("OTP expired. Please register again.");
        }
        const parsedData = JSON.parse(GetDeta); 

        if (parsedData.otp != otp) {
          throw new Error("Invalid OTP");
        }

        const CreateUser = await User.create({
          email: parsedData.userData.email,
          password: parsedData.userData.password,
          deviceType: parsedData.userData.deviceType,
        });

        await client.del("email");

        token = jwt.sign({ id: CreateUser._id }, "demo", { expiresIn: "24hr" });

        res.status(200).json({
          status: "Create",
          message: "Create Successful",
          Data: CreateUser,
          token,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    // Send Email
    var sendemail = async function (req, res, next) {
      try {
        const { email } = req.body;

        let find = await User.findOne({ email });

        if (!find) {
          throw new Error("Invalid email");
        }

        const OTP = Math.floor(Math.random() * 121212);

        let SetDeta = await client.set("email", JSON.stringify({ OTP }));

        // Email
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rutvikvora8780@gmail.com",
            pass: "kfck hjcy azzl rfms",
          },
        });

        res.render("index", { OTP }, async (err, html) => {
          if (err) {
            return res.status(500).json({ message: "error", error: err.message });
          }
          await mailTransporter.sendMail({
            from: "rutvikvora8780@gmail.com",
            to: find.email,
            subject: "Your OTP for Registration",
            html: html,
          });
        });

        res.status(200).json({
          status: "Sent Email",
          message: "Sent Email Successful",
          Data: SetDeta,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    // Verify
    const loginverifyotp = async function (req, res, next) {
      try {
        let GetDeta = await client.get("email");

        if (!GetDeta) {
          throw new Error("OTP expired. Please register again.");
        }

        const otpDeta = JSON.parse(GetDeta);

        if (otpDeta.OTP != req.body.otp) {
          throw new Error("Invalid OTP");
        }

        res.status(200).json({
          status: "Verify",
          message: "Verify Successful",
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    // LOGIN
    var Login = async function (req, res, next) {
      try {
        const { email, password } = req.body;

        if (!email || !password) {
          throw new Error("All Field Require");
        }

        let find = await User.findOne({ email: email });

        if (!find) {
          throw new Error("User Not Found");
        }
        const Ismatch = await bcrypt.compare(password, find.password);

        if (!Ismatch) {
          throw new Error("Password Not Valid");
        }

        token = jwt.sign({ payload: find }, "demo", { expiresIn: "24hr" });

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

    var Get = async function (req, res, next) {
      try {
        const users = await User.aggregate([
          { 
            $lookup: {
              from: "addresses",
              localField: "_id",
              foreignField: "UserId", 
              as: "address",
            },  
          },
          {
            $project: {
              _id: 0,
              id: "$_id",
              email: "$email",
              addresses: "$address",
            },
          },
        ]);

        res.status(200).json({
          users,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    var ChangePassword = async function (req, res) {
      try {
        const { email, oldpass, newpass } = req.body;

        let Email = await User.findOne({ email });

        if (!Email) {
          throw new Error("User Not Found");
        }

        const Ismatch = await bcrypt.compare(oldpass, Email.password);

        if (!Ismatch) {
          throw new Error("inccorect Password");
        }

        const hashedpassword = await bcrypt.hash(newpass, 10);
        Email.password = hashedpassword;

        await Email.save();

        res.status(200).json({
          status: "Change Password",
          message: "Change Password Successful",
          Data: hashedpassword,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    var ForgetPasswordSendEmail = async function (req, res) {
      try {
        const { email } = req.body;

        let find = await User.findOne({ email });

        if (!find) {
          throw new Error("Invalid email");
        }

        const OTP = Math.floor(Math.random() * 121212);

        let SetDeta = await client.set("email", JSON.stringify({ OTP, email }));

        // Email
        let mailTransporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "rutvikvora8780@gmail.com",
            pass: "kfck hjcy azzl rfms",
          },
        });

        res.render("index", { OTP }, async (err, html) => {
          if (err) {
            return res.status(500).json({ message: "error", error: err.message });
          }
          await mailTransporter.sendMail({
            from: "rutvikvora8780@gmail.com",
            to: find.email,
            subject: "Your OTP for Registration",
            html: html,
          });
        });

        res.status(200).json({
          status: "Forget Password",
          message: "Forget Password Successful",
          Data: SetDeta,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    const ForgetPasswordVerify = async function (req, res, next) {
      try {
        let GetDeta = await client.get("email");

        if (!GetDeta) {
          throw new Error("OTP expired. Please register again.");
        }

        const otpDeta = JSON.parse(GetDeta);

        if (otpDeta.OTP != req.body.otp) {
          throw new Error("Invalid OTP");
        }

        res.status(200).json({
          status: "Verify",
          message: "Verify Successful",
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };

    var ForgetPassword = async function (req, res) {
      try {
        const { newpass, confirmpass } = req.body;

        if (newpass != confirmpass) {
          throw new Error(" newpassword and confirmpassword is not Match");
        }

        let GetDeta = await client.get("email");
        const parse = JSON.parse(GetDeta);

        const useremail = parse.email;

        const hashedpassword = await bcrypt.hash(newpass, 10);

        const ForgetPass = await User.findOneAndUpdate(
          { email: useremail },
          {
            password: hashedpassword,
          }
        );

        res.status(200).json({
          status: "Forget Password",
          message: "Forget Password Successful",
          Data: ForgetPass,
        });
      } catch (error) {
        res.status(400).json({
          status: "Fail",
          message: error.message,
        });
      }
    };






    module.exports = {
      Signup,
      verifyotp,
      sendemail,
      loginverifyotp,
      Login,
      Get,
      ChangePassword,
      ForgetPasswordSendEmail,
      ForgetPasswordVerify,
      ForgetPassword
    };
