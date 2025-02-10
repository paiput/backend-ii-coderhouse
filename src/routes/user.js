import { Router } from 'express'
import * as userController from '../controllers/user.controllers.js'
import adminAuthorizationMiddleware from '../middlewares/adminAuthorization.js'

const userRouter = Router()

userRouter.get('/', adminAuthorizationMiddleware, userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.get('/email/:email', userController.getUserByEmail)

userRouter.put('/:id', userController.editUser)

userRouter.patch('/:id', userController.patchUser)

userRouter.delete('/:id', userController.deleteUserById)

export default userRouter
