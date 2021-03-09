//const BudgetItem = require('../models/BudgetItem.model')
const {validationResult} = require('express-validator')

exports.crearPresupuesto = async (req,res) => {
    try{
        //Crear un nuevo presupuesto
        const presupuesto = new BudgetItem(req.body)

        //Guardar el dueño del presupuesto vía JWT
        presupuesto.budgetOwner = req.usuario.id
        console.log(req.usuario.id)
    } catch(error){
        console.log(error)
    }
}

