const Cart = require("../models/Cart")
const Item = require("../models/Item")

exports.cart_addToCart_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  try {
    const item = await Item.findById(itemId)
    if (!item) {
      return res.status(404).send("Item not found")
    }

    let cart = await Cart.findOne({ userId: userId })
    if (!cart) {
      cart = new Cart({ userId: userId, item: [] })
    }

    cart.item.push(itemId)
    await cart.save()

    res.redirect("/cart/index")
  } catch (err) {
    console.log(err)
    if (!res.headersSent) {
      res.status(500).send("Server error")
    }
  }
}

exports.cart_index_get = (req, res) => {
  const userId = req.user._id

  // Find the user's cart
  Cart.findOne({ userId: userId })
    .populate("item")
    .then((cart) => {
      if (!cart || cart.item.length === 0) {
        return res.render("cart/index", {
          items: [],
          message: "Your cart is empty",
        })
      }

      const items = cart.item

      res.render("cart/index", { items })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send("Error fetching cart")
    })
}
