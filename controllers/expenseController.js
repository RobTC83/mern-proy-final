const ExpenseItem = require('../models/ExpenseItem.model')
const {validationResult} = require('express-validator')

exports.crearGasto = async (req,res) => {
    try{
        const gasto = new ExpenseItem(req.body)
        gasto.incomeOwner = req.usuario.id
        gasto.save()
        res.json(gasto)

    } catch(error){
        console.log(error)
        res.status(500).send('Hubo un error intentando crear el gasto')
    }

}

exports.mostrarGastos = async (req,res) => {
    try{
        console.log("este es el req.usuario.id",req.usuario.id)
        const gastos = await ExpenseItem.find({incomeOwner: req.usuario.id}).populate('incomeOwner').sort({expenseAmount:-1})
        res.json({gastos})

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
        const gastos = await ExpenseItem.find({incomeOwner: req.usuario.id}).sort({expenseAmount:-1})
        const soloGastos = gastos.map((element)=>{
                return(element.expenseAmount)
        })
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
