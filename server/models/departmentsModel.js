const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
    {
        name: {type:String, required:true},
        manager: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'}
    },
    {
        versionKey: false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
)

departmentSchema.virtual('employees', {
    ref: 'employee',
    localField: '_id',
    foreignField: 'department'
  });

const Department = mongoose.model('department', departmentSchema, 'departments')

module.exports = Department
