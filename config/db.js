const mongoose = require('mongoose')

mongoose
  .connect(
    'mongodb+srv://ali99aldoseri:And38404405@sei-11.egcwq.mongodb.net/eshop'
  )
  .then(() => {
    const db = mongoose.connection
    console.log(
      `MongoDB Connected to Database: ${db.name} at Host ${db.host} on PORT: ${db.port}`
    )
  })
  .catch((err) => {
    console.log('MongoDB not Connected' + err)
  })
