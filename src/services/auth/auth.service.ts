import { getContentType } from '@/api/api.helper'
import { IAuthResponse, IEmailPassword } from '@/store/user/user.interface'
import axios from 'axios'
import Cookies from 'js-cookie'
import { saveToStorage } from './auth.helper'
import { authAxios, guestAxios } from '@/api/api.interceptor'

export const AuthService = {
  async main(type: 'login' | 'register', data: IEmailPassword) {
    const response = await guestAxios<IAuthResponse>({
      url: `/auth/${type}`,
      method: 'POST',
      data
    })

    if (response.data.accessToken) saveToStorage(response.data)

    return response.data
  },

  //не авторизованный получает токены
  async getNewTokens() {
    const refreshToken = Cookies.get('refreshToken')
    const response = await guestAxios.post<string, { data: IAuthResponse }>(
      '/auth/login/access-token',
      { refreshToken }
    )
    if (response.data.accessToken) saveToStorage(response.data)
    return response
  }
}
