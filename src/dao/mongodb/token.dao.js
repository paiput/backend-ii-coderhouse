import MongoDAO from './mongo.dao.js'
import { Token } from './models/tokenModel.js'

export default class TokenDAO extends MongoDAO {
  constructor() {
    super(Token)
  }

  async get({ userId, token }) {
    return await this.model.findOne({ userId, token })
  }

  async getByUserId(userId) {
    return await this.model.findOne({ userId })
  }

  async delete({ userId, token }) {
    return await this.model.deleteOne({ userId, token })
  }
}
