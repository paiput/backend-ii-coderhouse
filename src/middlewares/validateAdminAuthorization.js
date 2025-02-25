import jwt from 'jsonwebtoken'
import config from '../config/variables.js'

const validateAdminAuthorization = (req, res, next) => {
  const authorizationHeader = req?.headers?.authorization?.split(' ')
  const cookieToken = req?.cookies.token
  if (!authorizationHeader && !cookieToken) {
    return res.status(401).json({
      error: 'Token inválido o expirado',
    })
  }
  const token = cookieToken || authorizationHeader[1]
  const verifiedToken = jwt.verify(token, config.PASSPORT_SECRET)
  if (verifiedToken?.role !== 'admin') {
    return res.status(403).json({
      error: 'No tiene los permisos suficientes para realizar esta acción',
    })
  }
  next()
}

export default validateAdminAuthorization
