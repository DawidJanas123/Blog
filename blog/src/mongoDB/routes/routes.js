const userSchema = require('../models/user');


const express = require('express');
const router = express.Router();

router.post('/singin', async (req, res) => {


    const data = new userSchema({
        username: req.body.username, password: req.body.password, email: req.body.email, date: req.body.date
    })

    try {
        const dataToSave = await data.save();
        const token = await data.generateAuthToken();
        res.status(200).json({dataToSave, token});
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


router.get('/login', async (req, res) => {

    try {
        const user = await userSchema.findByCredentials(req.query.email, req.query.password)
        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({message: e.message})
    }


});

module.exports = router;