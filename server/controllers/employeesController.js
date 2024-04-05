const express = require('express')
const employeesSvc = require('../services/employeesService')

const router = express.Router()

router.get('/', async (req,res) => {
    const employees = await employeesSvc.getAll()
    res.send(employees)
})

module.exports = router