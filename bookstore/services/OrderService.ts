import Order from '@/models/Order'

export const orderService = {
    async getByUser(userId: string) {
        return Order
            .find({ user: userId })
            .populate('items.book', 'title price cover')
            .sort({ createdAt: -1 })
    },

    async getById(orderId: string) {
        return Order
            .findById(orderId)
            .populate('items.book', 'title price cover')
            .populate('user', 'name email')
    },

    async create(data: any) {
        return Order.create(data)
    }
}
