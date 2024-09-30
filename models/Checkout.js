const mongoose = require('mongoose')

const checkoutSchema = mongoose.Schema(
  {
    name: String,
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checkout'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Checkout = mongoose.model('Checkout', checkoutSchema)

module.exports = Checkout
