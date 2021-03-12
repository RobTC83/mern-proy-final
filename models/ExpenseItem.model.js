const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = new Schema (
    {
        budgetConcept: {type: Schema.Types.ObjectId,ref:'BudgetItem'},
        expenseOwner: {type: Schema.Types.ObjectId,ref:'Users'},
        expenseAmount: Number,
        expenseConcept: String,
        expenseDate: Date
})

module.exports = mongoose.model('ExpenseItem',ExpenseSchema)