const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const userCtrl = require('../controllers/user')

const ensureLoggedIn = require("../config/ensureLoggedin")

const ensureAdmin = require("../config/ensureAdmin")

router.get('/index', ensureLoggedIn, userCtrl.user_index_get)

router.get('/edit', ensureLoggedIn, userCtrl.user_edit_get)
router.post('/edit',ensureLoggedIn, upload.single('avatar'), userCtrl.user_edit_post)

router.get('/list', [ensureLoggedIn, ensureAdmin], userCtrl.user_list_get)

router.get('/useredit', [ensureLoggedIn, ensureAdmin], userCtrl.user_adminedit_get)
router.post('/useredit', [ensureLoggedIn, ensureAdmin], userCtrl.user_adminedit_post)

module.exports = router
