import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
})

const Cart = mongoose.model('Cart', cartSchema)

export { Cart }
