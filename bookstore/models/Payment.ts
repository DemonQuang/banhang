import { Schema, models, model } from 'mongoose'

const PaymentSchema = new Schema(
    {
        order: {
            type: Schema.Types.ObjectId,
            ref: 'Order',
            required: true
        },
        method: {
            type: String,
            enum: ['cod', 'banking', 'momo'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'success', 'failed'],
            default: 'pending'
        },
        paidAt: {
            type: Date
        }
    },
    { timestamps: true }
)

export default models.Payment || model('Payment', PaymentSchema)
