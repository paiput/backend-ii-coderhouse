import { Router } from 'express'
import * as cartController from '../controllers/cart.controllers.js'

const cartRouter = Router()

cartRouter.get('/:cid', cartController.getCart)

cartRouter.post('/', cartController.createCart)

cartRouter.post('/:cid/add-item', cartController.addItem)

cartRouter.post('/:cid/purchase', cartController.closePurchase)

cartRouter.delete('/:cid/items/:itemId', cartController.removeItem)

export default cartRouter
