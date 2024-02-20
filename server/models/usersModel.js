const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        numOfActions: String,
    },
    { versionKey: false }
)

const User = mongoose.model('user', userSchema, 'users')

module.exports = User