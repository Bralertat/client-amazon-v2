import { authAxios } from '@/api/api.interceptor'
import { IOrder } from '@/types/order.interface'

const ORDERS = 'orders'

export const OrderService = {
  async getAll() {
    return authAxios<IOrder[]>({
      url: ORDERS,
      method: 'GET'
    })
  }
}