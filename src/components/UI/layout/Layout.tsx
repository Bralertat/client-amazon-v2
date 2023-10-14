import { FC, PropsWithChildren } from 'react'
import Sidebar from './sidebar/Sidebar'
import Header from './header/Header'

const Layout: FC<PropsWithChildren<unknown>> = ({children}) => {
  return <div>
    <Header/>
    <div className='grid grid-cols-[1fr_4fr]'>
      <Sidebar/>
      <main className='p-12'>{children}</main>
    </div>
  </div>
}

export default Layout