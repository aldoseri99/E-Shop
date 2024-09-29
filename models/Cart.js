const mongoose = require("mongoose")

const cartSchema = mongoose.Schema(
  {
    item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
    userId: {
      // to know which user have the cart
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
)

const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
