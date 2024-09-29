const Category = require("../models/Category")
const Item = require("../models/Item")

exports.item_add_get = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("item/add", { categories })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_add_post = (req, res) => {
  console.log(req.body)
  let item = new Item(req.body)

  Category.findById(req.body.category)
    .then((category) => {
      category.item.push(item)
      category.save()

      res.redirect("/item/index")
    })
    .catch((err) => {
      console.log(err)
    })
}

/*
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
*/
