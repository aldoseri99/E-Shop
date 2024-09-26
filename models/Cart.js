const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
  {
    name: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
