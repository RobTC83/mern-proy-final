const IncomeItem = require('../models/IncomeItem.model')
const { validationResult } = require('express-validator')

exports.crearIngreso = async (req, res) => {

    try {
        //Crear un nuevo ingreso
        const ingreso = new IncomeItem(req.body)

        // Guardar el creador via JWT
        ingreso.incomeOwner = req.usuario.id 

        // Guardar el ingreso
        ingreso.save()
        res.json(ingreso)

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
            return((element.incomeAmount))
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