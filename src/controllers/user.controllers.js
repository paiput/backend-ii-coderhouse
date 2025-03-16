import * as userService from '../services/user.services.js'
import bcrypt from 'bcrypt'
import config from '../config/variables.js'
import { validateUserEntity } from '../helpers/user.helpers.js'
import UserDTO from '../dto/user.dto.js'

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
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(new UserDTO(user))
  } catch (error) {
    next(error)
  }
}

export const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await userService.getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(new UserDTO(user))
  } catch (error) {
    next(error)
  }
}

export const editUser = async (req, res, next) => {
  try {
    const { body } = req
    const id = req.params.id
    if (!validateUserEntity(body)) {
      return res
        .status(400)
        .json({ error: 'Se debe enviar toda la información del usuario' })
    }
    const updatedUser = await userService.updateUserById(id, body)
    if (!updatedUser) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
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
    if (!updatedUser) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body
    const id = req.params.id
    const user = await userService.getUserById(id)
    if (!user) {
      return res.status(400).json({ error: 'El usuario no existe' })
    }
    const isCurrentPasswordCorrect = bcrypt.compareSync(
      currentPassword,
      user.password
    )
    if (!isCurrentPasswordCorrect) {
      return res
        .status(400)
        .json({ error: 'La contraseña actual no es correcta' })
    }
    const newHashedPassword = bcrypt.hashSync(
      newPassword,
      config.BCRYPT_SALT_ROUNDS
    )
    const updatedUser = await userService.updateUserById(id, {
      password: newHashedPassword,
    })
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
