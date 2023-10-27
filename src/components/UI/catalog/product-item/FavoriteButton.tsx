import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.service'
import { IFullUser } from '@/types/user.interface'
import {
  UseQueryResult,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile()

  const queryClient = useQueryClient()
  // ???на сервер шлет а у себя не меняет имхо нужно слать на сервер и при успшном респонсе ререндерить
  const { mutate, isLoading, isIdle } = useMutation(
    ['toggle favorite'],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess() {
        //сюда optimistic ui
        queryClient.invalidateQueries(['get profile'])
      },
      onMutate() {
        queryClient.setQueryData(['get profile'], (oldData: any) => {
          const index: number = oldData.data.favorites.findIndex(
            (item: any) => item.id === productId
          )
          const newFavorites = index === -1 
            // у нас нет полноценного объекта фаворит чтоб положить в массив
          ? [...oldData.data.favorites, { id: productId }] 
          : oldData.data.favorites.filter((_item: any, ind: number) => ind !== index)
          return {
            ...oldData,
            data: {
              ...oldData.data,
              favorites: newFavorites
            }
          }
        })
      }
    }
  )

  if (!profile) return null

  let isExist = profile.favorites.some(favorite => favorite.id === productId)

  console.log('isloading: ', isLoading, '  isExist: ', isExist)
  return (
    <div>
      <button onClick={() => mutate()} className='text-primary'>
        {/* работает мигает 2 раза потому что рефетчится профайл обратно
        загорается не тем цветом */}
        {/* {isLoading && (isExist = !isExist)} */}
        {isExist ? <AiFillHeart /> : <AiOutlineHeart />}
      </button>
    </div>
  )
}

export default FavoriteButton
