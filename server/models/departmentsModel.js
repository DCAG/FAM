const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        manager: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
    },
    { versionKey: false }
)

const Department = mongoose.model('department', departmentSchema, 'departments')

module.exports = Department
