import { User } from '../models/userModel.js'

export const getAllUsers = async () => {
  const users = await User.find()
  return users
}

export const getUserById = async (id) => {
  const user = await User.findById(id)
  return user
}

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email })
  return user
}

export const createUser = async (userInfo) => {
  const newUser = await User.create(userInfo)
  return newUser
}

export const updateUserById = async (id, userInfo) => {
  const updatedUser = await User.findByIdAndUpdate(id, userInfo, { new: true })
  return updatedUser
}

export const deleteUserById = async (id) => {
  await User.deleteUserById(id)
}

export const deleteUserByEmail = async (email) => {
  await User.findOneAndDelete({ email })
}
