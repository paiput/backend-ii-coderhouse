import { User } from '../models/userModel.js'

/**
 * Extracts basic user data from User model
 * @param {User} user User object
 * @returns Simplified User object
 */
export const extractUserBasicData = (user) => {
  const { first_name, last_name, email, age, role } = user
  return { first_name, last_name, email, age, role }
}

/**
 * Validates that the required fields are present in the given user object
 * @param {User<UserVerificationRequirement>} user
 */
export const validateUserEntity = (user) => {
  return (
    user?.first_name &&
    user?.last_name &&
    user?.email &&
    user?.age &&
    user?.role
  )
}

validateUserEntity()

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

/** Get user by Id
 *
 * @param {*} req
 * @param {*} res
 * @returns {Promise}
 */
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(extractUserBasicData(user))
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(extractUserBasicData(user))
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

/** Edit User (PUT method)
 * Overrides the user's data with the user object provided in the request body
 * @param {*} req
 * @param {*} res
 */
export const editUser = async (req, res) => {
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
    res.status(500).json({ error: 'Error de servidor' })
  }
}

/** Patch User (PATCH method)
 * Updates only the given user's attributes on the request body
 * @param {*} req
 * @param {*} res
 */
export const patchUser = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(id, body)
    if (!updatedUser) {
      return res.status(404).json({ error: 'El usuario no existe' })
    }
    return res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id
    await User.findByIdAndDelete(id)
    return res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Error de servidor' })
  }
}
