const BudgetItem = require('../models/BudgetItem.model')
const {validationResult} = require('express-validator')

exports.crearPresupuesto = async (req,res) => {
    try{
        //Crear un nuevo presupuesto
        const presupuesto = new BudgetItem(req.body)

        //Guardar el dueño del presupuesto vía JWT
        presupuesto.budgetOwner = req.usuario.id

        // Guardar el presupuesto
        presupuesto.save()
        res.json(presupuesto)

    } catch(error){
        console.log(error)
    }
}

exports.mostrarPresupuesto = async (req,res) =>{
    try{
        const presupuestos = await BudgetItem.find({budgetOwner:req.usuario.id}).populate('budgetOwner').sort({budgetAmount:-1})
        res.json({presupuestos})
        
    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando mostrar el presupuesto')
    }
}

