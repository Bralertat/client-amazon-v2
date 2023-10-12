import axios from 'axios'
import { errorCatch, getContentType } from './api.helper'
import { getAccessToken, removeFromStorage } from '@/services/auth/auth.helper'
import { AuthService } from '@/services/auth/auth.service'

export const guestAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType()
})
export const authAxios = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: getContentType()
})

authAxios.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config && config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

authAxios.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config
    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true
      try {
        await AuthService.getNewTokens()
        return authAxios.request(originalRequest)
      } catch (err) {
        if (errorCatch(err) === 'jwt expired') {
          removeFromStorage()
        }
      }
    }
    throw error
  }
)
