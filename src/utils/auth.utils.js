import jwt from 'jsonwebtoken'
import config from '../config/variables.js'

export const validateUserRole = (role) => {
  return role === 'admin' || role === 'user'
}

export const generateToken = (user) => {
  const token = jwt.sign(user, config.PASSPORT_SECRET)
  return token
}

export const verifyToken = (token) => {
  const verifiedToken = jwt.verify(token, config.PASSPORT_SECRET)
  return verifiedToken
}

export const getUserToken = (req) => {
  const { headers, cookies } = req
  let token = undefined
  if (cookies && cookies.token) {
    token = cookies.token
  } else if (headers?.authorization) {
    token = headers.authorization.split(' ')?.[1]
  }
  return token
}
