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

  const queryClient = useQueryClient()
  // ???на сервер шлет а у себя не меняет имхо нужно слать на сервер и при успшном респонсе ререндерить
  const { mutate } = useMutation(['toggle favorite'], () =>
    UserService.toggleFavorite(productId), {
      onSuccess() {
        queryClient.invalidateQueries(['get profile'])
      }
    }
  )

  if(!profile) return null

  const isExist = profile.favorites.some(favorite => favorite.id === productId)

  return (
    <div>
      <button onClick={() => mutate()} className='text-primary' >
        {isExist ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  )
}

export default FavoriteButton
