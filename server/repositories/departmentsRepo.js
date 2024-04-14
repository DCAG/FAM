const departments = require('../models/departmentsModel')

const getAll = () => {
    return departments.find().populate('manager').populate('employees').exec()
}

const getById = (id) => {
    return departments.findById(id).populate('manager').populate('employees').exec()
}

const getByName = (name) => {
    return departments.findOne({name: name})
}

const getByManager = (manager) => {
    return departments.findOne({manager: manager})
}

const update = (id,department) => {
    return departments.findByIdAndUpdate(id,department)
}

const create = (department) => {
    return departments.create(department)
}

const remove = (id) => {
    return departments.findByIdAndDelete(id)
}


module.exports = {getAll, getById, getByName, update, create, remove, getByManager}