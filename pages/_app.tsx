import type { AppProps } from 'next/app'

import '@/assets/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
