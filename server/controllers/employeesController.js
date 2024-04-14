const express = require('express')
const employeesService = require('../services/employeesService')

const router = express.Router()

router.get('/', async (req,res) => {
    try{
        const employees = await employeesService.getAll()
        res.send(employees)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.get('/:id', async (req,res) => {
    try{
        const {id} = req.params
        const employee = await employeesService.getById(id)
        res.send(employee)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const employee = await employeesService.create(body)
        res.status(201).send(employee)
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.put('/:id', async (req,res) => {
    try {
        const objectToUpdate = req.body
        const {id} = req.params
        const result = await employeesService.update(id,objectToUpdate)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const result = await employeesService.remove(id)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router