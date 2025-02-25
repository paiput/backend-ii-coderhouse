import * as productService from '../services/products.services.js'

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllProducts()
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

export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id
    const product = await productService.getProductById(id)
    if (!product) {
      return res.status(404).json({ error: 'El producto buscado no existe' })
    }
    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req, res, next) => {
  try {
    const { body } = req
    const newProduct = await productService.createProduct(body)
    return res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id
    const { body } = req
    const updatedProduct = await productService.updateProductById(id, body)
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ error: 'El producto que intenta actualizar no existe ' })
    }
    return res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

export const deleteProductById = async (req, res, next) => {
  try {
    const id = req.params.id
    await productService.deleteProductById(id)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
