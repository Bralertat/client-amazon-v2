import { useProfile } from '@/hooks/useProfile'
import { UserService } from '@/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile()

  const queryClient = useQueryClient()
  //?на сервер шлет а у себя не меняет имхо нужно слать на сервер и при успшном респонсе ререндерить
  //сервер не присылает то что нужно
  const { mutate, isPending } = useMutation({
    // ['toggle favorite'], // ключу тут вообще не место и вообще такого ключа нет
    //ключи создают useQuery, а не useMutation
    mutationFn: () => UserService.toggleFavorite(productId),
    mutationKey: ['get profile'],
    onSuccess() {
      // queryClient.invalidateQueries(['get profile'])
    },
    //вариант с обновлением кеша на клиенте неполноценными данными
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ['get profile'] })
      const previousProfile = queryClient.getQueryData(['get profile'])

      queryClient.setQueryData(['get profile'], (oldData: any) => {
        const index: number = oldData.data.favorites.findIndex(
          (item: any) => item.id === productId
        )
        const newFavorites =
          index === -1
            ? // у нас нет полноценного объекта фаворит чтоб положить в массив
              [...oldData.data.favorites, { id: productId }]
            : oldData.data.favorites.filter(
                (_item: any, ind: number) => ind !== index
              )
        return {
          ...oldData,
          data: {
            ...oldData.data,
            favorites: newFavorites
          }
        }
      })
      return { previousProfile }
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(['get profile'], context?.previousProfile)
    },
    onSettled: async () => {
      return await queryClient.invalidateQueries({queryKey: ['get profile']})
    }

    /*нужно именно подождать пока выполнится инвалидирующий запрос,
      только потом статус pending isLoadng уйдет
      тоже нормально не работает потому что если 2 под ряд нажать, то первое инвалидируется раньше и моргает сердечком а submittedAt в этой версии нет
      */
    /*onSettled: async () => {
        return await queryClient.invalidateQueries(['get profile'], {
          exact: true
        })
      }*/
  })

  if (!profile) return null

  let isExist = profile.favorites.some(favorite => favorite.id === productId)

  console.log('isPending: ', isPending, '  isExist: ', isExist)
  return (
    <div>
      <button
        disabled={isPending}
        onClick={() => mutate()}
        className='text-primary'
      >
        {/* работает мигает 2 раза потому что рефетчится профайл обратно
        загорается не тем цветом */}
        {/* {isLoading && (isExist = !isExist)} */}
        {isExist ? (
          <AiFillHeart className={isPending && 'opacity-50'} />
        ) : (
          <AiOutlineHeart className={isPending && 'opacity-50'} />
        )}
      </button>
    </div>
  )
}

export default FavoriteButton
