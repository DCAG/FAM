const express = require('express')
const employeesSvc = require('../services/employeesService')

const router = express.Router()

router.get('/', async (req,res) => {
    const employees = await employeesSvc.getAll()
    res.send(employees)
})

router.get('/:id', async (req,res) => {
    try{

        const {id} = req.params
        const employee = await employeesSvc.getById(id)
        res.send(employee)
    }
    catch(err){
        res.sendStatus(404)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        const employee = await employeesSvc.create(body)
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
        const result = await employeesSvc.update(id,objectToUpdate)
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
        const result = await employeesSvc.remove(id)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router