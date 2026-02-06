import { cartService } from '@/services/CartService'

export const cartController = {
    async getByUser(userId: string) {
        if (!userId) throw new Error('Missing userId')
        return cartService.getByUser(userId)
    },

    async update(userId: string, items: any[]) {
        return cartService.update(userId, items)
    }
}
