import React from 'react'

interface Props {
  tittle: string
  content: string
  className?: string
}

export default function InputInfor({ tittle, content, className }: Props) {
  return (
    <>
      {' '}
      <div className='shrink-0 bg-border h-[1px] w-full'></div>
      <li className='container flex flex-wrap items-center justify-between gap-2 py-1'>
        <span className='text-sm uppercase text-label sm:w-20'>{tittle}</span>
        <p
          className={`max-w-60 truncate font-medium  sm:max-w-[32.5rem] sm:text-lg md:w-[30rem] ${className ? className : ''}`}
        >
          {content}
        </p>
      </li>
    </>
  )
}
