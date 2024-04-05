const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        fullName: {type:String, required:true},
        numOfActions: Number,
        maxActions: Number,
        // jsonplaceholder - for authentication
        username: {type:String, required: true}
    },
    { versionKey: false }
)

const User = mongoose.model('user', userSchema, 'users')

module.exports = User