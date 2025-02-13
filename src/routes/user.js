import { Router } from 'express'
import * as userController from '../controllers/user.controllers.js'
import adminAuthorizationMiddleware from '../middlewares/adminAuthorization.js'

const userRouter = Router()

userRouter.get('/', adminAuthorizationMiddleware, userController.getAllUsers)

userRouter.get('/:id', userController.getUserById)

userRouter.param('email', (req, res, next, email) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  const isValid = email.match(emailRegex)
  if (!isValid) return res.status(400).json({ error: 'Email inválido' })
  return next()
})

userRouter.get('/email/:email', userController.getUserByEmail)

userRouter.put('/:id', userController.editUser)

userRouter.patch('/:id', userController.patchUser)

userRouter.patch('/:id/password', userController.updatePassword)

userRouter.delete('/:id', userController.deleteUserById)

export default userRouter
