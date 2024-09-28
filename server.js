const express = require('express')
const mongoose = require('mongoose')

//PORT Configurations

const PORT = 4000

//initialize express

const app = express()

const db = require('./config/db')

//shorten acces to views folder

app.set('view engine', 'ejs')

//import routes
const categoryRouter = require('./routes/category')

//mount routes
app.use('/category', categoryRouter)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
