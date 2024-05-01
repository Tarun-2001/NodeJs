const express = require('express')
const { getAllProducts} = require('../controllers/productController')
const { uploadProductImageLocal,uploadProductImage } = require('../controllers/uploadController')


const router = express.Router()
router.get('/getProduct',getAllProducts)
router.post('/uploadFile',uploadProductImage)

module.exports = router