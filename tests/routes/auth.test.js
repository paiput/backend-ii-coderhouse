import { User } from '../../src/models/userModel.js'
import mongoose from 'mongoose'
import config from '../../src/config/variables.js'
import bcrypt from 'bcrypt'

const testUser = {
  first_name: 'test',
  last_name: 'tester',
  email: 'test@test.com',
  age: 50,
  password: 'testpassword',
}

const connectToDb = async () => {
  await mongoose.connect(config.MONGO_URI)
}

const disconnectDb = async () => {
  await mongoose.disconnect()
}

const createTestUser = async () => {
  try {
    const hashedPassword = bcrypt.hashSync(
      testUser.password,
      config.BCRYPT_SALT_ROUNDS
    )
    const user = await User.create({
      ...testUser,
      password: hashedPassword,
    })
    testUser.id = user._id
    console.log('se creó el user', testUser)
    return user
  } catch (error) {
    console.error(error)
  }
}

const deleteTestUser = async () => {
  try {
    console.log('datos previo a borrar', testUser)
    await User.deleteOne({ email: testUser.email })
  } catch (error) {
    console.error(error)
  }
}

const post = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  return data
}

beforeAll(() => {
  return connectToDb().then(() => createTestUser())
})

afterAll(() => {
  return deleteTestUser().then(() => disconnectDb())
})

describe('Auth testing', () => {
  test('user can login with correct credentials', async () => {
    const data = await post('http://localhost:3000/api/auth/login', {
      email: testUser.email,
      password: testUser.password,
    })
    expect(data).toHaveProperty('user')
  })

  test("user can't login with incorrect credentials", async () => {
    const data = await post('http://localhost:3000/api/auth/login', {
      email: testUser.email,
      password: 'wrongpassword',
    })
    expect(data).toHaveProperty('error')
  })
})
