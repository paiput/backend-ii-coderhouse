import { userRepository } from '../repositories/user.repository.js'
import NotFoundError from '../errors/notFoundError.js'
import ValidationError from '../errors/validationError.js'
import { validateUserEntity } from '../utils/user.utils.js'
import bcrypt from 'bcrypt'
import UserDTO from '../dto/user.dto.js'
import { sendEmail } from '../config/nodemailer.config.js'
import config from '../config/variables.js'
import * as tokenService from './token.services.js'

export const getAllUsers = async () => {
  const users = await userRepository.getAllUsers()
  return users
}

export const getUserById = async (id, config = {}) => {
  const user = await userRepository.getUserById(id)
  if (!user) throw new NotFoundError(`Usuario ${id} no encontrado`)
  return new UserDTO(user, config)
}

export const getUserByEmail = async (email, config = {}) => {
  const user = await userRepository.getUserByEmail(email)
  if (!user) throw new NotFoundError(`Usuario ${email} no encontrado`)
  return new UserDTO(user, config)
}

export const createUser = async (userInfo) => {
  const newUser = await userRepository.createUser(userInfo)
  return newUser
}

export const completeUpdateUserById = async (id, userInfo) => {
  if (!validateUserEntity(userInfo)) {
    throw new ValidationError('Información requerida del usuario incompleta')
  }
  const updatedUser = await userRepository.updateUser(id, userInfo)
  if (!updatedUser) throw new NotFoundError(`Usuario ${id} no encontrado`)
  return updatedUser
}

export const updateUserById = async (id, userInfo) => {
  const updatedUser = await userRepository.updateUser(id, userInfo)
  if (!updatedUser) throw new NotFoundError(`Usuario ${id} no encontrado`)
  return updatedUser
}

export const updatePassword = async (id, currentPassword, newPassword) => {
  const user = await getUserById(id)
  const isCurrentPasswordCorrect = bcrypt.compareSync(
    currentPassword,
    user.password
  )
  if (!isCurrentPasswordCorrect) {
    throw new ValidationError('La contraseña actual no es correcta')
  }
  const newHashedPassword = bcrypt.hashSync(
    newPassword,
    config.BCRYPT_SALT_ROUNDS
  )
  const updatedUser = await updateUserById(id, {
    password: newHashedPassword,
  })
  return updatedUser
}

export const sendPasswordRestoreEmail = async (email) => {
  const user = await userRepository.getUserByEmail(email)
  if (!user) {
    throw new NotFoundError('No se ha encontrado el usuario')
  }

  let token = await tokenService.getTokenByUserId(user._id)
  if (!token) {
    token = await tokenService.createToken(user._id)
  }

  const link = `${config.BASE_URL}/${user._id}/password-restore/${token.token}`
  await sendEmail({
    to: user.email,
    subject: 'Reestablecer contraseña',
    html: `
      <p>Haz click <a href="${link}">aquí</a> para reestablecer tu contraseña</p>
      <p>En caso de no haber sido tu quien solicitó reestablecer la contraseña, ignora este correo</p>
    `,
  })
}

export const restorePassword = async (tokenInfo, newPassword) => {
  const { userId, token } = tokenInfo
  const user = await userRepository.getUserById(userId)
  if (!user) {
    throw new ValidationError('Usuario inválido o inexistente')
  }

  const userToken = await tokenService.getToken({ userId: user._id, token })
  if (!userToken) {
    throw new ValidationError('Link inválido o expirado')
  }

  const newHashedPassword = bcrypt.hashSync(
    newPassword,
    config.BCRYPT_SALT_ROUNDS
  )
  const updatedUser = await updateUserById(userId, {
    password: newHashedPassword,
  })

  // After password is updated, delete token from database
  await tokenService.deleteToken({ userId, token })

  return updatedUser
}

export const deleteUserById = async (id) => {
  await userRepository.deleteUser(id)
}

export const deleteUserByEmail = async (email) => {
  await userRepository.deleteUserByEmail(email)
}
