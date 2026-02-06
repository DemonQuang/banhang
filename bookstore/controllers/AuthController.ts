import bcrypt from 'bcryptjs'
import { userService } from '@/services/UserService'
import { signToken } from '@/config/jwt'

export const authController = {
    async login(req: any) {
        const { email, password } = await req.json()
        const user = await userService.getByEmail(email)

        if (!user) {
            return Response.json({ message: 'Invalid email' }, { status: 400 })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return Response.json({ message: 'Invalid password' }, { status: 400 })
        }

        const token = signToken({ id: user._id, email: user.email })

        return Response.json({ token, user })
    }
}
