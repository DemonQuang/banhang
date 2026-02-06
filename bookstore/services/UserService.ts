import User from '@/models/User'
import bcrypt from 'bcryptjs'

export const userService = {
    async getAll() {
        return User.find().select('-password')
    },

    async getByEmail(email: string) {
        return User.findOne({ email })
    },

    async create(data: any) {
        const existedUser = await User.findOne({ email: data.email })
        if (existedUser) {
            throw new Error('Email already exists')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)

        return User.create({
            ...data,
            password: hashedPassword
        })
    }
}
