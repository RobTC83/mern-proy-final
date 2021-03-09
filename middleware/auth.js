const jwt = require('jsonwebtoken')

module.exports = function(req,res,next){
    // Leer el token del header
    const token = req.header('x-auth-token')

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({msg: "No hay token, permiso no válido"})
    }

    // Validar el token

    try {
        const cifrado = jwt.verify(token, process.env.SECRETA) // Verificar el token que se está recibiendo contra la palabra secreta del BACKEND
        req.usuario = cifrado.usuario
        next() // Saltar al siguiente middleware o al controller

    } catch(error){
        res.status(401).json({msg: "Token no válido"})
    }
}