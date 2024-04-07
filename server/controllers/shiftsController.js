const express = require('express')
const shiftsService = require("../services/shiftsService")

const router = express.Router()

router.get('/', async (req,res) => {
    const shifts = await shiftsService.getAll()
    console.log("/shifts - show list from the db:", shifts)
    res.send(shifts)
})

module.exports = router