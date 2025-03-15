import { Router } from 'express'
import * as userController from '../controllers/user.controllers.js'
import validateAdminAuthorization from '../middlewares/validateAdminAuthorization.js'
import validateEmail from '../middlewares/validateEmail.js'

const userRouter = Router()

userRouter.get('/', validateAdminAuthorization, userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.param('email', validateEmail)

userRouter.get('/email/:email', userController.getUserByEmail)

userRouter.put('/:id', userController.editUser)

userRouter.patch('/:id', userController.patchUser)

userRouter.patch('/:id/password', userController.updatePassword)

userRouter.delete(
  '/:id',
  validateAdminAuthorization,
  userController.deleteUserById
)

userRouter.delete(
  '/:email',
  validateAdminAuthorization,
  userController.deleteUserByEmail
)

export default userRouter
