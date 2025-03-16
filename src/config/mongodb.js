import config from './variables.js'
import { connect } from 'mongoose'

const connectToMongoDB = async () => {
  try {
    await connect(config.MONGO_URI)
    console.log('Conected to db at', config.MONGO_URI)
  } catch (error) {
    console.log('Error trying to connect to db', error)
  }
}

export default connectToMongoDB
