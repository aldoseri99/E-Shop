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

  item
    .save()
    .then(() => {
      Category.findById(req.body.category)
        .then((category) => {
          category.item.push(item)
          category.save()
        })
        .catch((err) => {
          console.log(err)
        })

      res.redirect("/item/index")
    })

    .catch((err) => {
      console.log(err)
    })
}

exports.item_index_get = (req, res) => {
  Item.find()
    .populate("category")
    .then((items) => {
      res.render("item/index", { items })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_delete_get = (req, res) => {
  console.log(req.query.id)
  Item.findByIdAndDelete(req.query.id)
    .then(() => {
      res.redirect("/item/index")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_edit_get = (req, res) => {
  console.log(req.query.id)
  Item.findById(req.query.id)
    .then((item) => {
      return Category.find().then((categories) => {
        res.render("item/edit", { item, categories })
      })
    })

    .catch((err) => {
      console.log(err)
    })
}

exports.item_update_post = (req, res) => {
  Item.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect("/item/index")
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_details_get = (req, res) => {
  Item.findById(req.query.id)
    .then((item) => {
      res.render("item/details", { item })
    })
    .catch((err) => {
      console.log(err)
    })
}
