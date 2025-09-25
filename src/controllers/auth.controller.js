const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerController(req,res){
    const {username, password} = req.body

    const userExist = await userModel.findOne({
        username
    })
    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    if(userExist){
        return res.status(409).json({
            message : "username already exists"
        })
    }
    const user = await userModel.create({
        username,
        password
    })
    res.status(201).json({
        message : "user created successfully",
        user
    })
}

module.exports = {
    registerController
}