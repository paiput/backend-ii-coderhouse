import { Router } from 'express'
import * as sessionController from '../controllers/session.controllers.js'

const sessionRouter = Router()

sessionRouter.get('/current', sessionController.getCurrentSession)

export default sessionRouter
