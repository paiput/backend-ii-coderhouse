import mongoose, { Schema } from 'mongoose'
import { productSchema } from './productModel.js'

const ticketSchema = new Schema({
  purchaser: String,
  products: [productSchema],
  code: {
    type: String,
    required: true,
    unique: true,
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
