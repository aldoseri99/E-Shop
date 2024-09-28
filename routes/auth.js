const express = require('express')
const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const authCtrl = require('../controllers/auth')

router.get('/auth/google', authCtrl.auth_login_google)
router.get('/oauth2callback', authCtrl.auth_callback_google)
router.get('/logout', authCtrl.auth_logout_google)

module.exports = router
