const express = require('express')
const {dbConnection} = require('../Jobs/Db_Connection')
const dotenv = require('dotenv').config()
const {error} = require('../Jobs_2.0/middleware/error-handle')
const product = require('./routes/product')
const fileupload = require('express-fileupload')

const app = express()
const PORT = 5000 || process.env.PORT
app.use(express.json());
app.use(fileupload())
app.use(express.static('/public'))

app.use("/api/product",product)

app.use(error)
app.listen(PORT,()=>{
    console.log(`Servers sucessfully running on ${PORT}`)
    dbConnection(process.env.MONGOURL)
})

