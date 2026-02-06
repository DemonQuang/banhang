import mongoose, { Schema, models, model } from 'mongoose'

const BookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        description: {
            type: String
        },
        image: {
            type: String
        },
        stock: {
            type: Number,
            default: 0
        },
        category: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default models.Book || model('Book', BookSchema)
