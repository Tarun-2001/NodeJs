const express = require('express')
const { getAllProducts, uploadProductImage } = require('../controllers/productController')

const router = express.Router()
router.get('/getProduct',getAllProducts)
router.post('/uploadFile',uploadProductImage)

module.exports = router