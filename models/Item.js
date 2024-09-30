const mongoose = require("mongoose")

const itemsSchema = mongoose.Schema(
  {
    name: String,
    Price: Number,
    qty: Number,
    image: [String],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
)

const Item = mongoose.model("Item", itemsSchema)

module.exports = Item
