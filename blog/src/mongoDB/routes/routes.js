const userSchema = require('../models/user');
const express = require('express');
const nodemailer = require("nodemailer");
const router = express.Router();

router.get('/login', async (req, res) => {

    try {
        await userSchema.findByCredentials(req.query.email, req.query.password)
        res.status(200).json({message: 'Logged in'});
    } catch (err) {
        res.status(400).json({message: err.message})
    }

});


router.post('/signin', async (req, res) => {

    const user = await userSchema.findOne({email: req.body.email}).exec();

    if (user !== null) {
        res.status(400).json({message: 'You already have account'});
    } else {
        try {
            const schemaUser = new userSchema({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                date: req.body.date,
                isVerified: false
            })
            await schemaUser.save();
            const token = await schemaUser.generateAuthToken()

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.REACT_APP_EMAIL_USER,
                    pass: process.env.REACT_APP_EMAIL_PASS,
                    clientId: process.env.REACT_APP_OAUTH_CLIENTID,
                    clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.REACT_APP_OAUTH_REFRESH_TOKEN
                }
            });

            let mailOptions = {
                from: 'no-replay@example.com',
                to: req.body.email,
                subject: 'Activate email',
                html: `<h1>Thanks,for joining us!</h1><p>Below we sent you link for activate your profile. Click on it and feel safe for using your account</p><a href="http://localhost:8080/blog/confirmEmail?token=${token}">Link</a>`
            }

            transporter.sendMail(mailOptions, function (err, data) {
                if (err) {
                    console.log("Error " + err);
                } else {
                    console.log("Email has been sent successfully");
                }
            })
            res.status(200).json({message: 'We have been sent you activated email'});
        } catch (e) {
            res.status(400).json({message: e.message});
        }
    }
})

router.get('/confirmEmail', async (req, res) => {

        try {
            const user = await userSchema.findOne({"tokens.token": `${req.query.token}`});

            if (user) {
                if (user.isVerified === false) {
                    try {
                        await userSchema.updateOne({"tokens.token": `${req.query.token}`}, {$set: {isVerified: true}})
                        res.send('<h1>You have been activated your account</h1>' +
                            '<p>Click link below for navigate our home page</p>' +
                            '<a href="http://localhost:3000/">Link</a>')
                    } catch (err) {
                        res.status(400).json({message: err.message})
                    }
                } else {
                    res.send('<h1>Your link is invalid</h1>' +
                        '<p>Your account is active</p>')
                }
            } else {
                res.json({
                    title: 'Fail to activate',
                    content: 'Your activation link is invalid, please register one more time'
                })
            }
        } catch
            (err) {
            res.status(400).json({message: err.message});
        }

    }
)


module.exports = router;