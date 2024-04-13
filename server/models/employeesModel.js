const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema(
    {
        firstName: {type:String, required:true},
        lastName: {type:String, required:true},
        startWorkYear: Number,
        department: {type: mongoose.Schema.Types.ObjectId, ref: 'department'}
    }, 
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

employeeSchema.virtual('shifts', {
    ref: 'shift',
    localField: '_id',
    foreignField: 'employees'
  });

const Employee = mongoose.model('employee', employeeSchema, 'employees')

module.exports = Employee