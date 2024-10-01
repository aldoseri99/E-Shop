const express = require("express")

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true,
  })
)

const ensureAdmin = require("../config/ensureAdmin")

const ensureLoggedIn = require("../config/ensureLoggedin")

//imoprt controller

const categoryCntrl = require("../controllers/category")

router.get("/add", [ensureLoggedIn, ensureAdmin], categoryCntrl.category_add_get)
router.post("/add", [ensureLoggedIn, ensureAdmin], categoryCntrl.category_add_post)
router.get("/index", categoryCntrl.category_index_get)
router.get("/delete", [ensureLoggedIn, ensureAdmin], categoryCntrl.category_delete_get)
router.get("/edit", [ensureLoggedIn, ensureAdmin], categoryCntrl.category_edit_get)
router.post("/update", [ensureLoggedIn, ensureAdmin], categoryCntrl.category_update_post)
router.get("/details", categoryCntrl.category_details_get)

module.exports = router
