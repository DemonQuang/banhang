import { orderService } from '@/services/OrderService'

export const orderController = {
    async getByUser(userId: string) {
        if (!userId) throw new Error('Missing userId')
        return orderService.getByUser(userId)
    },

    async create(data: any) {
        if (!data.user || !data.items?.length) {
            throw new Error('Invalid order data')
        }
        return orderService.create(data)
    }
}
