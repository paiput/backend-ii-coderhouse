import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../config/variables.js'
import { extractUserBasicData } from '../controllers/user.controllers.js'

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const register = async (req, res) => {
  try {
    const { body } = req
    const user = await User.findOne({ email: body.email })
    if (user) {
      return res.status(400).json({ error: 'El usuario ya existe' })
    }
    const hashedPassword = bcrypt.hashSync(body.password, 10)
    const userToCreate = { ...body, password: hashedPassword }
    const newUser = await User.create(userToCreate)
    delete newUser.password
    if (!newUser) {
      return res.status(400).json({ error: 'No se pudo crear el usuario' })
    }
    return res.status(201).json(newUser)
  } catch (error) {
    console.log('Error:', error)
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
  try {
    const { body } = req
    const user = await User.findOne({ email: body.email })
    const isPasswordValid = bcrypt.compareSync(body.password, user.password)
    if (!user || !isPasswordValid) {
      return res.status(401).json({ error: 'Email o contraseña inválidos' })
    }
    delete user.password
    const token = jwt.sign({ user }, config.PASSPORT_SECRET, {
      expiresIn: '10m',
    })
    res.cookie('token', token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    })
    return res.status(200).json({ user: extractUserBasicData(user), token })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: 'Hubo un error de servidor' })
  }
}
