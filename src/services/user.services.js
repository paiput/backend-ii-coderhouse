import { userRepository } from '../repositories/user.repository.js'
import NotFoundError from '../errors/notFoundError.js'
import ValidationError from '../errors/validationError.js'
import { validateUserEntity } from '../utils/user.utils.js'
import bcrypt from 'bcrypt'
import UserDTO from '../dto/user.dto.js'

export const getAllUsers = async () => {
  const users = await userRepository.getAllUsers()
  return users
}

export const getUserById = async (id, includePassword) => {
  const user = await userRepository.getUserById(id)
  if (!user) throw new NotFoundError(`Usuario ${id} no encontrado`)
  return new UserDTO(user, includePassword)
}

export const getUserByEmail = async (email, includePassword) => {
  const user = await userRepository.getUserByEmail(email)
  if (!user) throw new NotFoundError(`Usuario ${email} no encontrado`)
  return new UserDTO(user, includePassword)
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

export const deleteUserById = async (id) => {
  await userRepository.deleteUser(id)
}

export const deleteUserByEmail = async (email) => {
  await userRepository.deleteUserByEmail(email)
}
