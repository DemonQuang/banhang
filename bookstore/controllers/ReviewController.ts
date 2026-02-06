import { reviewService } from '@/services/ReviewService'

export const reviewController = {
    async getByBook(bookId: string) {
        if (!bookId) throw new Error('Missing bookId')
        return reviewService.getByBook(bookId)
    },

    async create(data: any) {
        if (!data.book || !data.user || !data.rating) {
            throw new Error('Invalid review data')
        }
        return reviewService.create(data)
    }
}
