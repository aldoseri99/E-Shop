const express = require("express")

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true,
  })
)

//imoprt controller

const cartCntrl = require("../controllers/cart")

router.get("/index", cartCntrl.cart_index_get)
router.post("/addToCart", cartCntrl.cart_addToCart_post)
router.get("/delete", cartCntrl.cart_delete_get)
router.post("/increase", cartCntrl.cart_increase_post)
router.post("/decrease", cartCntrl.cart_decrease_post)

module.exports = router
