const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.get('/', (req,res) => {
    // const token = req.headers['x-access-token']
    // console.log(token)
    // if(!token) {
    //     res.status(401).send('No token provided')
    // }

    // const SECRET_KEY = 'some_key' // process.env.SECRET_KEY
    // jwt.verify(token, SECRET_KEY, (err, data) => {
    //     if(err) {
    //         res.status(500).send('Failed to authenticate token')
    //     }

    //     const shifts = [
    //         {time:'3h'},
    //         {time:'6h'},
    //         {time:'9h'},
    //         {time:'12h'}
    //     ]
        
    //     res.send(shifts)
    // })

    const shifts = [
        {time:'3h'},
        {time:'6h'},
        {time:'9h'},
        {time:'12h'}
    ]
    
    res.send(shifts)
})

module.exports = router