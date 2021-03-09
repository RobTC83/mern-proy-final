const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IncomeSchema = mongoose.Schema({
    incomeOwner: { type: Schema.Types.ObjectId, ref: 'Users' },
        incomeAmount: Number,
        incomeSource: String,
        incomeDate: Date
});

module.exports = mongoose.model('IncomeItem', IncomeSchema)