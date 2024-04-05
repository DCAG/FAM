const express = require('express')
const usersService = require('../services/usersService')


const router = express.Router()

router.get('/', async (req,res) => {
    const users = await usersService.getAll()
    console.log("/users - show list from the db:", users)
    res.send(users)
})

module.exports = router