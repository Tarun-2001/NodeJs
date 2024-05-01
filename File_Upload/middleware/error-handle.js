const CustomError = require("../../Jobs_2.0/errors/CustomError")

const error = (err,req,res,next)=>{
    if(err instanceof CustomError)
        return res.status(err.statusCode).json({msg:err.message})
    return res.status(500).json({msg:'Oops Something Went Wrong',DetailMesage:err})
}

module.exports = {error}