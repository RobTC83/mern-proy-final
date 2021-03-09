const IncomeItem = require('../models/IncomeItem.model')
const { validationResult } = require('express-validator')

exports.crearIngreso = async (req, res) => {

    try {
        //Crear un nuevo ingreso
        const ingreso = new IncomeItem(req.body)

        // Guardar el creador via JWT
        ingreso.creador = req.usuario.id 

        // Guardar el ingreso
        ingreso.save()
        res.json(ingreso)

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error")
    }

}