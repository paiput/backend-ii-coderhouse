import { User } from '../models/userModel.js'
import bcrypt from 'bcrypt'
import config from '../config/variables.js'
import {
  validateUserEntity,
  extractUserBasicData,
} from '../helpers/user.helpers.js'

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

/** Get user by Id
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 */
export const getUserById = async (req, res, next) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(extractUserBasicData(user))
  } catch (error) {
    next(error)
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserByEmail = async (req, res, next) => {
  try {
    const email = req.params.email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(extractUserBasicData(user))
  } catch (error) {
    next(error)
  }
}

/** Edit User (PUT method)
 * Overrides the user's data with the user object provided in the request body
 * @param {*} req
 * @param {*} res
 */
export const editUser = async (req, res, next) => {
  try {
    const { body } = req
    const id = req.params.id
    if (!validateUserEntity(body)) {
      return res
        .status(400)
        .json({ error: 'Se debe enviar toda la información del usuario' })
    }
    const updatedUser = await User.findByIdAndUpdate(id, body)
    if (!updatedUser) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    next(error)
  }
}

/** Patch User (PATCH method)
 * Updates only the given user's attributes on the request body
 * @param {*} req
 * @param {*} res
 */
export const patchUser = async (req, res, next) => {
  try {
    const { body } = req
    const id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(id, body)
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
    const user = await User.findById(id)
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
    const updatedUser = await User.findByIdAndUpdate(id, {
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
    await User.findByIdAndDelete(id)
    return res.status(204).send()
  } catch (error) {
    next(error)
  }
}
