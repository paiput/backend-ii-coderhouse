import 'dotenv/config'

export default {
  BASE_URL: process.env.BASE_URL,
  DB_TYPE: 'mongodb',
  MONGO_URI:
    process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test'
      ? process.env.MONGODB_LOCAL
      : process.env.MONGODB_URI,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  PASSPORT_SECRET: process.env.PASSPORT_SECRET,
  BCRYPT_SALT_ROUNDS: 10,
  PORT: 3000,
  NODEMAILER: {
    SERVICE: process.env.NODEMAILER_SERVICE,
    USER: process.env.NODEMAILER_USER,
    PASSWORD: process.env.NODEMAILER_PASSWORD,
    PORT: process.env.NODEMAILER_PORT,
  },
}
