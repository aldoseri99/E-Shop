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

exports.user_list_get = (req, res) => {
  User.find()
    .then((users) => {
      res.render('user/list', { users })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.user_adminedit_get = (req, res) => {
  User.findById(req.query.id)
    .then((account) => {
      res.render('user/useredit', { account })
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.user_adminedit_post = (req, res) => {
  User.findByIdAndUpdate(req.body.id, {
    $set: {
      type: req.body.type
    }
  })
    .then(() => {
      res.redirect('/user/list')
    })
    .catch((err) => {
      console.log(err)
    })
}
