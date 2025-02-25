import { Router } from 'express'
import * as productController from '../controllers/product.controllers.js'

const productRouter = Router()

productRouter.get('/:id', productController.getProductById)

productRouter.get('/', productController.getAllProducts)

export default productRouter
