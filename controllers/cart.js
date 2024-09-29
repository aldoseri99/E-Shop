const Items = require('../models/Item')
const Cart = require('../models/Cart')

exports.cart_add_get = (req, res) => {
  res.render('cart/add')
}

exports.cart_add_post = (req, res) => {
  let cart = new Cart(req.body)

  cart
    .save()
    .then(() => {
      res.redirect('/cart/index')
    })
    .catch((err) => {
      console.log(err)
      res.send('try again later')
    })
}

exports.cart_index_get = (req, res) => {
  Items.find()
    .then((cart) => {
      res.render('cart/index', { cart })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.cart_delete_get = (req, res) => {
  Items.findByIdAndDelete(req.query.id)

    .then(() => {
      res.redirect('/cart/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.cart_edit_get = (req, res) => {
  Items.findById(req.query.id)
    .then((cart) => {
      res.render('cart/edit', { cart })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.cart_update_post = (req, res) => {
  Items.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/cart/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
