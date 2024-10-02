const Order = require('../models/Order')
const dayjs = require('dayjs')
var relativeTime = require('dayjs/plugin/relativeTime')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

exports.order_index_get = (req, res) => {
  Order.find()
    .populate('userId')
    .populate('order')
    .then((orders) => {
      console.log(orders)
      res.render('order/index', { orders, dayjs })
    })
    .catch((err) => {
      console.error('Error fetching orders:', err)
      res.status(500).send('Internal Server Error')
    })
}

exports.order_update_post = (req, res) => {
  Order.findByIdAndUpdate(req.body.orderId, {
    $set: {
      orderStatus: req.body.status
    }
  })
    .then(() => {
      Order.find()
        .populate('userId')
        .populate('order')
        .then((orders) => {
          console.log(orders)
          res.render('order/index', { orders, dayjs })
        })
        .catch((err) => {
          console.error('Error fetching orders:', err)
          res.status(500).send('Internal Server Error')
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
