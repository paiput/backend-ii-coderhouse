import mongoose, { Schema } from 'mongoose'

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  stock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, min: 0 },
})

const Product = mongoose.model('Product', productSchema)

export { Product }
