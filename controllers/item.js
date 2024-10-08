const Category = require('../models/Category')
const Item = require('../models/Item')
const { ObjectId } = require('mongoose').Types

const multer = require('multer')

let fileName
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/itemImages')
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + '-' + file.originalname
    cb(null, fileName)
  }
})
upload = multer({ storage })

exports.item_add_post = (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files uploaded.')
  }

  const fileNames = req.files.map((file) => file.filename)

  const itemData = {
    name: req.body.name,
    Price: req.body.Price,
    qty: req.body.qty,
    category: req.body.category,
    description: req.body.description,
    image: fileNames,
    status: req.body.status,
    userId: req.user._id
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

      res.redirect('/item/index')
    })

    .catch((err) => {
      console.log(err)
    })
}

exports.item_add_get = (req, res) => {
  Category.find()
    .then((categories) => {
      res.render('item/add', { categories })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_index_get = (req, res) => {
  Item.find()
    .populate('category')
    .then((items) => {
      res.render('item/index', { items })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_delete_get = (req, res) => {
  Item.findByIdAndUpdate(req.query.id, {
    $set: {
      status: 'not available'
    }
  })
    .then(() => {
      res.redirect('/item/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_edit_get = (req, res) => {
  Item.findById(req.query.id)
    .then((item) => {
      return Category.find().then((categories) => {
        res.render('item/edit', { item, categories })
      })
    })

    .catch((err) => {
      console.log(err)
    })
}

exports.item_update_post = async (req, res) => {
  try {
    const { id, category, name, Price, qty, description } = req.body
    const uploadedImages = req.files

    const item = await Item.findById(id)

    item.category = category
    item.name = name
    item.Price = Price
    item.qty = qty
    item.description = description

    if (uploadedImages && uploadedImages.length > 0) {
      const imagePaths = uploadedImages.map((file) => file.filename)
      item.image = imagePaths
    } else {
      console.error('No images uploaded or an error occurred.')
    }

    await item.save()

    res.redirect('/item/index')
  } catch (err) {
    console.log(err)
  }
}

exports.item_details_get = (req, res) => {
  Item.findById(req.query.id)
    .then((item) => {
      res.render('item/details', { item })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.item_sellerItems_get = (req, res) => {
  Item.find({ userId: new ObjectId(req.user._id) })
    .then((items) => {
      res.render('item/myItems', { items })
    })
    .catch((err) => {
      console.log(err)
    })
}
