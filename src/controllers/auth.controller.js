const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    try {
        const { username, password } = req.body

        //Input Validation
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password is required"
            })
        }

        //Check existingUser
        const existingUser = await userModel.findOne({
            username
        })

        if (existingUser) {
            return res.status(409).json({
                message: "username already exists"
            })
        }

        //Token Created for each user
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET)

        res.cookie('token', token)

        // username and password sent to database
        const newUser = await userModel.create({
            username,
            password
        })
        res.status(201).json({
            message: "user created successfully",
            newUser
        })
    } catch {
        res.status(500).json({
            message: "Error in Register Controller"
        })
    }
}
async function loginController(req, res) {
    try{
        const { username } = req.body;

    //Input validation
    if(!username || !password){
        return res.status(400).json({
            message: "Username and password is required"
        })
    }

    //Find user in database
    const user = await user.Model.findOne({
        username
    })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    const passwordMatch = await user.password === password;

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie('token', token)

    res.status(200).json({
        message: "Login Successfully",
    user: {
            username: user.username,
            id: user._id
        }
    })
    } catch{
        res.status(500).json({
            message : "Error in Login Controller"
        })
    }

}

module.exports = {
    registerController,
    loginController
}