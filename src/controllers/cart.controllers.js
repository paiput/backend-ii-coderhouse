import * as cartService from '../services/cart.services.js'

export const getCart = async (req, res, next) => {
  try {
    const { cid } = req.params
    const cart = await cartService.getCart(cid)
    return res.status(200).json(cart)
  } catch (error) {
    next(error)
  }
}

export const createCart = async (req, res, next) => {
  try {
    const { body } = req
    const createdCart = await cartService.createCart(body)
    return res.status(201).json(createdCart)
  } catch (error) {
    next(error)
  }
}

export const closePurchase = async (req, res, next) => {
  try {
    const cid = req.params.cid
  } catch (error) {
    next(error)
  }
}

export const addItem = async (req, res, next) => {
  try {
    const { cid } = req.params
    const { token } = req.cookies
    const { body } = req
    const updatedCart = await cartService.addItemToCart(
      cid,
      body.productId,
      token
    )
    return res.status(200).json(updatedCart)
  } catch (error) {
    next(error)
  }
}

export const changeProducts = async (req, res, next) => {
  try {
  } catch (error) {
    next(error)
  }
}

export const removeItem = async (req, res, next) => {
  try {
    const { cid, itemId } = req.params
    const updatedCart = await cartService.removeItemFromCart(cid, itemId)
    return res.status(200).json(updatedCart)
  } catch (error) {
    next(error)
  }
}
