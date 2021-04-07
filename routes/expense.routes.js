const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenseController')
const auth = require('../middleware/auth')
const {check} = require('express-validator')


// crear un gasto

router.post('/',auth,
        [
            check('expenseAmount','Ingresa la cantidad').not().isEmpty(),
            check('expenseConcept','Ingresa el concepto de tu gasto').not().isEmpty(),
            check('expenseDate','Ingresa la fecha de tu gasto').not().isEmpty(),
            check('relatedBudget','Ingresa el presupuesto asociado').not().isEmpty()
        ],
    expenseController.crearGasto
)


// mostrar todos los gastos
router.get('/',auth, expenseController.mostrarGastos
)

// eliminar un gasto
router.delete('/:id',auth, expenseController.eliminarGasto)

// obtener la suma de los gastos
router.get('/total',auth, expenseController.totalGastos)

module.exports = router
