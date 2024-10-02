module.exports = function (req, res, next) {
    if (req.user.type === 'seller') return next()
    res.redirect('/')
}