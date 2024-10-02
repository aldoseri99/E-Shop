const Cart = require('../models/Cart')
const Item = require('../models/Item')

exports.cart_addToCart_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  try {
    //get user cart
    let cart = await Cart.findOne({ userId: userId })
    console.log(cart)

    //if it does not exist create one with empty items array
    if (!cart) {
      cart = new Cart({ userId: userId, items: [] })
    }

    //check if the item exist in the items array
    const existingItem = cart.items.find((cartItem) =>
      cartItem.item.equals(itemId)
    )

    //if it does exist just increase the quantity
    if (existingItem) {
      existingItem.qty += 1
    } else {
      //if it does not add it with qty 1
      cart.items.push({ item: itemId, qty: 1 })
    }

    //save changes
    await cart.save()

    res.redirect('/cart/index')
  } catch (err) {
    console.log(err)
  }
}

exports.cart_index_get = (req, res) => {
  const userId = req.user._id

  Cart.findOne({ userId: userId })
    .populate('items.item')
    .then((cart) => {
      if (cart.items.length === 0) {
        return res.render('cart/index', {
          items: [],
          message: 'Your cart is empty'
        })
      }

      const items = cart.items
      res.render('cart/index', { items, cart })
    })
    .catch((err) => {
      console.log(err)
      return res.render('cart/index', {
        items: [],
        message: 'Your cart is empty'
      })
    })
}

exports.cart_delete_get = (req, res) => {
  const userId = req.user._id
  const itemId = req.query.id

  Cart.findOneAndUpdate(
    { userId: userId },
    { $pull: { items: { item: itemId } } },
    { new: true }
  )
    .then(() => {
      res.redirect('/cart/index')
    })
    .catch((err) => {
      console.log(err)
    })
}

/////////////////////////////
//similar to add approche
/////////////////////////////

exports.cart_increase_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  try {
    let cart = await Cart.findOne({ userId: userId })

    const existingItem = cart.items.find((cartItem) =>
      cartItem.item.equals(itemId)
    )

    existingItem.qty += 1

    await cart.save()

    res.redirect('/cart/index')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating cart')
  }
}

exports.cart_decrease_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  try {
    let cart = await Cart.findOne({ userId: userId })

    const existingItem = cart.items.find((cartItem) =>
      cartItem.item.equals(itemId)
    )

    if (existingItem.qty > 1) {
      existingItem.qty -= 1
    }

    await cart.save()

    res.redirect('/cart/index')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating cart')
  }
}
