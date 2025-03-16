import { getSession } from '../services/session.service.js'
import UserDTO from '../dto/user.dto.js'

export const getCurrentSession = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization.split(' ')[1]
    const verifiedToken = await getSession(token)
    res.status(200).json(new UserDTO(verifiedToken))
  } catch (error) {
    next(error)
  }
}
