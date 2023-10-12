import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.services'
import { IProduct } from '@/types/product.interface'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile()

  const { invalidateQueries } = useQueryClient()
  const { mutate } = useMutation(['toggle favorite'], () =>
    UserService.toggleFavorite(productId), {
      onSuccess() {
        invalidateQueries(['get profile'])
      }
    }
  )

  if(!profile) return null

  const isExist = profile.favorites.some(favorite => favorite.id === productId)

  return (
    <div>
      <button onClick={() => mutate()}>
        {isExist ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  )
}

export default FavoriteButton
