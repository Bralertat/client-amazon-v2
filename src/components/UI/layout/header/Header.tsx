import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import HeaderCart from './cart/HeaderCart'

const Header: FC = () => {
  return <div className='bg-secondary w-full py-6 px-6 grid grid-cols-[1fr_3fr_1.2fr]'>
    <Link href={'/'}>
      <h1>Logo</h1>
    </Link>
    {/* <Search/> */} 
    <div className='flex items-center justify-end gap-10'>
      <Link href='/favorites' className='text-white'>
        <AiOutlineHeart size={28}/>
      </Link>
      <HeaderCart/>
      {/* <HeaderProfile/> */}
    </div>

  </div>
}

export default Header