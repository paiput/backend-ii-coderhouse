import { tokenRepository } from '../repositories/token.repositroy.js'
import crypto from 'crypto'

export const getTokenByUserId = async (userId) => {
  const token = await tokenRepository.getTokenByUserId(userId)
  return token
}

export const getToken = async ({ userId, token: userToken }) => {
  const token = await tokenRepository.getToken({ userId, token: userToken })
  return token
}

export const createToken = async (userId) => {
  const token = crypto.randomBytes(32).toString('hex')
  const createdToken = await tokenRepository.createToken({ userId, token })
  return createdToken
}

export const deleteToken = async ({ userId, token }) => {
  await tokenRepository.deleteToken({ userId, token })
}
