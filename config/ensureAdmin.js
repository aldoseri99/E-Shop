module.exports = function (req, res, next) {
    if (req.user.type === 'admin') return next()
    res.redirect('/')
}