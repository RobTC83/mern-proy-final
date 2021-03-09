const express = require('express')
const conectarDB = require('./config/db')
const cors = require("cors") // EL CORS ES UNA LIBRERÍA QUE ME PERMITE GESTIONAR DE MEJOR FORMA LOS ACCESOS ENTRE APLICACIONES. (frontend <> backend)

const userRoutes = require('./routes/usuarios')

// CREAR SERVIDOR
const app = express()

// Conectar a base de datos
conectarDB()


// MIDDLEWARES
// Habilitar CORS
app.use(cors())

// Habilitar express.json. Permitir datos que el usuario envíe.
// ESTA ES LA LIBRERÍA IGUAL A BODYPARSER
app.use(express.json({extended:true}))

// PUERTO DE LA APP
const PORT = process.env.PORT || 4000

// RUTEO
// Importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))

// DEFINIR LA PÁGINA PRINCIPAL
app.get('/', (req,res) => {
    res.send("Hola mundo")
})

// ARRANCAR LA APP
app.listen(PORT, () => {
    console.log("El servidor está funcionando")
})