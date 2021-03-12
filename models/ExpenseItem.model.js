const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = new Schema (
    {
        budgetConcept: {type: Schema.Types.ObjectId,ref:'BudgetItem'},
        expenseAmount: Number,
        expenseConcept: String,
        expenseDate: Date
})

module.exports = mongoose.model('ExpenseItem',ExpenseSchema)