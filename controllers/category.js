const Category = require("../models/Category")
const Item = require("../models/Item")

const multer = require("multer")

let fileName
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/categoryImages")
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + "-" + file.originalname
    cb(null, fileName)
  },
})
upload = multer({ storage })

exports.category_add_get = (req, res) => {
  res.render("category/add")
}

exports.category_add_post = (req, res) => {
  let category = new Category({
    name: req.body.name,
    image: req.file.filename, // Store the filename in the database
  })

  category
    .save()
    .then(() => {
      res.redirect("/category/index")
    })
    .catch((err) => {
      console.log(err)
      res.send("try again later")
    })
}

exports.category_index_get = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("category/index", { categories })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.category_delete_get = (req, res) => {
  Category.findByIdAndDelete(req.query.id)

    .then(() => {
      res.redirect("/category/index")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.category_edit_get = (req, res) => {
  Category.findById(req.query.id)
    .then((category) => {
      res.render("category/edit", { category })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.category_update_post = (req, res) => {
  Category.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/category/index")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.category_details_get = (req, res) => {
  Category.findById(req.query.id)
    .populate("item")
    .then((category) => {
      res.render("category/details", { category })
    })
    .catch((err) => {
      console.log(err)
    })
}
