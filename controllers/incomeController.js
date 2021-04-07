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
        res.json({ingresos: ingreso})


        // // inyectar este ingreso al usuario
        // console.log("ingreso es:", ingreso)
        
        // const id = req.usuario.id
        // console.log("id",id)
        // const agregarIngreso = await Users.findByIdAndUpdate(id,{$push: {incomeInfo: ingreso}},{new:true})
        // res.json(agregarIngreso)
        

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error registrando el ingreso")
    }
}
// Mostrar los ingresos del usuario
exports.mostrarIngresos = async (req,res) => {
    try{
        
        const ingresos = await IncomeItem.find({incomeOwner: req.usuario.id}).populate('incomeOwner').sort({incomeAmount:-1})
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

        // si el elemento existe,
        if(!ingreso) {
            return res.status(400).json({msg: "Ingreso no encontrado"})
        }
        // console.log("Esto es req.usuario.id",req.usuario.id )
        // verificar al dueño de ese ingreso
        if(ingreso.incomeOwner.toString() !== req.usuario.id) {
            return res.status(401).json({msg: "Usuario-Ingreso no encontrado"})
        }

        // eliminar el elemento
        await IncomeItem.findOneAndRemove({_id: req.params.id})

        console.log("eliminar",req.usuario)
        res.json({msg:"Ingreso eliminado"})
         

    
    } catch(error) {
        console.log(error)
        res.status(500).send("Error en el servidor")
    }
        
}

// editar un ingreso dado de alta


exports.editarIngreso = async (req,res)=> {
    

    try{
        // obtener el elemento
        let id = await IncomeItem.findById(req.params.id)

        console.log("el id es",id)
        const {incomeAmount, incomeSource, incomeDate} = req.body
    
        let editarIngreso = await IncomeItem.findByIdAndUpdate(id,{incomeAmount, incomeSource, incomeDate},{new:true})
        res.json({editarIngreso})

    }
    catch(error){
        console.log(error)
        res.status(500).send("Hubo un error editando el elemento")
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
        res.json({sumaIngresos: sumaIngresos})

    } catch(error){
        console.log(error)
        res.status(500).send("Hubo un error obteniendo el total de ingresos")
    }

}