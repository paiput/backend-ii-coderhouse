import CustomError from './CustomError.js'

export default class AuthorizationError extends CustomError {
  constructor(message = 'No tiene permisos suficientes') {
    super(message, 403)
  }
}
