import bcrypt from 'bcrypt'
import config from '../config/variables.js'
import { generateToken } from '../utils/auth.utils.js'
import * as userService from './user.services.js'
import UserDTO from '../dto/user.dto.js'
import ValidationError from '../errors/validationError.js'
import AuthenticationError from '../errors/authenticationError.js'

export const registerUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(
    userData.password,
    config.BCRYPT_SALT_ROUNDS
  )
  const userToCreate = { ...body, password: hashedPassword }
  const newUser = await userService.createUser(userToCreate)
  if (!newUser) {
    throw new ValidationError('No se pudo crear el usuario')
  }
  return new UserDTO(newUser)
}

export const loginUser = async (userData) => {
  const user = await userService.getUserByEmail(userData.email, true)
  if (!user) {
    throw new AuthenticationError('Email o contraseña inválidos')
  }
  const isPasswordValid = bcrypt.compareSync(userData.password, user.password)
  if (!isPasswordValid) {
    throw new AuthenticationError('Email o contraseña inválidos')
  }
  const token = generateToken(JSON.stringify(user))
  return { user: new UserDTO(user), token }
}
