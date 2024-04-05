//const connectDB = require('./configs/db')
const usersRepo = require('./repositories/usersRepo')
const mongoose = require('mongoose');

const resetUsersActionsCounters = async () => {
    const users = await usersRepo.getAll();
    users.map(async (user) => {
        user.numOfActions = user.maxActions;
        await usersRepo.update(user);
    })
    console.log("The following should match:")
    const usersValidation = await usersRepo.getAll()
    usersValidation.map((user) => {
        console.log(
            user.username,
            user.numOfActions===user.maxActions?"OK":"ERROR!",
            user.numOfActions,
            user.maxActions
        )
    })
}

mongoose
.connect('mongodb://127.0.0.1:27017/factoryDB')
.then(async (db) => {
    console.log('Connected to factoryDB')
    await resetUsersActionsCounters()
    db.disconnect()
})
.catch((error) => console.log(error))
