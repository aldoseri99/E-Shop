const Cart = require('../models/Cart')
const Order = require('../models/Order')
const Item = require('../models/Item')

exports.checkout_index_post = (req, res) => {
  try {
    const items = JSON.parse(req.body.items)
    const total = req.body.total
    const cart = JSON.parse(req.body.cart)

    console.log(cart.items[0])
    console.log(cart.items[0].item)

    let order = new Order({
      totalAmount: total,
      orderStatus: 'Processing',
      userId: req.user._id,
      order: []
    })
    cart.items.forEach((item) => {
      order.order.push(item.item)
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
