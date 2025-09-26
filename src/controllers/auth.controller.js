const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

async function registerController(req, res) {
  try {
    const { username, password } = req.body;

    //Input Validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password is required",
      });
    }

    //Check existingUser
    const existingUser = await userModel.findOne({
      username,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "username already exists",
      });
    }

    // username and password sent to database
    const newUser = await userModel.create({
      username,
      password : await bcrypt.hash(password, 10)
    });

    //Token Created for each user
    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfully",
      newUser,
    });
  } catch (error) {
    console.error("Error in Register Controller:", error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
}
async function loginController(req, res) {
  try {
    const { username, password } = req.body;

    //Input validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password is required",
      });
    }

    //Find user in database
    const user = await userModel.findOne({
      username,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "Login Successfully",
      user: {
        username: user.username,
        id: user._id,
      },
    });
  } catch (error) {
    console.error("Error in Login Controller:", error);
    res.status(500).json({
      message: "Error during login",
    });
  }
}

module.exports = {
  registerController,
  loginController,
};
