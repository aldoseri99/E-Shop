const User = require('../models/User')

exports.user_index_get = (req, res) => {
  res.render('user/index')
}

exports.user_edit_get = (req, res) => {
  res.render('user/edit')
}

exports.user_edit_post = (req, res) => {
  User.findByIdAndUpdate(req.body.id, req.body)
    .then(() => {
      res.redirect('/user/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
