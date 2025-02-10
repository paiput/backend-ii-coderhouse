import { Router } from 'express'
import * as productController from '../controllers/product.controllers.js'

const productRouter = Router()

productRouter.get('/', productController.getAllProducts)

productRouter.get('/:id', productController.getProductById)

export default productRouter
