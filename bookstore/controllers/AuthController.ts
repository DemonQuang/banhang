import bcrypt from 'bcryptjs'
import { userService } from '@/services/UserService'
import { signToken } from '@/utils/jwt'

export const authController = {
    async login(email: string, password: string) {
        const user = await userService.getByEmail(email)

        if (!user) {
            throw new Error('Invalid email')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Invalid password')
        }

        const token = signToken({
            id: user._id,
            email: user.email,
            role: user.role
        })

        return {
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role
            }
        }
    }
}
