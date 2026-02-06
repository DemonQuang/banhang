import Category from '@/models/Category'

export const categoryService = {
    getAll() {
        return Category.find()
    },

    create(data: any) {
        return Category.create(data)
    }
}
