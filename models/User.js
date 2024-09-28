const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    googleId: {
      type: String,
      required: true
    },
    email: String,
    avatar: String,
    phone: String,
    type: String,
    allData: {}
  },
  {
    timestamps: true
  }
)

const User = mongoose.model('User', userSchema)

module.exports = User
