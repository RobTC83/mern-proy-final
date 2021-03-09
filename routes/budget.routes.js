const express = require('express')
const router = express.Router()
const budgetController = require('../controllers/budgetController.js')
const auth = require('../middleware/auth')
const {check} = require('express-validator')


// crear un budget
router.post('/',auth,
        [
            check('budgetConcept','Introduce un concepto').not().isEmpty(),
            check('budgetAmount','Introduce una cantidad').not().isEmpty()
        ],
    budgetController.crearPresupuesto)

// mostrar presupuesto
router.get('/',auth, budgetController.mostrarPresupuesto)


// mostrar el total presupuestado

// eliminar partidas

module.exports = router;