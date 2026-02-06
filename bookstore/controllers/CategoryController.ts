import { categoryService } from '@/services/CategoryService'

export const categoryController = {
    async getAll() {
        return categoryService.getAll()
    },

    async create(data: any) {
        if (!data.name) throw new Error('Missing category name')
        return categoryService.create(data)
    }
}
