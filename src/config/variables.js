import 'dotenv/config'

export default {
  DATABSE_URL:
    process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'
      ? process.env.MONGODB_LOCAL
      : process.env.MONGODB_URI,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  PASSPORT_SECRET: process.env.PASSPORT_SECRET,
  BCRYPT_SALT_ROUNDS: 10,
  PORT: 3000,
}
