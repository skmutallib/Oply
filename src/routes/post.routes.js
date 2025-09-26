const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userModel = require('../models/user.model')

router.post('/', async(req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized user, please login first"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findOne({
            _id: decoded.id
        })

        req.user = user;

    } catch (err) {
        return res.status(401).json({
            error: "Invalid token, please login again"
        })
    }
})

module.exports = router;