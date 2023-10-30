'use client'

import AuthProvider from '@/providers/auth-provider/AuthProvider'
import { persistor, store } from '@/store/store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/seo.constants'
import { getSiteUrl } from '@/config/url.config'

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.svg'
  },
  title: {
    absolute: SITE_NAME,
    template: `%s | ${SITE_NAME}`
  },
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    emails: ['info@amazon.com']
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export default function Providers({
  children
}: PropsWithChildren<unknown>) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
