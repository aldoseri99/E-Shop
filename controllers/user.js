const User = require('../models/User')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profileImages')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
upload = multer({ storage })

exports.user_index_get = (req, res) => {
  res.render('user/index')
}

exports.user_edit_get = (req, res) => {
  res.render('user/edit')
}

exports.user_edit_post = (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      avatar: req.file.filename
    }
  })
    .then(() => {
      console.log(req.file)
      res.redirect('/user/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
