import MongoDAO from './mongo.dao.js'
import { Cart } from './models/cartModel.js'

export default class CartDAO extends MongoDAO {
  constructor() {
    super(Cart)
  }

  async getById(cartId) {
    return await this.model.findById(cartId).populate('products.product')
  }

  async getByUserId(userId) {
    return await this.model.findOne({ userId })
  }
}
