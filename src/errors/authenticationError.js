import CustomError from './CustomError.js'

export default class AuthenticationError extends CustomError {
  constructor(message = 'No se pudo autenticar') {
    super(message, 401)
  }
}
