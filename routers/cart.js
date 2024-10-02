const express = require('express')

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)

const ensreLoggedIn = require('../config/ensureLoggedin')

//imoprt controller

const cartCntrl = require('../controllers/cart')

router.get('/index', ensreLoggedIn, cartCntrl.cart_index_get)
router.post('/addToCart', ensreLoggedIn, cartCntrl.cart_addToCart_post)
router.get('/delete', ensreLoggedIn, cartCntrl.cart_delete_get)
router.post('/increase', ensreLoggedIn, cartCntrl.cart_increase_post)
router.post('/decrease', ensreLoggedIn, cartCntrl.cart_decrease_post)

module.exports = router
