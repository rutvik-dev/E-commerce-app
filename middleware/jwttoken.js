const jwt = require('jsonwebtoken')
const User = require('../Model/usermodel')
const Admin = require('../Model/adminmodel')

// USER TOKEN //
const usertoken = async(req, res, next) => {
    try {

        const token = req.headers.authorization
        if (!token) {
            return res.status(400).send({ sucess: false, message: "token is blank" })
        }

        const newToken = token.slice(7)
        const decoded = jwt.verify(newToken, "demo")
        
        usercheck = await User.findById(decoded.payload._id)
                
        req.headers.userId = usercheck._id

        return next();

    } catch (err) {
        return res.status(500).send({ sucess: false,  message:err.message })
    }
}

//ADMIN TOKEN //
const admintoken = async(req, res, next) => {
    try {

        const token = req.headers.authorization
        if (!token) {
            return res.status(400).send({ sucess: false, message: "token is blank" })
        }

        const newToken = token.slice(7)
        const decoded = jwt.verify(newToken, "AdminToken")
        
        usercheck = await Admin.findById(decoded.payload._id)
                
        req.headers.userId = usercheck._id

        return next();

    } catch (err) {
        return res.status(500).send({ sucess: false,  message:err.message })
    }
}

module.exports = {
    usertoken,
    admintoken
}
