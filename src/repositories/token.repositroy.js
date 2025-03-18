import { tokenDAO } from '../dao/index.js'

class TokenRepository {
  async getTokenByUserId(userId) {
    return await tokenDAO.getByUserId(userId)
  }

  async getToken({ userId, token }) {
    return await tokenDAO.get({ userId, token })
  }

  async createToken(tokenData) {
    return await tokenDAO.create(tokenData)
  }

  async deleteToken({ userId, token }) {
    return await tokenDAO.delete({ userId, token })
  }
}

export const tokenRepository = new TokenRepository()
