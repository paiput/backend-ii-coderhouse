import { cartRepository } from '../repositories/cart.repository.js'
import * as productService from './products.services.js'
import ValidationError from '../errors/validationError.js'
import { verifyToken } from '../utils/auth.utils.js'
import AuthenticationError from '../errors/authenticationError.js'
import AuthorizationError from '../errors/authorizationError.js'
import NotFoundError from '../errors/notFoundError.js'
import ConflictError from '../errors/conflictError.js'

export const getCart = async (cartId) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new NotFoundError('No se encontró el carrito buscado')
  }
  return cart
}

export const createCart = async (cartData) => {
  const existingCart = await cartRepository.getCartByUserId(cartData.userId)
  if (existingCart)
    throw new ConflictError('Ya existe un carrito para el usuario')
  const createdCart = await cartRepository.createCart(cartData)
  return createdCart
}

export const addItemToCart = async (cartId, itemId, token) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new ValidationError('El carrito no existe')
  }
  if (!token) {
    throw new AuthenticationError(
      'Debe estar logueado para agregar productos al carrito'
    )
  }
  const user = verifyToken(token)
  if (cart.userId !== user._id) {
    throw new AuthorizationError(
      'No tiene permisos para modificar este carrito'
    )
  }
  const product = await productService.getProductById(itemId)
  if (!product) {
    throw new ValidationError(
      'El producto que intenta agregar al carrito no existe'
    )
  }
  if (product.stock == 0) {
    throw new ValidationError('El producto no tiene stock disponible')
  }
  const updatedCart = await cartRepository.updateCart(cart._id, {
    products: [...cart.products, product._id],
  })
  return updatedCart
}

export const removeItemFromCart = async (cartId, itemId) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new ValidationError('El carrito no está creado')
  }
  const filteredProducts = cart.products.filter((product) => {
    return product._id.toString() !== itemId
  })
  const updatedCart = await cartRepository.updateCart(cart._id, {
    products: filteredProducts,
  })
  return updatedCart
}

export const closePurchase = async (cart) => {}
