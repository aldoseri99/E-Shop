const express = require('express')
const mongoose = require('mongoose')

const session = require('express-session')
const passport = require('passport')

//PORT Configurations

const PORT = 4000

//initialize express

const app = express()

const db = require('./config/db')

//shorten acces to views folder

app.set('view engine', 'ejs')

// Passport and session configuration
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

//mount routes
app.use('/category', categoryRouter)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
