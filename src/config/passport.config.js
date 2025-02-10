import passport from 'passport'
import jwt from 'passport-jwt'
import config from './variables.js'

const JwtStrategy = jwt.Strategy
const ExtractJwt = jwt.ExtractJwt

// Ver si se gestiona el token por cookie o se hace que se mande en cada request en el header
// const cookieExtractor = (req) => {
//   var token = null
//   if (req && req.cookies) {
//     token = req.cookies['token']
//   }
//   return token
// }

const extractJwtTokenFromHeader = (req) => {
  let token = null
  const authorizationHeader = req?.headers?.authorization?.split(' ')
  if (req && authorizationHeader && authorizationHeader[0] === 'Bearer') {
    token = authorizationHeader[1]
  }
  return token
}

const options = {
  jwtFromRequest: extractJwtTokenFromHeader,
  secretOrKey: config.PASSPORT_SECRET,
}

const applyPassportStrategy = () => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      try {
        console.log({ jwt_payload })
        return done(null, jwt_payload)
      } catch (error) {
        console.log('Error on passport Strategy', error)
        return done(error)
      }
    })
  )
}

export { applyPassportStrategy }
