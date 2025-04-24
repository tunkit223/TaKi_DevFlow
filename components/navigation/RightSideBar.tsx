import ROUTES from '@/constants/route';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import TagCard from '../cards/TagCard';

const hotQuestion = [
  { _id:"1", title: "How to create a custom hook in React?"},
  { _id:"2", title: "How to create a custom hook in React?"},
  { _id:"3", title: "How to create a custom hook in React?"},
  { _id:"4", title: "How to create a custom hook in React?"},
  { _id:"5", title: "How to create a custom hook in React?"},
];

const popularTags =[
  { _id:"1", name:"react", questions:100},
  { _id:"2", name:"javascript", questions:200},
  { _id:"3", name:"typescript", questions:75},
  { _id:"4", name:"nextjs", questions:300},
  { _id:"5", name:"react-query", questions:96},
]

const RightSideBar = () => {
  return (
    <section className='pt-24 custom-scrollbar background-light900_dark200 light-border 
                      sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-1 
                      overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className='h3-bold text-dark200_light900'>Top Question</h3>
        
        <div className='mt-7 flex w-full flex-col gap-[30px]'>
          {hotQuestion.map(({_id, title})=>(
            <Link 
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className='flex cursor-pointer items-center justify-between gap-2'
            >
              <p className='body-medium text-dark500_light700'>{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt='Chervon'
                width={20}
                height={20}
                className='invert-colors'
              />
            </Link>
          ))}
        </div>
      </div>

      <div className='mt-8'>
          <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>

          <div className='mt-7 flex flex-col gap-4'>
            {popularTags.map(({_id, name, questions}) =>(
              <TagCard
                key={_id}
                _id={_id}
                name ={name}
                questions={questions}
                showCount
                compact
              />
            ))}
          </div>
      </div>
    </section>
  )
}

export default RightSideBar