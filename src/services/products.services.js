import NotFoundError from '../errors/notFoundError.js'
import { productRepository } from '../repositories/product.repository.js'

export const getAllProducts = async () => {
  const products = await productRepository.getAllProducts()
  return products
}

export const getProductById = async (id) => {
  const product = await productRepository.getProductById(id)
  if (!product) throw new NotFoundError(`Producto ${id} no encontrado`)
  return product
}

export const createProduct = async (productInfo) => {
  const newProduct = await productRepository.createProduct(productInfo)
  return newProduct
}

export const updateProductById = async (id, productInfo) => {
  const updatedProduct = await productRepository.updateProduct(id, productInfo)
  if (!updatedProduct)
    throw new NotFoundError(`No se encontró el producto ${id} para actualizar`)
  return updatedProduct
}

export const deleteProductById = async (id) => {
  await productRepository.deleteProduct(id)
}
