import { cartRepository } from '../repositories/cart.repository.js'
import * as productService from './products.services.js'
import * as ticketService from './ticket.services.js'
import * as userService from './user.services.js'
import { verifyToken } from '../utils/auth.utils.js'
import ValidationError from '../errors/validationError.js'
import AuthorizationError from '../errors/authorizationError.js'
import NotFoundError from '../errors/notFoundError.js'
import ConflictError from '../errors/conflictError.js'

export const getCart = async (cartId) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new NotFoundError(`El carrito ${cartId} no existe`)
  }
  return cart
}

export const createCart = async (userToken, cartData) => {
  const user = verifyToken(userToken)
  const existingCart = await cartRepository.getCartByUserId(user._id)
  if (existingCart)
    throw new ConflictError('Ya existe un carrito para el usuario')
  const createdCart = await cartRepository.createCart({
    ...cartData,
    userId: user._id,
  })
  return createdCart
}

export const addItemToCart = async (cartId, cartData, userToken) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new ValidationError('El carrito no existe')
  }
  const user = verifyToken(userToken)
  if (cart.userId.toString() !== user._id) {
    throw new AuthorizationError(
      'No tiene permisos para modificar este carrito'
    )
  }
  const product = await productService.getProductById(cartData.productId)
  if (!product) {
    throw new ValidationError(
      'El producto que intenta agregar al carrito no existe'
    )
  }
  if (product.stock == 0) {
    throw new ValidationError('El producto no tiene stock disponible')
  }
  const newProduct = { quantity: cartData.quantity, product }
  const updatedCart = await cartRepository.updateCart(cart._id, {
    products: [...cart.products, newProduct],
  })
  return updatedCart
}

export const removeItemFromCart = async (cartId, itemId, userToken) => {
  const cart = await cartRepository.getCartById(cartId)
  if (!cart) {
    throw new ValidationError('El carrito no está creado')
  }
  const user = verifyToken(userToken)
  if (cart.userId.toString() !== user._id) {
    throw new AuthorizationError(
      'No tienes permisos para borrar un item de este carrito'
    )
  }
  const filteredProducts = cart.products.filter((cartProduct) => {
    return cartProduct.product._id.toString() !== itemId
  })
  const updatedCart = await cartRepository.updateCart(cart._id, {
    products: filteredProducts,
  })
  return updatedCart
}

export const closePurchase = async (cartId) => {
  const cart = await getCart(cartId)
  if (!cart) {
    throw new ValidationError('El carrito que intenta cerrar no existe')
  }
  const user = await userService.getUserById(cart.userId)
  const { products } = cart
  let totalAmount = 0
  for (const cartProduct of products) {
    const product = await productService.getProductById(cartProduct.product._id)
    if (cartProduct.quantity > product.stock) {
      throw new ConflictError(
        `El producto ${cartProduct._id} tiene stock menor a la cantidad que intenta comprar`
      )
    }
    totalAmount += cartProduct.product.price * cartProduct.quantity
  }
  await cartRepository.updateCart(cartId, {
    products: [],
  })
  const soldProducts = products.map((cartProduct) => cartProduct.product)
  const ticketData = {
    purchaser: `${user.first_name} ${user.last_name}`,
    products: soldProducts,
    amount: totalAmount,
  }
  const ticket = await ticketService.createTicket(ticketData)
  return ticket
}
