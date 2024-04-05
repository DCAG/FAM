const express = require('express')
const jwt = require('jsonwebtoken')
const usersService = require('../services/usersService')

const router = express.Router()

// inside: /auth/
router.post('/login', async (req,res) => {
    const {username, password} = req.body

    console.log("inside /login")

    //check username and password in db
    if(await usersService.verifyCredentials(username, password)){
        const user = (await usersService.getByUsername(username))
        console.log("[userId] inside /auth controller", user.id)
        const JWT_SECRET = process.env.JWT_SECRET
        console.log("JWT_SECRET",JWT_SECRET)
        const token = jwt.sign(
            {user},
            JWT_SECRET,
            {expiresIn:"2h"}
        );
        console.log("accessToken", token)
        res.send({accessToken: token, user: user})
    }
    else{
        console.log("wrong credentials")
        res.status(403).send("wrong credentials")
    }
})

module.exports = router