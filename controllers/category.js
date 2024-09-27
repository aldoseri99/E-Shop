const Category = require("../models/Category")
const Item = require("../models/Item")

exports.category_add_get = (req, res) => {
  res.render("category/add")
}

exports.category_add_post = (req, res) => {
  let category = new Category(req.body)

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
