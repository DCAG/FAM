const express = require('express')
const shiftsService = require("../services/shiftsService")

const router = express.Router()

router.get('/', async (req,res) => {
    const shifts = await shiftsService.getAll()
    console.log("/shifts - show list from the db:", shifts)
    res.send(shifts)
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await shiftsService.update(id,objectToUpdate)
        console.log("put result",result?._doc)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router