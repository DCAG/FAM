const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
    {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        startWorkYear: Number,
        departmentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Department'}
    },
    { versionKey: false }
)

const Employee = mongoose.model('employee', employeeSchema, 'employees')

module.exports = Employee