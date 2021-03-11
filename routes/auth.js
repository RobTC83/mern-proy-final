// Rutas para autenticar usuarios
const express = require('express')
const router = express.Router()

const { check } = require('express-validator')
const authController = require('../controllers/authController')
const auth = require('../middleware/auth')

// Iniciar sesión
// /auth 1
router.post('/', 
        [
            check("email", "Agrega un email válido").isEmail(),
            check("password", "El password debe ser mínimo de 6 caracteres").isLength({min: 6})
        ], 
        authController.autenticarUsuario
    )


// api/auth 2
router.get('/', 
        auth,
        authController.usuarioAutenticado
)


module.exports =  router