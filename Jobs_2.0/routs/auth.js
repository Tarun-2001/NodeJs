const express = require('express')
const { login, register, updateUser } = require('../controllers/auth')
const { protect } = require('../middleware/authentication')

const router = express.Router()

router.post('/login',login)
router.post('/register',register)
router.patch('/updateUser',protect,updateUser)

module.exports = router