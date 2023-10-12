import { errorCatch } from '@/api/api.helper'
import { UserService } from '@/services/user.services'
import { IFullUser } from '@/types/user.interface'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
  const { data } = useQuery(['get profile'], () => UserService.getProfile(), {
    select: data => data.data,
    onError: error => console.log(errorCatch(error))
  })
  return { profile: data }
}
