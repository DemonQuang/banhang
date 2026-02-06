import { Schema, models, model } from 'mongoose'
import OrderItemSchema from './OrderItem'

const OrderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items: [OrderItemSchema],
        totalPrice: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'paid', 'shipped', 'completed', 'cancelled'],
            default: 'pending'
        }
    },
    { timestamps: true }
)

export default models.Order || model('Order', OrderSchema)
