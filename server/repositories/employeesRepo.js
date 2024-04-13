const employees = require('../models/employeesModel')
require('../models/departmentsModel')

const getAll = () => {
    return employees.find().populate('department').populate('shifts').exec()
}

const getById = (id) => {
    return employees.findById(id).populate('department').populate('shifts').exec()
}

const getByDepartmentId = (departmentId) => {
    return employees.find({department: departmentId})
}

const update = (id,employee) => {
    return employees.findByIdAndUpdate(id,employee)
}

const create = (employee) => {
    return employees.create(employee)
}

const remove = (id) => {
    return employees.findByIdAndDelete(id)
}

module.exports = {getAll, getById, getByDepartmentId, update, create, remove}