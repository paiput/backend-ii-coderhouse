import { Router } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/variables.js'

const sessionRouter = Router()

sessionRouter.get('/current', (req, res) => {
  try {
    const token = req.cookies?.token || req.headers.authorization.split(' ')[1]
    const verifiedToken = jwt.verify(token, config.PASSPORT_SECRET)
    res.status(200).json(verifiedToken)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Error de servidor' })
  }
})

export default sessionRouter
