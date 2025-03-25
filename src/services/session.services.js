import jwt from 'jsonwebtoken'
import config from '../config/variables.js'

export const getSession = async (token) => {
  const verifiedToken = jwt.verify(token, config.PASSPORT_SECRET)
  return verifiedToken
}
