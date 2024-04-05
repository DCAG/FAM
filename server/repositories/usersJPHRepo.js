const axios = require('axios')

USERS_URL = "https://jsonplaceholder.typicode.com/users"

const getAll = async () => {
    const {data} = await axios.get(USERS_URL)
    return data
}

const getById = async (id) => {
    const {data} = await axios.get(`${USERS_URL}/${id}`)
    return data
}

const getByUsername = async (username) => {
    console.log("get user from ", `${USERS_URL}?username=${username}`)
    const {data} = await axios.get(`${USERS_URL}?username=${username}`)
    return data
}

module.exports = {getById, getByUsername, getAll}