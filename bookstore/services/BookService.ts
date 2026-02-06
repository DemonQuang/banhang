import Book from '@/models/Book'

export const bookService = {
    getAll() {
        return Book.find()
    },

    getById(id: string) {
        return Book.findById(id)
    },

    create(data: any) {
        return Book.create(data)
    },

    update(id: string, data: any) {
        return Book.findByIdAndUpdate(id, data, { new: true })
    },

    remove(id: string) {
        return Book.findByIdAndDelete(id)
    }
}
