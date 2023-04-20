const userSchema = require('../models/user');

const express = require('express');
const router = express.Router();

router.post('/singin', async (req, res) => {
    const data = new userSchema({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })

    try {
        res.status(200);
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = router;