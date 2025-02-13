import { Product } from '../models/productModel.js'

/**
 * Get all products
 * @param {*} req
 * @param {*} res
 * @returns Product object array
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find()
    if (!products) {
      return res
        .status(400)
        .json({ error: 'No se pudieron encontrar productos' })
    }
    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

/**
 * Retreive a product by its Id
 * @param {*} req
 * @param {*} res
 * @returns Product object
 */
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await Product.findOne({ id })
    if (!product) {
      return res.status(404).json({ error: 'El producto buscado no existe' })
    }
    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}
