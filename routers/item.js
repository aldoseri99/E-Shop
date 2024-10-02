const express = require('express')
const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true
  })
)


const ensureLoggedIn = require("../config/ensureLoggedin")

const ensureAdmin = require("../config/ensureAdmin")

const ensureSeller = require("../config/ensureSeller")

const itemCntrl = require("../controllers/item")


router.get("/add", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_add_get)
router.post("/add", upload.array("images", 5), itemCntrl.item_add_post)
router.get("/index", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_index_get)
router.get("/delete", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_delete_get)
router.get("/edit", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_edit_get)
router.post("/update", upload.array("images", 5), itemCntrl.item_update_post)
router.get("/details", [ensureLoggedIn, (ensureSeller || ensureAdmin)], itemCntrl.item_details_get)
router.get('/myItems', [ensureLoggedIn, (ensureSeller)], itemCntrl.item_sellerItems_get)
/*router.post("/deleteImage", itemCntrl.itemImages_delete_post)*/


module.exports = router
