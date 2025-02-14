import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose'
import config from './config/variables.js'

// Middlewares
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { applyPassportStrategy } from './config/passport.config.js'
import errorHandler from './middlewares/errorHandler.js'
import validateUserAuth from './middlewares/validateUserAuth.js'
// Routes
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

// Routes
app.use('/api/auth', authRouter)
app.use('/api/users', validateUserAuth, usersRouter)
app.use('/api/session', validateUserAuth, sessionRouter)
app.use('/api/products', productsRouter)

// Error handler middleware
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
