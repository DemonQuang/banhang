import { bookService } from '@/services/BookService'

export const bookController = {
    async getAll() {
        return bookService.getAll()
    },

    async getById(id: string) {
        if (!id) throw new Error('Missing book id')
        return bookService.getById(id)
    },

    async create(data: any) {
        if (!data.title || !data.price) {
            throw new Error('Missing required fields')
        }
        return bookService.create(data)
    },

    async update(id: string, data: any) {
        return bookService.update(id, data)
    },

    async remove(id: string) {
        return bookService.remove(id)
    }
}
