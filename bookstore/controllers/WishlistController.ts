import { wishlistService } from '@/services/WishlistService'

export const wishlistController = {
    async getByUser(userId: string) {
        if (!userId) throw new Error('Missing userId')
        return wishlistService.getByUser(userId)
    },

    async update(userId: string, books: string[]) {
        return wishlistService.update(userId, books)
    }
}
