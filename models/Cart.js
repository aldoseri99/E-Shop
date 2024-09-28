const mongoose = require('mongoose')

const cartSchema = mongoose.Schema(
  {
    items: [], // nested array takes the items (name/id) and quantity [[item1, 3], [item2,2]]
    userId: {
      // to know which user have the cart
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
