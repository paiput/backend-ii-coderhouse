import { Router } from 'express'
import * as cartController from '../controllers/cart.controllers.js'

const cartRouter = Router()

cartRouter.post('/:cid/add-item', cartController.addItem)

cartRouter.post('/:cid/purchase', cartController.closePurchase)

cartRouter.delete('/:cid/items/:itemId', cartController.removeItem)

export default cartRouter
