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
router.get("/index", itemCntrl.item_index_get)
router.get("/delete", itemCntrl.item_delete_get)
router.get("/edit", itemCntrl.item_edit_get)
router.post("/update", itemCntrl.item_update_post)

module.exports = router
