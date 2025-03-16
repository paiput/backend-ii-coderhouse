import CustomError from './CustomError.js'

export default class ValidationError extends CustomError {
  constructor(message = 'Datos inválidos') {
    super(message, 400)
  }
}
