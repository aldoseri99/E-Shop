const express = require('express')
const mongoose = require('mongoose')

//PORT Configurations

const PORT = process.env.PORT

//initialize express

const app = express()

const db = require('./config/db')

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
