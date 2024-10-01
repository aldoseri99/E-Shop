const express = require("express")
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true,
  })
)

const ensureLoggedIn = require("../config/ensureLoggedin")

const ensureAdmin = require("../config/ensureAdmin")

const ensureSeller = require("../config/ensureSeller")

const itemCntrl = require("../controllers/item")

router.get("/add", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_add_get)
router.post("/add", [ensureLoggedIn, (ensureSeller || ensureAdmin)], ensureLoggedIn, itemCntrl.item_add_post)
router.get("/index", itemCntrl.item_index_get)
router.get("/delete", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_delete_get)
router.get("/edit", [ensureLoggedIn, (ensureSeller || ensureAdmin)],  itemCntrl.item_edit_get)
router.post("/update", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_update_post)
router.get("/details", itemCntrl.item_details_get)

module.exports = router
