const express = require('express')
const {dbConnection} = require('../Jobs/Db_Connection')
const dotenv = require('dotenv').config()
const {error} = require('../Jobs_2.0/middleware/error-handle')
const product = require('./routes/product')
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2  // **IMP** USE V2(Version 2) 

const app = express()
const PORT = 5000 || process.env.PORT
app.use(express.json());
app.use(fileupload({useTempFiles:true}))
app.use(express.static('/public'))
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})


app.use("/api/product",product)
app.use(error)


app.listen(PORT,()=>{
    console.log(`Servers sucessfully running on ${PORT}`)
    dbConnection(process.env.MONGOURL)
})

