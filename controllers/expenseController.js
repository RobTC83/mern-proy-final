const ExpenseItem = require('../models/ExpenseItem.model')
const {validationResult} = require('express-validator')

exports.crearGasto = async (req,res) => {
    try{

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando crear el gasto')
    }

}