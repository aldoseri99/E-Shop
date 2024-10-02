const mongoose = require('mongoose')

mongoose
  .connect(process.env.MongoDBURL)
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDB Connected to Database: ${db.name} at Host ${db.host} on PORT: ${db.port}`
    )
  })
  .catch((err) => {
    console.log('MongoDB not Connected' + err)
  })
