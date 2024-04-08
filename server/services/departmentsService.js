const departmentsRepo = require('../repositories/departmentsRepo')

const getAll = () => {
    return departmentsRepo.getAll()
}

const getById = (id) => {
    return departmentsRepo.getById(id)
}

const update = (id,department) => {
    return departmentsRepo.update(id,department)
}

const create = (department) => {
    return departmentsRepo.create(department)
}

const remove = (id) => {
    return departmentsRepo.remove(id)
}

module.exports = {getAll, getById, create, update, remove}