import { userDAO } from '../dao/index.js'

class UserRepository {
  async getAllUsers() {
    return await userDAO.getAll()
  }

  async getUserById(id) {
    return await userDAO.getById(id)
  }

  async getUserByEmail(id) {
    return await userDAO.getByEmail(id)
  }

  async createUser(data) {
    return await userDAO.create(data)
  }

  async updateUser(id, data) {
    return await userDAO.update(id, data)
  }

  async deleteUser(id) {
    return await userDAO.delete(id)
  }

  async deleteUserByEmail(email) {
    return await userDAO.deleteByEmail(email)
  }
}

export const userRepository = new UserRepository()
