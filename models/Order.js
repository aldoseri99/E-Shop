const mongoose = require('mongoose')

const orderSchema = mongoose.Schema(
  {
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
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
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
