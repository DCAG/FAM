const departments = require('../models/departmentsModel')

const getAll = () => {
    return departments.find().populate('employees').populate('manager').exec()
}

const getById = (id) => {
    return departments.findById(id).populate('employees').populate('manager').exec()
}

const getByName = (name) => {
    return departments.findOne({name: name})
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


module.exports = {getAll, getById, getByName, update, create, remove}