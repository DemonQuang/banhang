import Payment from '@/models/Payment'

export const paymentService = {
    async create(data: any) {
        return Payment.create(data)
    }
}
