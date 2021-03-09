const express = require('express')
const router = express.Router()
const incomeController = require('../controllers/incomeController')
const auth = require('../middleware/auth')
const { check } = require("express-validator")


// crear ingreso
router.post('/',auth,
            [
                check('incomeAmount', "Introduce el monto de tus ingresos").not().isEmpty(),
                check('incomeSource', "Introduce la fuente de tus ingresos").not().isEmpty(),
                check('incomeDate', "Selecciona una fecha").not().isEmpty()
            ],
    incomeController.crearIngreso
)
            

// mostrar todos los ingresos del usuario actual
router.get('/',auth, incomeController.mostrarIngresos)

// eliminar un ingreso dado de alta
router.delete('/:id',
    auth,
    incomeController.eliminarIngreso 
)

// sumar los ingresos del usuario
router.get('/total',auth,incomeController.totalIngresos)


 module.exports = router;
