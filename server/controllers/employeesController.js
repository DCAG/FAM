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
        console.log(id)
        const employee = await employeesSvc.getById(id)
        console.log(`/employees/${id}:`, employee)
        res.send(employee)
    }
    catch(err){
        res.sendStatus(404)
    }
})

router.post('/create', async (req,res) => {
    try{
        const body = req.body;
        console.log(body)
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
        console.log("put result",result?._doc)
        res.send({data: result?._doc, description: "previous object"})
    } 
    catch(err){
        console.log(err)
        res.send(err)
    }
})

module.exports = router