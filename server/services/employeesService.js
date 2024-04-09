const employeesRepo = require('../repositories/employeesRepo')

const getAll = () => {
    return employeesRepo.getAll()
}

const getById = (id) => {
    return employeesRepo.getById(id)
}

const update = (id,employee) => {
    return employeesRepo.update(id,employee)
}

const create = (employee) => {
    return employeesRepo.create(employee)
}

module.exports = {getAll, getById, create, update}