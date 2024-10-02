const mongoose = require("mongoose")

const itemsSchema = mongoose.Schema(
  {
    name: String,
    Price: Number,
    qty: Number,
    description: String,
    image: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }

  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model("Item", itemsSchema)

module.exports = Item
