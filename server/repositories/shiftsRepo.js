const shifts = require('../models/shiftsModel')

const getAll = () => {
    return shifts.find()
}

const getById = (id) => {
    return shifts.findById(id)
}

const update = (shift) => {
    return shift.save()
}

const create = (shift) => {
    return shifts.create(shift)
}

module.exports = {getAll, getById, update, create}