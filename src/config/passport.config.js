import passport from 'passport'
import jwt from 'passport-jwt'
import config from './variables.js'

const JwtStrategy = jwt.Strategy

const extractJwtTokenFromCookie = (req) => {
  var token = null
  if (req && req.cookies) {
    token = req.cookies['token']
  }
  return token
}

const options = {
  // Extracts jwt token both from cookies and Authorization header
  jwtFromRequest: jwt.ExtractJwt.fromExtractors([
    extractJwtTokenFromCookie,
    jwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  ]),
  secretOrKey: config.PASSPORT_SECRET,
}

const applyPassportStrategy = () => {
  passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
      try {
        return done(null, jwt_payload)
      } catch (error) {
        console.log('Error on passport Strategy', error)
        return done(error)
      }
    })
  )
}

export { applyPassportStrategy }
