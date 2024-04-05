const usersJPHRepo = require('../repositories/usersJPHRepo')
const usersRepo = require('../repositories/usersRepo')
const logUtils = require('../utils/logUtils')

const dateFns = require('date-fns')

const getAll = () => {
    return usersRepo.getAll()
}

const getById = (id) => {
    return usersRepo.getById(id)
}

const getByUsername = (username) => {
    return usersRepo.getByUsername(username)
}

/**
 * 
 * @param {*} username
 * @param {*} email email used as the secret
 * @returns if authentication was successful (successful)
 */
const verifyCredentials = async (username, email) => {
    console.log("username",username,"email",email)

    try{
        const registeredUser = await getByUsername(username)
        console.log("registeredUser",registeredUser)
        console.log("registerd user id", registeredUser.id)
        console.log("registerd user id", typeof registeredUser.id)
        if(!registeredUser){ // user does not exist in users collection in db
            throw "some error" // should not emit errors to client on authentication
        }
        // authenticating against the jsonplaceholder website
        const user = await usersJPHRepo.getByUsername(username)
        console.log(user)
        return user[0].email === email
    }
    catch(error){
        console.log("some error in verifyCredentials", error)
        return false
    }
}

const performAction = async (id) => {
    const user = await getById(id)
    console.log("(function:\\) performAction\n", user)
    if(user.numOfActions <= 0){
        throw {
            name: "DAILY_MAX_ACTIONS_REACHED",
            message: "User performed the maximum number of actions allowed for today.",
            action: { // suggested action
                type: "redirect",
                to: "logout"
            }
        }
    }
    else{
        user.numOfActions = user.numOfActions - 1
        await usersRepo.update(user)
        const logItem = {
            "id": id,
            "maxActions": user.maxActions,
            "date": dateFns.format(new Date(),'dd/MM/yyyy'),
            "actionsAllowed": user.numOfActions
        }
        logUtils.logActionItem(logItem)
    }
}

module.exports = {getAll, getById, getByUsername, verifyCredentials, performAction}