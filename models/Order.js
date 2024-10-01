const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order'
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Pending', 'Delivered'],
    default: 'Processing'
  }
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
