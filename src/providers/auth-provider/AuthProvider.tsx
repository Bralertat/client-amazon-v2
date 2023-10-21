import { FC, PropsWithChildren, useEffect } from 'react'
import { TypeComponentAuthFields } from './auth-page.types'
import dynamic from 'next/dynamic'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { getAccessToken } from '@/services/auth/auth.helper'
import Cookies from 'js-cookie'

// этот компонент подгрузится lazy и только на клиенте
const DynamicCheckRole = dynamic(() => import('./CheckRole'), { ssr: false })

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  Component: { isOnlyUser },
  children
}) => {
  const { user } = useAuth()
  const { checkAuth, logout } = useActions()
  const { pathname } = useRouter()

  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken) checkAuth()
  }, [])
  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken && user) logout()
  }, [pathname])

  //идея в том чтоб грузить страницы нуждающиеся в авторизации только на клиенте
  return isOnlyUser ? (
    //динамично то есть работает только на клиенте
    <DynamicCheckRole Component={{ isOnlyUser }}> {children}</DynamicCheckRole>
  ) : (
    // <>{children}</>
    //это будет работать и на сервере
    children
  )
}

export default AuthProvider
