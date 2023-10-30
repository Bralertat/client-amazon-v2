import { errorCatch } from '@/api/api.helper'
import { UserService } from '@/services/user.service'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'

export const useProfile = () => {
  const { user } = useAuth()

  const { data } = useQuery({
    queryKey: ['get profile'],
    queryFn: () => {
      try {
        const profile = UserService.getProfile()
        return profile
      } catch (error) {
        throw new Error(errorCatch(error))
      }
    },
    select: data => data.data,
    enabled: !!user
  })
  return { profile: data }
}
//5.27 добавил проверку  enabled: !!user
