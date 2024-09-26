const express = require("express")
const mongoose = require("mongoose")

//PORT Configurations

const PORT = process.env.PORT

//intitialize express

const app = express()

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
