const mongoose = require("mongoose")

mongoose
  .connect("mongodb+srv://saraisa:saraisa_2020@sei-11.g7h33.mongodb.net/eshop")
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDB Connected to Database: ${db.name} at Host ${db.host} on PORT: ${db.port}`
    )
  })
  .catch((err) => {
    console.log("MongoDB not Connected" + err)
  })
