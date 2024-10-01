const passport = require('passport')

exports.auth_login_google = passport.authenticate('google', {
  scope: ['profile', 'email']
})

exports.auth_callback_google = passport.authenticate('google', {
  successRedirect: '/item/myItems',
  failureRedirect: '/category/add'
})

exports.auth_logout_google = (req, res) => {
  req.logout(function () {
    res.redirect('/')
  })
}
