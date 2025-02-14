import passport from 'passport'

const validateUserAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      return res.status(401).json({ message: 'Token inválido o expirado' })
    }
    next()
  })(req, res, next)
}

export default validateUserAuth
