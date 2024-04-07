const express = require('express')
const employeesSvc = require('../services/employeesService')

const router = express.Router()

router.get('/', async (req,res) => {
    const employees = await employeesSvc.getAll()
    res.send(employees)
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

module.exports = router