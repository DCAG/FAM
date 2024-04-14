const shiftsRepo = require('../repositories/shiftsRepo')

const getAll = () => {
    return shiftsRepo.getAll().then((shifts) => {
        // Format each date to 'yyyy-MM-dd' after retrieval
        const formattedShifts = shifts.map(shift => {
        const formattedDate = shift.date.toISOString().split('T')[0];
            return {
                ...shift.toObject(),
                date: formattedDate
            };
        });
        return formattedShifts;
    })
}

const getById = (id) => {
    return shiftsRepo.getById(id)
}

const update = (id,shift) => {
    return shiftsRepo.update(id,shift)
}

const create = (shift) => {
    return shiftsRepo.create(shift)
}

module.exports = {getAll, getById, update, create}