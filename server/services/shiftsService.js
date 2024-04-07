const shiftsRepo = require('../repositories/shiftsRepo')

const getAll = () => {
    return shiftsRepo.getAll()
}

const getById = (id) => {
    return shiftsRepo.getById(id)
}

module.exports = {getAll, getById}