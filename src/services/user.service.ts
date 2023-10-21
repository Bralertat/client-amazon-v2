import { authAxios } from '@/api/api.interceptor'
import { IFullUser, IUser } from '@/types/user.interface'

const USERS = 'users'

type TypeData = {
  email: string
  password?: string
  name?: string
  avatarPath?: string
  phone?: string
}

export const UserService = {
  async getProfile() {
    return authAxios<IFullUser>({
      url: `${USERS}/profile`,
      method: 'GET'
    })
  },

  async updateProfile(data: TypeData) {
    return authAxios<IUser>({
      url: `${USERS}/profile`,
      method: 'PUT',
      data
    })
  },

  async toggleFavorite(productId: string | number) {
    return authAxios<IUser>({
      url: `${USERS}/profile/favorites/${productId}`,
      method: 'PATCH'
    })
  }
}
