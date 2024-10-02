const express = require("express")

const router = express.Router()

//use parser

router.use(
  express.urlencoded({
    extended: true,
  })
)

//imoprt controller

const categoryCntrl = require("../controllers/category")

router.get("/add", categoryCntrl.category_add_get)
router.post("/add", upload.single("images"), categoryCntrl.category_add_post)
router.get("/index", categoryCntrl.category_index_get)
router.get("/delete", categoryCntrl.category_delete_get)
router.get("/edit", categoryCntrl.category_edit_get)
router.post(
  "/update",
  upload.single("images"),
  categoryCntrl.category_update_post
)
router.get("/details", categoryCntrl.category_details_get)

module.exports = router
