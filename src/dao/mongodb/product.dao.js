import MongoDAO from './mongo.dao.js'
import { Product } from './models/productModel.js'

export default class ProductDAO extends MongoDAO {
  constructor() {
    super(Product)
  }
}
