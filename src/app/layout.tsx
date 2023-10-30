import type { PropsWithChildren } from 'react'
import '@/assets/styles/globals.scss'
import Providers from '@/providers/Providers'

export default function RootLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          {children}
        </Providers>
        {/* модальное окно react portal */}
        <div id='modal'></div>
      </body>
    </html>
  )
}
