import * as userService from '../services/user.services.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await userService.getUserById(userId)
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await userService.getUserByEmail(email)
    return res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

export const editUser = async (req, res, next) => {
  try {
    const { body } = req
    const id = req.params.id
    const updatedUser = await userService.completeUpdateUserById(id, body)
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const patchUser = async (req, res, next) => {
  try {
    const { body } = req
    const id = req.params.id
    const updatedUser = await userService.updateUserById(id, body)
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const id = req.params.id
    const updatedUser = await userService.updatePassword(
      id,
      currentPassword,
      newPassword
    )
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id
    await userService.deleteUserById(id)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}

export const deleteUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email
    await userService.deleteUserByEmail(email)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
