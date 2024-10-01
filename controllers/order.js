const Order = require('../models/Order')

exports.order_index_get = (req, res) => {
  Order.find()
    .populate('orders')
    .then((orders) => {
      res.render('order/index', { orders })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.order_create_post = (req, res) => {
  Order.find()
    .populate('orders')
    .then((orders) => {
      res.redirect('/order/index', { orders })
    })
    .catch((err) => {
      console.log(err)
    })
}
