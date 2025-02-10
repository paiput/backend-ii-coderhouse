import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import mongoose from 'mongoose'
import config from './config/variables.js'
import { applyPassportStrategy } from './config/passport.config.js'
import passport from 'passport'

import errorHandler from './middlewares/errorHandler.js'
// Rutas
import authRouter from './routes/auth.js'
import usersRouter from './routes/user.js'
import sessionRouter from './routes/session.js'
import productsRouter from './routes/product.js'

const app = express()

const db = mongoose
  .connect(config.DATABSE_URL)
  .then(() => {
    console.log('Conected to db at', config.DATABSE_URL)
  })
  .catch((err) => {
    console.log('Error trying to connect to db', err)
  })

// Middlewares
app.use(cookieParser(config.COOKIE_SECRET))
app.use(express.json())
app.use(passport.initialize())
applyPassportStrategy()
// app.use(passport.session())

// Rutas
app.use('/api/auth', authRouter)
app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRouter
)
app.use('/api/session', sessionRouter)
app.use('/api/products', errorHandler, productsRouter)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
