import { productDAO } from '../dao/index.js'

class ProductRepository {
  async getAllProducts() {
    return await productDAO.getAll()
  }

  async getProductById(id) {
    return await productDAO.getById(id)
  }

  async createProduct(data) {
    return await productDAO.create(data)
  }

  async updateProduct(id, data) {
    return await productDAO.update(id, data)
  }

  async deleteProduct(id) {
    return await productDAO.delete(id)
  }
}

export const productRepository = new ProductRepository()
