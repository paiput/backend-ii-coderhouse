import express from 'express'
import 'dotenv/config'
import config from './config/variables.js'
import cors from 'cors'
import connectToDB from './db/connection.js'
// Middlewares
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { applyPassportStrategy } from './config/passport.config.js'
import errorHandler from './middlewares/errorHandler.js'
import validateUserAuth from './middlewares/validateUserAuth.js'
// Routes
import authRouter from './routes/auth.routes.js'
import usersRouter from './routes/user.routes.js'
import sessionRouter from './routes/session.routes.js'
import productsRouter from './routes/product.routes.js'

const app = express()

// DB connection
connectToDB(config.DB_TYPE)

// Middlewares
app.use(cors())
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
