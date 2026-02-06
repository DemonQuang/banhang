import { userService } from '@/services/UserService'

export const userController = {
    async getAll() {
        return userService.getAll()
    },

    async register(data: any) {
        if (!data.email || !data.password) {
            throw new Error('Missing email or password')
        }
        return userService.create(data)
    }
}
