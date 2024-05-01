const path = require('path')
const StatusCodes = require('http-status-codes')

const createProduct = (req,res)=>{
    res.send("product created")
}

const getAllProducts = (req,res)=>{
    res.send("getAllProducts")
}

module.exports = {createProduct,getAllProducts}