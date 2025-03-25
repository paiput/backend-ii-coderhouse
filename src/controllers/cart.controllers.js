import * as cartService from '../services/cart.services.js'
import { getUserToken } from '../utils/auth.utils.js'

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
    const userToken = getUserToken(req)
    const createdCart = await cartService.createCart(userToken, body)
    return res.status(201).json(createdCart)
  } catch (error) {
    next(error)
  }
}

export const closePurchase = async (req, res, next) => {
  try {
    const { cid } = req.params
    const ticket = await cartService.closePurchase(cid)
    return res.status(200).json(ticket)
  } catch (error) {
    next(error)
  }
}

export const addItem = async (req, res, next) => {
  try {
    const { cid } = req.params
    const userToken = getUserToken(req)
    const { body } = req
    const updatedCart = await cartService.addItemToCart(cid, body, userToken)
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
    const userToken = getUserToken(req)
    const updatedCart = await cartService.removeItemFromCart(
      cid,
      itemId,
      userToken
    )
    return res.status(200).json(updatedCart)
  } catch (error) {
    next(error)
  }
}
