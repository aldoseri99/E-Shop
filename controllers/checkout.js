const Cart = require('../models/Cart')
const Checkout = require('../models/Checkout')
const Order = require('../models/Order')

exports.checkout_index_post = (req, res) => {
  try {
    const items = JSON.parse(req.body.items)
    const total = req.body.total
    const cart = JSON.parse(req.body.cart)

    console.log(cart)
    console.log(cart._id)

    let order = new Order({
      order: items,
      totalAmount: total,
      orderStatus: 'Processing',
      userId: req.user._id
    })
    order
      .save()
      .then(() => {
        Cart.findByIdAndUpdate(cart._id, {
          $set: {
            items: []
          }
        })
          .then(() => {
            res.render('checkout/index', { items, total })
          })
          .catch((err) => {
            console.log(err)
            res.send('try again later')
          })
      })
      .catch((err) => {
        console.log(err)
        res.send('try again later')
      })
  } catch (error) {
    console.error('Invalid JSON received:', error)
    res.status(400).send('Invalid items data.')
  }
}
