import { Router } from 'express'
import * as productController from '../controllers/product.controllers.js'
import validateAdminAuthorization from '../middlewares/validateAdminAuthorization.js'

const productRouter = Router()

productRouter.get('/:id', productController.getProductById)

productRouter.get('/', productController.getAllProducts)

productRouter.post(
  '/',
  validateAdminAuthorization,
  productController.createProduct
)

productRouter.put(
  '/:id',
  validateAdminAuthorization,
  productController.updateProduct
)

productRouter.delete(
  '/:id',
  validateAdminAuthorization,
  productController.deleteProductById
)

export default productRouter
