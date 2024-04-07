const employeesRepo = require('../repositories/employeesRepo')

const getAll = () => {
    return employeesRepo.getAll()
}

const getById = (id) => {
    return employeesRepo.getById(id)
}

const update = (employee) => {
    return employeesRepo.save()
}

const create = (employee) => {
    return employeesRepo.create(employee)
}

module.exports = {getAll, getById, create, update}