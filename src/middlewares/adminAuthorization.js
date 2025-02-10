import jwt from 'jsonwebtoken'
import config from '../config/variables.js'

const adminAuthorizationMiddleware = (req, res, next) => {
  const authorizationHeader = req?.headers?.authorization?.split(' ')
  const token = authorizationHeader[1]
  const verifiedToken = jwt.verify(token, config.PASSPORT_SECRET)
  if (verifiedToken?.user?.role !== 'admin') {
    return res.status(403).json({
      error: 'No tiene los permisos suficientes para realizar esta acción',
    })
  }
  next()
}

export default adminAuthorizationMiddleware
