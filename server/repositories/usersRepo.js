const users = require('../models/usersModel')

const getAll = () => {
    return users.find()
}

const getById = (id) => {
    return users.findById(id)
}

const getByUsername = (username) => {
    return users.findOne({username: username})
}

const update = (user) => {
    return user.save()
    //return users.findByIdAndUpdate(id, {numOfActions: numOfActions})
}

module.exports = {getAll, getById, getByUsername, update}