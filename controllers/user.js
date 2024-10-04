const User = require('../models/User')

const multer = require('multer')
let fileName
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/profileImages')
  },
  filename: function (req, file, cb) {
    fileName = Date.now() + '-' + file.originalname
    cb(null, fileName)
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
      avatar: fileName
    }
  })
    .then(() => {
      res.redirect('/user/index')
    })
    .catch((err) => {
      console.log(err)
    })
}
exports.user_list_get = async (req, res) => {
  try {
    const query = req.query.query
    if (!query) {
      const users = await User.find()
      return res.render('user/list', { users: users, message: '' })
    }

    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    })

    if (users.length > 0) {
      res.render('user/list', { users: users, message: '' })
    } else {
      res.render('user/list', { users: [], message: 'No users found' })
    }
  } catch (err) {
    console.log(err)
    res.status(500).send('Error while searching')
  }
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
