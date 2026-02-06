import { Schema, models, model } from 'mongoose'

const CartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        items: [
            {
                book: {
                    type: Schema.Types.ObjectId,
                    ref: 'Book',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ]
    },
    { timestamps: true }
)

export default models.Cart || model('Cart', CartSchema)
