const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
    {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        startWorkYear: Number,
        department: {type: mongoose.Schema.Types.ObjectId, ref: 'department'},
        assignedShifts: [{type: mongoose.Schema.Types.ObjectId, ref: 'shift'}]
    }, 
    { versionKey: false }
)

const Employee = mongoose.model('employee', employeeSchema, 'employees')

module.exports = Employee