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

        ],
    expenseController.crearGasto
)

module.exports = router
