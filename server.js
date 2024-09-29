const express = require('express')
const mongoose = require('mongoose')

const expressLayouts = require('express-ejs-layouts')

const session = require('express-session')
const passport = require('passport')

// dotenv configuration
require('dotenv').config()

//PORT Configurations
const PORT = 4000

//initialize express
const app = express()

const db = require('./config/db')

app.use(expressLayouts)

app.use(express.static('public'))

//shorten access to views folder
app.set('view engine', 'ejs')

// Passport and session configuration
require('./config/passport')
app.use(
  session({
    secret: process.env.SECRET,
    reverse: false,
    saveUninitialized: true
  })
)

app.use(passport.initialize())
app.use(passport.session())

// Share the user information across the pages
app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

//import routes
const categoryRouter = require('./routes/category')
const userRouter = require('./routes/user')
const authRouter = require('./routes/auth')

//mount routes
app.use('/category', categoryRouter)
app.use('/user', userRouter)
app.use('/', authRouter)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
