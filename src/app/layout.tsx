import type { PropsWithChildren } from 'react'
import '@/assets/styles/globals.scss'
import Providers from '@/providers/Providers'

//я так понял это layout используется самим next-om он сам оборачивает им каждую страницу или все приложение
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
