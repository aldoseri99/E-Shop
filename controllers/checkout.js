const Cart = require('../models/Cart')
const Checkout = require('../models/Checkout')

exports.checkout_index_get = (req, res) => {
  Checkout.find()
    .then((checkout) => {
      res.render('checkout/index', { checkout })
    })
    .catch((err) => {
      console.log(err)
    })
}
