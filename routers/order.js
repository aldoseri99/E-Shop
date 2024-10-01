const express = require('express')

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

//imoprt controller

const orderCntrl = require('../controllers/order')

router.get('/index', orderCntrl.order_index_get)

module.exports = router
