import mongoose, { Schema } from 'mongoose'

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      _id: false,
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    },
  ],
})

const Cart = mongoose.model('Cart', cartSchema)

export { Cart }
