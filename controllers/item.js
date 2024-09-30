const Category = require("../models/Category")
const Item = require("../models/Item")

const multer = require("multer")

let fileName
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/itemImages")
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + "-" + file.originalname
    cb(null, fileName)
  },
})
upload = multer({ storage })

exports.item_add_post = (req, res) => {
  console.log("req body =", JSON.stringify(req.body, null, 2))
  console.log("req file =", JSON.stringify(req.file, null, 2))

  if (!req.file) {
    return res.status(400).send("No files uploaded.")
  }

  const fileName = req.file.filename

  const itemData = {
    name: req.body.name,
    price: req.body.Price,
    qty: req.body.qty,
    category: req.body.category,
    image: fileName,
  }

  let item = new Item(itemData)

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

exports.item_add_get = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render("item/add", { categories })
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
