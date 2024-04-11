const shiftsRepo = require('../repositories/shiftsRepo')

const getAll = () => {
    return shiftsRepo.getAll()
}

const getById = (id) => {
    return shiftsRepo.getById(id)
}

const update = (id,shift) => {
    return shiftsRepo.update(id,shift)
}

module.exports = {getAll, getById, update}