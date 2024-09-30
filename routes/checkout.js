const express = require('express')
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

const checkoutCntrl = require('../controllers/checkout')

router.get('/index', checkoutCntrl.checkout_)

module.exports = router
