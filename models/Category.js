const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    name: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
      }
    ]
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
