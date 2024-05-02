const path = require('path')
const StatusCodes = require('http-status-codes')
const MetaError = require('../../Jobs_2.0/errors/MetaError')
const ProductModel = require('../model/productModel')
const asyncWrapper = require('../../Jobs_2.0/middleware/asyncWrapper')

const createProduct = asyncWrapper(async (req,res)=>{
    const {name,price,image} = req.body
    if(!name||!price||!image) throw new MetaError.BadRequest("Please provide all fields")
    const productDetails = await ProductModel.create({name,price,image})
    if(productDetails) res.status(StatusCodes.CREATED).json({productDetails})
})

const getAllProducts = asyncWrapper(async (req,res)=>{
    const getAllProducts = await ProductModel.find({})
    res.status(StatusCodes.OK).json({result:{
        length:getAllProducts.length(),
        products:getAllProducts
    }})
})

module.exports = {createProduct,getAllProducts}