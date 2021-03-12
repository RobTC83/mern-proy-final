const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BudgetSchema = new Schema (
    {
        budgetOwner: {type: Schema.Types.ObjectId, ref: 'Users'},
        budgetConcept: String,
        budgetAmount: Number,
        expenseInfo: []
    })

    module.exports = mongoose.model('BudgetItem', BudgetSchema)
