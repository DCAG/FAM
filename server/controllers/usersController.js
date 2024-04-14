const express = require('express')
const usersService = require('../services/usersService')

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const users = await usersService.getAll()
        res.send(users)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router