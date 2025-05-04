import ROUTES from '@/constants/route'
import Link from 'next/link'
import React from 'react'
import { Badge } from '../ui/badge'
import { getDeviconClassName } from '@/lib/utils'
import Image from 'next/image'

interface Props{
  _id:string,
  name:string,
  questions?:number,
  showCount?:boolean,
  compact?:boolean,
  remove?:boolean,
  isButton?:boolean,
  handleRemove?: () => void
}

const TagCard = ({
   _id, 
   name, 
   questions, 
   showCount, 
   compact,
   remove,
   isButton,
   handleRemove 
  }:Props) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
  }
  const iconClass = getDeviconClassName(name)
  const content =(
  <>
    <Badge className='background-light800_dark300 
      text-light400_light500 gap-2 flex flex-row rounded-md border-none px-4 py-2 uppercase'>
      <div className='flex-center space-x-2'>
      <i className={`${iconClass} text-sm`}></i>
      <span>{name}</span>
      </div>

      {remove &&(
        <Image
          src='/icons/close.svg'
          width={12}
          height={12}
          alt="close icon"
          className='cursor-pointer object-contain invert-0 dark:invert'
          onClick={handleRemove}
        />
      )}
    </Badge>

    {showCount && <p className='small-medium text-dark500_light700'>{questions}</p>}
  </>
  );

  if(compact){
    return isButton ? (
      <button 
        className='flex justify-between gap-2'
        onClick={handleClick}
      >
        {content}
      </button>
    ):( 
    <Link 
      href={ROUTES.TAGS(_id)}
      className='flex justify-between gap-2'
    >
     {content}
    </Link>
    )
  }
  
}

export default TagCard