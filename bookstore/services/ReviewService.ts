import Review from '@/models/Review'

export const reviewService = {
    getByBook(bookId: string) {
        return Review
            .find({ book: bookId })
            .populate('user', 'name')
            .sort({ createdAt: -1 })
    },

    create(data: any) {
        return Review.create(data)
    }
}
