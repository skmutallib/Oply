const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      username,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username already exits",
      });
    }

    const user = await userModel.create({
      username,
      password,
    });

    const token = jwt.sign({
        id : user._id
    }, process.env.JWT_SECRET) 

    res.cookie('token', token)

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

module.exports = router;
