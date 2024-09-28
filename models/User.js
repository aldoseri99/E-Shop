const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    phone: String,
    type: String
  },
  {
    timestamps: true
  }
)

const Uyser = mongoose.model('Uyser', userSchema)

module.exports = Uyser
