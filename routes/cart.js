const express = require('express')
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

const cartCntrl = require('../controllers/cart')

router.get('/add', cartCntrl.cart_add_get)
router.post('/add', cartCntrl.cart_add_post)
router.get('/index', cartCntrl.cart_index_get)
router.get('/delete', cartCntrl.cart_delete_get)
router.get('/edit', cartCntrl.cart_edit_get)
router.post('/update', cartCntrl.cart_update_post)

module.exports = router
