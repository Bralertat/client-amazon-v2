import { authAxios } from '@/api/api.interceptor'
import { IPaymentResponse } from '@/types/payment.interface'

const PAYMENT = 'payment'

export const PaymentService = {
  async createPayment(amount: number) {
    return authAxios.post<IPaymentResponse>(PAYMENT, { amount })
  }
}
