const express = require("express")
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true,
  })
)

const itemCntrl = require("../controllers/item")

router.get("/add", itemCntrl.item_add_get)
router.post("/add", itemCntrl.item_add_post)

module.exports = router
