const Cart = require("../models/Cart")
const Item = require("../models/Item")

exports.item_addToCart_post = (req, res) => {
  const itemId = req.query.id
  const userId = req.user._id

  Item.findById(itemId)

    .then((item) => {
      cart.item.push(item)
      cart.save()
      res.redirect("/cart/index")
    })
    .catch((err) => {
      console.log(err)
    })
}
