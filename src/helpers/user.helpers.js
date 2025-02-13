/**
 * Extracts basic user data from User model
 * @param {User} user User object
 * @returns Simplified User object
 */
export const extractUserBasicData = (user) => {
  const { first_name, last_name, email, age, role } = user
  return { first_name, last_name, email, age, role }
}

/**
 * Validates that the required fields are present in the given user object
 * @param {User} user User object
 * @returns True if all expected user properties are present in user object
 */
export const validateUserEntity = (user) => {
  return (
    user?.first_name &&
    user?.last_name &&
    user?.email &&
    user?.age &&
    user?.role
  )
}
