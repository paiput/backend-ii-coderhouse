import { Router } from 'express'
import * as userController from '../controllers/user.controllers.js'
import validateAdminAuthorization from '../middlewares/validateAdminAuthorization.js'
import validateUserAuth from '../middlewares/validateUserAuth.js'
import validateEmail from '../middlewares/validateEmail.js'

const userRouter = Router()

userRouter.get('/', validateAdminAuthorization, userController.getAllUsers)

userRouter.get('/:id', validateUserAuth, userController.getUserById)

userRouter.param('email', validateEmail)

userRouter.get('/email/:email', validateUserAuth, userController.getUserByEmail)

userRouter.post('/password-restore', userController.sendPasswordRestoreEmail)

userRouter.post('/:id/password-restore/:token', userController.restorePassword)

userRouter.put('/:id', validateUserAuth, userController.editUser)

userRouter.patch('/:id', validateUserAuth, userController.patchUser)

userRouter.patch(
  '/:id/password',
  validateUserAuth,
  userController.updatePassword
)

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
