const shifts = require('../models/shiftsModel')

const getAll = () => {
    return shifts.find().populate('employees').exec()
}

const getById = (id) => {
    return shifts.findById(id)
}

const update = (id,shift) => {
    return shifts.findByIdAndUpdate(id,shift)
}

const create = (shift) => {
    return shifts.create(shift)
}

module.exports = {getAll, getById, update, create}