import * as userService from '../services/user.services.js'
import bcrypt from 'bcrypt'
import config from '../config/variables.js'
import { extractUserBasicData } from '../helpers/user.helpers.js'
import { generateToken } from '../helpers/auth.helpers.js'

/**
 * Creates new user in the db and returns it
 * @param {Request} req
 * @param {Response} res
 * @returns User object
 */
export const register = async (req, res, next) => {
  try {
    const { body } = req
    const user = await userService.getUserByEmail(email)
    if (user) {
      return res.status(400).json({ error: 'El usuario ya existe' })
    }
    const hashedPassword = bcrypt.hashSync(
      body.password,
      config.BCRYPT_SALT_ROUNDS
    )
    const userToCreate = { ...body, password: hashedPassword }
    const newUser = await userService.createUser(userToCreate)
    delete newUser.password
    if (!newUser) {
      return res.status(400).json({ error: 'No se pudo crear el usuario' })
    }
    return res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
}

/**
 * Logs in the user
 * @param {Request} req
 * @param {Response} res
 * @returns User object with its token
 */
export const login = async (req, res, next) => {
  try {
    const { body } = req
    const user = await userService.getUserByEmail(body.email)
    if (!user) {
      return res.status(401).json({ error: 'Email o contraseña inválidos' })
    }
    const isPasswordValid = bcrypt.compareSync(body.password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Email o contraseña inválidos' })
    }
    const token = generateToken(JSON.stringify(user))
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    })
    return res.status(200).json({ user: extractUserBasicData(user), token })
  } catch (error) {
    next(error)
  }
}
