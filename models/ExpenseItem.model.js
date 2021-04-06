const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = new Schema (
    {
        expenseAmount: Number,
        expenseConcept: String,
        expenseDate: Date,
        relatedBudget: String,
        relatedBudgetId: {type: Schema.Types.ObjectId,ref:'BudgetItem'}
        
        
        
})

module.exports = mongoose.model('ExpenseItem',ExpenseSchema)