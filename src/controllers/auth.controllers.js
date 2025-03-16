import * as authService from '../services/auth.services.js'

export const register = async (req, res, next) => {
  try {
    const { body } = req
    const newUser = await authService.registerUser(body)
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

export const login = async (req, res, next) => {
  try {
    const { body } = req
    const { user, token } = await authService.loginUser(body)
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    })
    return res.status(200).json({ user, token })
  } catch (error) {
    next(error)
  }
}
