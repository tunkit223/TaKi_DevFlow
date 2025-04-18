import SocialAuthForm from '@/components/forms/SocialAuthForm'
import Image from 'next/image'
import React, { ReactNode } from 'react'

const Authlayout = ({children}:{children: ReactNode}) => {
  return (
    <main className='flex min-h-screen items-center 
                    justify-center bg-auth-light dark:bg-auth-dark 
                    bg-cover vg-center bg-no-repeat px-4 py-4'>
        <section className='light-border background-light800_dark200
                            shadow-light100_dark100 min-w-full rounded-[10px]
                            border px-4 py-4 shadow-md sm:min-w-[520px] sm:px-8'>
           <div className='flex items-center justify-between gap-1.5'>
              <div className='space-y-1'>
                <h1 className='h2-bold text-dark100_light900'>
                  Join DevFlow
                </h1>
                <p className='paragraph-regular text-dark500_light400'>
                  To get question answered
                </p>
              </div>
              <Image
                src="images/site-logo.svg"
                alt="DevFlow Logo"
                width={50}
                height={50}
                className='object-contain'
              />
           </div>
           {children}
           <SocialAuthForm/>
        </section>
    </main>
  )
}

export default Authlayout