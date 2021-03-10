const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IncomeSchema = mongoose.Schema({
        budgetConcept: { type: Schema.Types.ObjectId, ref: 'BudgetItem' },
        incomeAmount: Number,
        incomeSource: String,
        incomeDate: Date
});

module.exports = mongoose.model('IncomeItem', IncomeSchema)