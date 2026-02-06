import Cart from '@/models/Cart'

export const cartService = {
    async getByUser(userId: string) {
        let cart = await Cart
            .findOne({ user: userId })
            .populate('items.book')

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                items: []
            })
        }

        return cart
    },

    async create(userId: string) {
        const existed = await Cart.findOne({ user: userId })
        if (existed) return existed

        return Cart.create({
            user: userId,
            items: []
        })
    },

    async update(userId: string, items: any[]) {
        return Cart.findOneAndUpdate(
            { user: userId },
            { items },
            { new: true }
        ).populate('items.book')
    }
}
