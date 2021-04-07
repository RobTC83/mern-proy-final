const ExpenseItem = require('../models/ExpenseItem.model')
const {validationResult} = require('express-validator')
const Users = require ('../models/User.model.js')

exports.crearGasto = async (req,res) => {
    try{

        const gasto = new ExpenseItem(req.body)
        console.log("el req.body es:",req.body)
        console.log("el req.usuario.id es:",req.usuario.id)

        gasto.expenseOwner = req.usuario.id 
        gasto.save()
        res.json(gasto)

        // const id = req.usuario.id
        // const agregarGasto = await Users.findByIdAndUpdate(id,{$push:{expenseInfo: gasto}},{new:true})
        // console.log(agregarGasto)
        // res.json(agregarGasto)

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando crear el gasto')
    }

}

exports.mostrarGastos = async (req,res) => {
    try{
        console.log("este es el req.usuario.id",req.usuario.id)
        const gastos = await ExpenseItem.find({expenseOwner: req.usuario.id}).populate('incomeOwner').sort({expenseAmount:-1})
        res.json(gastos)

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando mostrar los gastos')
    }
}

exports.eliminarGasto = async (req,res)=> {
    try{
        let gasto = await ExpenseItem.findById(req.params.id)
        console.log("este es el req.params.id",gasto)
        await ExpenseItem.findOneAndRemove({_id:gasto})
        res.json({msg:"Gasto eliminado"})

    } catch(error) {
        console.log(error)
        res.status(500).send('Hubo un error inentando eliminar este gasto')
    }
}

exports.totalGastos = async (req,res)=> {
    try{
        const id = req.usuario.id
        const gastos = await ExpenseItem.find({expenseOwner: id}).sort({expenseAmount:-1})
            console.log("gastos:", gastos)
        const soloGastos = gastos.map((element)=>{

                return(element.expenseAmount)
        })
        console.log("solo gastos:",soloGastos)
        const sumaGastos = soloGastos.reduce((a,b)=>{
                return(a+b)
        })
        console.log(sumaGastos)
        res.json({sumaGastos: sumaGastos})

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando sumar los gastos')
    }
}
