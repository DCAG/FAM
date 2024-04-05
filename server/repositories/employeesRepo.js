const employees = require('../models/employeesModel')

const getAll = () => {
    return employees.find()
}

const getById = (id) => {
    return employees.findById(id)
}

const getByDepartmentId = (departmentId) => {
    return employees.findOne({departmentId: departmentId})
}

const update = (employee) => {
    return employee.save()
}

const create = (employee) => {
    return employees.create(employee)
}

module.exports = {getAll, getById, getByDepartmentId, update, create}