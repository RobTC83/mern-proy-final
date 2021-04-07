const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExpenseSchema = new Schema (
    {
        expenseOwner: {type: Schema.Types.ObjectId,ref:'Users'},
        expenseAmount: Number,
        expenseConcept: String,
        expenseDate: Date,
        relatedBudget: String
        
        
        
})

module.exports = mongoose.model('ExpenseItem',ExpenseSchema)