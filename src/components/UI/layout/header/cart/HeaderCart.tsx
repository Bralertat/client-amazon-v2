import Button from '@/components/UI/button/Button'
import SquareButton from '@/components/UI/button/SquareButton'
import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useDelayUnmount } from '@/hooks/useDelayUnmount'
import { useOutside } from '@/hooks/useOutside'
import { OrderService } from '@/services/order.service'
import { convertPrice } from '@/utils/convertPrice'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import { FC } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'
import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'
import { useRouter } from 'next/navigation'

const Cart: FC = () => {
  const { isShow, setIsShow, ref } = useOutside(false)
  const { items, total } = useCart()
  const { reset } = useActions()
  const { push } = useRouter()

  const { mutate } = useMutation({
    // ['create order and payment'],
    mutationFn: () => {
      return OrderService.place({
        items: items.map(item => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id
        }))
      })
    },
    onSuccess({ data }) {
      //нправильно тут чистить корзину
      // push(data.confirmation.confirmation_url).then(() => reset())// в новом next не работает
      push(data.confirmation.confirmation_url)// в новом next не работает, я так понял теперь это синхронная операция и только на клиенте
      reset()
    }
  })
  //размонтировать нужно раньше чем закончится анимация
  //так как в конце анимации она возвращается на исходную
  const showDiv = useDelayUnmount(isShow, 250)

  return (
    <div className='relative' ref={ref}>
      <SquareButton
        Icon={RiShoppingCartLine}
        onClick={() => setIsShow(!isShow)}
        number={items.length}
      />
      {showDiv && (
        <div
          className={cn(
            `absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary 
          rounded-xl px-5 py-3 text-sm z-20 text-white`,
            isShow ? 'open-menu' : 'close-menu'
          )}
        >
          <div className='font-normal mb-5 text-lg'>My cart</div>
          <div className={styles.cart}>
            {items.length ? (
              items.map(item => <CartItem item={item} key={item.id} />)
            ) : (
              <div className='font-light'>Cart is empty!</div>
            )}
          </div>
          <div className={styles.footer}>
            <div>Total:</div>
            <div>{convertPrice(total)}</div>
          </div>
          <div className='text-center'>
            <Button
              onClick={() => mutate()}
              variant='white'
              size='sm'
              className='mt-5 mb-2 btn-link???'
            >
              Place order
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
