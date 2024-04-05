const employeesRepo = require('../repositories/employeesRepo')

const getAll = () => {
    return employeesRepo.getAll()
}

const getById = (id) => {
    return employeesRepo.getById(id)
}

module.exports = {getAll, getById}