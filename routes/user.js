const express = require('express')

const router = express.Router()

router.use(express.urlencoded({ extended: true }))

const userCtrl = require('../controllers/user')

router.get('/index', userCtrl.user_index_get)

router.get('/edit', userCtrl.user_edit_get)
router.post('/edit', upload.single('avatar'), userCtrl.user_edit_post)

module.exports = router
