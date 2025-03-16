import MongoDAO from './mongo.dao.js'
import { User } from './models/userModel.js'

export default class UserDAO extends MongoDAO {
  constructor() {
    super(User)
  }

  async deleteByEmail(email) {
    return await this.model.deleteOne({ email })
  }

  async getByEmail(email) {
    return await this.model.findOne({ email })
  }
}
