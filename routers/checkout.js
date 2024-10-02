const express = require('express')
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

const checkoutCntrl = require('../controllers/checkout')

router.post('/index', checkoutCntrl.checkout_index_post)

module.exports = router
