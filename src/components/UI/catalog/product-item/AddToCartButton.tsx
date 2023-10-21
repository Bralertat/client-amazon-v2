import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { IProduct } from '@/types/product.interface'
import { FC } from 'react'
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri'

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
  const { addToCart, removeFromCart } = useActions()
  const { items } = useCart()

  //ищем по product id
  const currentElement = items.find(
    cartItem => cartItem.product.id === product.id
  )

  return (
    <div>
      <button
        className='text-secondary'
        onClick={() =>
          currentElement
          //а удаляем по корзинному id
            ? removeFromCart({ id: currentElement.id })
            : addToCart({
                product,
                quantity: 1,
                // цена может отличаться от цены товара, например по промокоду
                price: product.price
              })
        }
      >
        {currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
      </button>
    </div>
  )
}

export default AddToCartButton
