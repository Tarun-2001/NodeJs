const path = require('path')
const StatusCodes = require('http-status-codes')

const createProduct = (req,res)=>{
    res.send("product created")
}
const uploadProductImage = async (req,res)=>{
    const image = req.files.image
    const imagePath = path.join(__dirname,'../public/uploads/'+`${image.name}`)
    await image.mv(imagePath)
    res.status(200).json({image:{src:`/uploads/${image.name}`}})
}
const getAllProducts = (req,res)=>{
    res.send("getAllProducts")
}

module.exports = {createProduct,uploadProductImage,getAllProducts}