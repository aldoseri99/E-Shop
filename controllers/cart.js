const Cart = require('../models/Cart')
const Item = require('../models/Item')

exports.cart_addToCart_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  try {
    let cart = await Cart.findOne({ userId: userId })
    console.log(cart)

    if (!cart) {
      cart = new Cart({ userId: userId, items: [] })
    }
    const existingItem = cart.items.find((cartItem) =>
      cartItem.item.equals(itemId)
    )

    if (existingItem) {
      existingItem.qty += 1
    } else {
      cart.items.push({ item: itemId, qty: 1 })
    }

    await cart.save()

    let item = await Item.findById(itemId)
    item.qty -= 1
    if (item.qty === 0) {
      item.status = 'not available'
    } else {
      item.status = 'available'
    }
    await item.save()

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
    .then(async () => {
      let item = await Item.findById(itemId)
      item.qty += req.query.qty
      if (item.qty === 0) {
        item.status = 'not available'
      } else {
        item.status = 'available'
      }
      await item.save()
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

    let item = await Item.findById(itemId)
    item.qty -= 1
    if (item.qty === 0) {
      item.status = 'not available'
    } else {
      item.status = 'available'
    }
    await item.save()

    res.redirect('/cart/index')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating cart')
  }
}

exports.cart_decrease_post = async (req, res) => {
  const itemId = req.body.id
  const userId = req.user._id

  let item = await Item.findById(itemId)
  if (item.qty > 0)
    try {
      let cart = await Cart.findOne({ userId: userId })

      const existingItem = cart.items.find((cartItem) =>
        cartItem.item.equals(itemId)
      )

      if (existingItem.qty > 1) {
        existingItem.qty -= 1
      }

      await cart.save()

      item.qty += 1
      if (item.qty === 0) {
        item.status = 'not available'
      } else {
        item.status = 'available'
      }
      await item.save()

      res.redirect('/cart/index')
    } catch (err) {
      console.log(err)
      res.status(500).send('Error updating cart')
    }
}
