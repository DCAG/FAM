const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema(
    {
        date: Date,
        startHour: Number,
        endHour: Number,
        assignedEmployee: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employee'}]
    },
    { versionKey: false }
)

const Shift = mongoose.model('shift', shiftSchema, 'shifts')

module.exports = Shift