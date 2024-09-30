const Checkout = require('../models/Checkout')
const Cart = require('../models/Cart')

exports.checkout_ = (req, res) => {
  Checkout.find()
    .populate('checkout')
    .then((checkout) => {
      res.render('checkout/index', { checkout })
    })
    .catch((err) => {
      console.log(err)
    })
}
