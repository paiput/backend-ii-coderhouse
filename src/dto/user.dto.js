export default class UserDTO {
  constructor(user, includePassword = false) {
    this.first_name = user.first_name
    this.last_name = user.last_name
    this.email = user.email
    this.age = user.age
    this.cart = user.cart
    this.role = user.role
    if (includePassword) {
      this.password = user.password
    }
  }
}
