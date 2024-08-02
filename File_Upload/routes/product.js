const express = require('express')
const { getAllProducts, createProduct} = require('../controllers/productController')
const { uploadProductImageLocal,uploadProductImage } = require('../controllers/uploadController')


const router = express.Router()
router.get('/getProduct',getAllProducts)
router.post('/createProduct',createProduct)
router.post('/uploadFile',uploadProductImage)

module.exports = router