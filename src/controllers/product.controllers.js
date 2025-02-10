import { Product } from '../models/productModel.js'
import config from '../config/variables.js'

/**
 * Get all products
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getAllProducts = async (req, res) => {
  const products = await Product.find()
  if (!products) {
    return res.status(400).json({ error: 'No se pudieron encontrar productos' })
  }
  return res.status(200).json(products)
}

/**
 * Retreive a product by its Id
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getProductById = async (req, res) => {
  const id = req.params.id
  const product = await Product.find({ id })
  if (!product) {
    return res.status(404).json({ error: 'El producto buscado no existe' })
  }
  return res.status(200).json(product)
}
