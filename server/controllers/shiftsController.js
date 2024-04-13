const express = require('express')
const shiftsService = require("../services/shiftsService")

const router = express.Router()

router.get('/', async (req,res) => {
    const shifts = await shiftsService.getAll()
    res.send(shifts)
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await shiftsService.update(id,objectToUpdate)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const shift = await shiftsService.create(body)
        res.status(201).send(shift)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router