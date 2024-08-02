const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name:{
        type:String,
        default:"Tarun",
        required:[true,"Please provide name"]
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model("productModel",productModel)