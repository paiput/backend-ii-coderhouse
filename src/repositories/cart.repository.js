import { cartDAO } from '../dao/index.js'

class CartRepository {
  async getAllCarts() {
    return await cartDAO.getAll()
  }

  async getCartById(id) {
    return await cartDAO.getById(id)
  }

  async createCart(data) {
    return await cartDAO.create(data)
  }

  async updateCart(id, data) {
    return await cartDAO.update(id, data)
  }

  async deleteCart(id) {
    return await cartDAO.delete(id)
  }
}

export const cartRepository = new CartRepository()
