import { userRepository } from '../repositories/user.repository.js'

export const getAllUsers = async () => {
  const users = await userRepository.getAllUsers()
  return users
}

export const getUserById = async (id) => {
  const user = await userRepository.getUserById(id)
  return user
}

export const getUserByEmail = async (email) => {
  const user = await userRepository.getUserByEmail(email)
  return user
}

export const createUser = async (userInfo) => {
  const newUser = await userRepository.createUser(userInfo)
  return newUser
}

export const updateUserById = async (id, userInfo) => {
  const updatedUser = await userRepository.updateUser(id, userInfo)
  return updatedUser
}

export const deleteUserById = async (id) => {
  await userRepository.deleteUser(id)
}

export const deleteUserByEmail = async (email) => {
  await userRepository.deleteUserByEmail(email)
}
