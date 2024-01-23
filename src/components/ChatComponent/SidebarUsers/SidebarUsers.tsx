import React from 'react'
import ConnectedUsers from '../ConnectedUsers/ConnectedUsers'

export default function SidebarUsers() {
  return (
    <>
      {' '}
      <header className='h-16 flex items-center shadow-lg w-full mb-2 px-4'>
        <div className='cursor-pointer text-mWhite'>
          <span className='font-bold mr-4'>{'<'}</span>
          <span className='font-bold'>All channels</span>
        </div>
      </header>
      {/* Connected Users */}
      <div className='px-4 h-full overflow-y-auto text-white'>
        <div className='mt-6'>
          <h3 className='uppercase font-bold text-xl mb-3'>Channel Ăn hại</h3>
          <p>Mô tả: dưới dáy xã hội</p>
        </div>
        <ConnectedUsers />
      </div>
    </>
  )
}
