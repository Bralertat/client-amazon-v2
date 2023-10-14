import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react'
import cn from 'clsx'
import { IconType } from 'react-icons'

interface ISquareButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType
  onClick?: () => void
  number?: number
}

const SquareButton: FC<ISquareButton> = ({ Icon, onClick, number }) => {
  return (
    <button
      onClick={onClick}
      className='h-10 w-10 bg-primary flex items-center justify-center
      hover:bg-primary/90 transition-colors duration-200 rounded relative'
    >
      {!!number && (
        <span
          className='flex h-4 w-4 items-center justify-center rounded-full bg-white
        p-0.5 text[0.75rem] text-secondary absolute -top-1 -right-1'
        >
          {number}
        </span>
      )}
      <Icon className='text-secondary' size={21}></Icon>
    </button>
  )
}

export default SquareButton
