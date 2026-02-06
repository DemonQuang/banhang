import { Schema, models, model } from 'mongoose'

const WishlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Book'
            }
        ]
    },
    { timestamps: true }
)

export default models.Wishlist || model('Wishlist', WishlistSchema)
