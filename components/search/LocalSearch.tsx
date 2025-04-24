"use client"
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import Image from 'next/image'
import { usePathname, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/url'
import { useRouter } from 'next/navigation'

interface Props {
  route: string,
  imgSrc: string,
  placeholder: string,
  otherClasses?: string
}

const LocalSearch = ({
  route, 
  imgSrc, 
  placeholder,
  otherClasses
}:Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';

  const [searchQuery, setsearchQuery] = useState(query)


useEffect(() => {

  const delayDebounceFn = setTimeout(() => {
      if(searchQuery){
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: searchQuery,
      })
      router.push(newUrl,{scroll: false})
    } else{
      if(pathname === route){
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query'],
      })
      router.push(newUrl,{scroll: false})
      }
    }
  },500)

  return () => clearTimeout(delayDebounceFn)
}, [searchQuery, router, route, searchParams, pathname]);


  return (
    <div className={`background-light800_darkgradient flex min-h-[56px]
                    grow items-center gap-4 rounded-[10px] 
                    px-4 ${otherClasses}`}>
     
          <Image
            src={imgSrc}
            alt="Search"
            width={24}
            height={24}
            className='cursor-pointer'
          />
          <Input
            type='text'
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => {setsearchQuery(e.target.value)}}
            className='paragraph-regular no-focus placeholder 
                      text-dark_light700 border-none shadow-none outline-none'
          />
    </div>
  )
}

export default LocalSearch