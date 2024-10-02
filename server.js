const express = require('express')
const mongoose = require('mongoose')

const expressLayouts = require("express-ejs-layouts")


const session = require("express-session")
const passport = require("passport")


// dotenv configuration
require('dotenv').config()

//PORT Configurations
const PORT = 4000

//initialize express
const app = express()

const db = require('./config/db')

app.use(expressLayouts)


app.use(express.static("public"))

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


const indexRouter = require("./routers/index")
const categoryRouter = require("./routers/category")
const userRouter = require("./routers/user")
const authRouter = require("./routers/auth")
const itemRouter = require("./routers/item")
const cartRouter = require("./routers/cart")
const checkoutRouter = require("./routers/checkout")
const searchRouter = require("./routers/search")
const orderRouter = require("./routers/order")
//mount routes

app.use('/', indexRouter)
app.use('/category', categoryRouter)
app.use('/user', userRouter)
app.use('/', authRouter)
app.use('/item', itemRouter)
app.use('/cart', cartRouter)
app.use('/checkout', checkoutRouter)
app.use('/search', searchRouter)
app.use('/order', orderRouter)



app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
