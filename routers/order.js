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
router.post('/update', orderCntrl.order_update_post)
router.post('/detail', orderCntrl.order_detail_post)

module.exports = router
