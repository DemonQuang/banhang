import Wishlist from '@/models/Wishlist'

export const wishlistService = {
    async getByUser(userId: string) {
        let wishlist = await Wishlist
            .findOne({ user: userId })
            .populate('books')

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                books: []
            })
        }

        return wishlist
    },

    async create(userId: string) {
        const existed = await Wishlist.findOne({ user: userId })
        if (existed) return existed

        return Wishlist.create({
            user: userId,
            books: []
        })
    },

    async update(userId: string, books: string[]) {
        return Wishlist
            .findOneAndUpdate(
                { user: userId },
                { books },
                { new: true }
            )
            .populate('books')
    }
}
