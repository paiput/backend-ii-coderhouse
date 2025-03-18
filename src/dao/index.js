import config from '../config/variables.js'
import * as mongodb from './mongodb/index.js'

let productDAO, userDAO, cartDAO, tokenDAO

switch (config.DB_TYPE) {
  case 'mongodb':
    productDAO = new mongodb.ProductDAO()
    userDAO = new mongodb.UserDAO()
    cartDAO = new mongodb.CartDAO()
    tokenDAO = new mongodb.TokenDAO()
    break
  default:
    throw new Error('Tipo de base de datos no soportado')
}

export { productDAO, userDAO, cartDAO, tokenDAO }
