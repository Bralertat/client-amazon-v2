'use client'

import Heading from '@/components/UI/Heading'
import Layout from '@/app/layout'
import { OrderService } from '@/services/order.service'
import { useQuery } from '@tanstack/react-query'
import { convertPrice } from '@/utils/convertPrice'

interface IMyOrders {}

export default function MyOrders({}: IMyOrders) {
  const { data: orders } = useQuery({
    queryKey: ['my orders'],
    queryFn: () => OrderService.getAll(),
    select: ({ data }) => data
  })
  return (
    <Layout>
      <Heading>My Orders</Heading>
      <section>
        {orders?.length ? (
          orders.map(order => (
            <div key={order.id} className='bg-white flex gap-10 p-7 my-7'>
              <span>{order.id}</span>
              <span>{order.status}</span>
              <span>
                {new Date(order.createdAt).toLocaleDateString('ru-Ru')}
              </span>
              <span>{convertPrice(order.total)}</span>
            </div>
          ))
        ) : (
          <div>Order not found!</div>
        )}
      </section>
    </Layout>
  )
}
