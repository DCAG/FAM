const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

// inside: /auth/
router.post('/login', (req,res) => {
    const {username, password} = req.body

    //check username and password in db
    if(true){
        const userId = 'some_id'
        const SECRET_KEY = 'some_key' // process.env.SECRET_KEY
        const token = jwt.sign(
            {userId},
            SECRET_KEY,
            {expiresIn:"2h"}
        );
        res.send({accessToken: token})
    }
    else{
        res.send("wrong credentials")
    }
})

module.exports = router