import connectToMongoDB from '../config/mongodb.js'

const connectToDB = async (dbType) => {
  if (dbType === 'mongodb') {
    await connectToMongoDB()
  } else {
    throw new Error('Must select a valid db type')
  }
}

export default connectToDB
