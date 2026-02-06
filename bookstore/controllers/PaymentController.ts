import { paymentService } from '@/services/PaymentService'

export const paymentController = {
    async create(data: any) {
        if (!data.order || !data.amount) {
            throw new Error('Invalid payment data')
        }
        return paymentService.create(data)
    }
}
