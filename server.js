const express = require("express")
const mongoose = require("mongoose")
const expressLayouts = require('express-ejs-layouts')
//PORT Configurations

const PORT = process.env.PORT

//intitialize express

const app = express()

app.use(expressLayouts)

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
