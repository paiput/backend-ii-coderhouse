import { Product } from '../models/productModel.js'

export const getAllProducts = async () => {
  const products = await Product.find()
  return products
}

export const getProductById = async (id) => {
  const product = await Product.findById(id)
  return product
}

export const createProduct = async (productInfo) => {
  const newProduct = await Product.create(productInfo)
  return newProduct
}

export const updateProductById = async (id, productInfo) => {
  const updatedProduct = await Product.findByIdAndUpdate(id, productInfo, {
    new: true,
  })
  return updatedProduct
}

export const deleteProductById = async (id) => {
  await Product.findByIdAndDelete(id)
}
