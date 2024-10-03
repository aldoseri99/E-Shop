const express = require('express')

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

//imoprt controller
const ensureLoggedIn = require('../config/ensureLoggedin')
const orderCntrl = require('../controllers/order')

router.get('/index', ensureLoggedIn, orderCntrl.order_index_get)
router.post('/update', ensureLoggedIn, orderCntrl.order_update_post)
router.post('/detail', ensureLoggedIn, orderCntrl.order_detail_post)

module.exports = router
