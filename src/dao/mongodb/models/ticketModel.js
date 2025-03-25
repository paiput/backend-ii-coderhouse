import mongoose, { Schema } from 'mongoose'
import { productSchema } from './productModel.js'
import { v4 as uuidv4 } from 'uuid'

const ticketSchema = new Schema({
  purchaser: String,
  products: [productSchema],
  code: {
    type: String,
    unique: true,
    default: uuidv4,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export { Ticket }
