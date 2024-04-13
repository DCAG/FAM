const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema(
    {
        date: Date,
        startingHour: Number,
        endingHour: Number,
        employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'employee'}]
    },
    { versionKey: false }
)

const Shift = mongoose.model('shift', shiftSchema, 'shifts')

module.exports = Shift