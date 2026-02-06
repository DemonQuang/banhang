import { Schema, models, model } from 'mongoose'

const ReviewSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        book: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: true
        },
        comment: {
            type: String
        }
    },
    { timestamps: true }
)

export default models.Review || model('Review', ReviewSchema)
