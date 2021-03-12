const IncomeItem = require('../models/IncomeItem.model')
const Users = require('../models/User.model')
const { validationResult } = require('express-validator')

exports.crearIngreso = async (req, res) => {

    try {
        //Crear un nuevo ingreso
        const ingreso = new IncomeItem(req.body)

        // Guardar el creador via JWT
        console.log("req.usuario.id:",req.usuario.id)
        ingreso.incomeOwner = req.usuario.id 

        // Guardar el ingreso
        ingreso.save()

        // inyectar este ingreso al usuario
        console.log("ingreso es:", ingreso)
        
        const id = req.usuario.id
        console.log("id",id)
        const agregarIngreso = await Users.findByIdAndUpdate(id,{$push: {incomeInfo: ingreso}},{new:true})
        res.json(agregarIngreso)
        

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error")
    }
}
// Mostrar los ingresos del usuario
exports.mostrarIngresos = async (req,res) => {
    try{
        
        const ingresos = await IncomeItem.find({incomeOwner: req.usuario.id}).populate('incomeOwner')/*.select('ingresos.incomeOwner.username')*/.sort({incomeAmount:-1})
        res.json({ingresos})

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error obteniendo los ingresos")
    }
}

// eliminar un ingreso
exports.eliminarIngreso = async (req,res) => {
    try {
        // obtener el id
        let ingreso = await IncomeItem.findById(req.params.id)

        // si el proyecto existe,
        if(!ingreso) {
            return res.status(400).json({msg: "Ingreso no encontrado"})
        }
        console.log("Esto es req.usuario.id",req.usuario.id )
        // verificar al dueño de ese ingreso
        if(ingreso.incomeOwner.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "Usuario-Ingreso no encontrado"})
        }
        // eliminar el elemento
        await IncomeItem.findOneAndRemove({_id: req.params.id})
        res.json({msg:"Ingreso eliminado"})
    
    } catch(error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
}

//Sumar los ingresos del usuario
exports.totalIngresos = async (req,res)=> {
    try{
        const ingresos = await IncomeItem.find({incomeOwner: req.usuario.id}).sort({incomeAmount:-1})
        //res.json({ingresos})

        const soloIngresos = ingresos.map((element)=>{
            return(element.incomeAmount)
        })

        const sumaIngresos = soloIngresos.reduce((a,b)=>{
            return(a+b)
        })
        console.log(sumaIngresos)
        res.json({sumaIngresos: sumaIngresos})

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error obteniendo el total de ingresos")
    }

}