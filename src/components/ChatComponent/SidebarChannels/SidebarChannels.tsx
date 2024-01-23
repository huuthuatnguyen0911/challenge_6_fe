import { Dialog } from '@headlessui/react'
import search from '../../../assets/search.svg'
import { useState } from 'react'
import Input from '../../Input/Input'
import Button from '../../Button/Button'

export default function SidebarChannels() {
  let [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <header className='h-16 flex flex-none items-center shadow-lg w-full mb-2 px-4'>
        <div className='flex justify-between items-center cursor-pointer w-full'>
          <span className='font-bold mr-4 text-white'>Channels</span>
          <span
            onClick={() => setIsOpen(true)}
            className='font-bold text-xl h-8 w-8 rounded text-white bg-mBg flex justify-center items-center hover:bg-mBlue hover:text-white transition-all duration-300'
          >
            {' '}
            +{' '}
          </span>
        </div>
      </header>

      {/* Search Input */}
      <div className='px-4 mb-6'>
        <div className='mb-4'>
          <div className='flex bg-[#3C393F] items-center border px-2 py-1 border-mGray-2 rounded-md  '>
            <img className='w-6 h-6' src={search} />

            <input
              style={{ minWidth: 0 }}
              className='bg-[#3C393F] ml-2 w-full h-full p-2 text-white rounded-md outline-none'
              type='text'
              name='search'
              placeholder='Search...'
            />
          </div>
        </div>
      </div>

      {/* List of channels */}
      <div className='h-full px-4 overflow-y-auto'>
        <div className='h-auto'>
          {/* <h3 className="font-bold text-xl uppercase my-8">Members</h3> */}
          <ul>
            <li className='group p-2 flex items-center mb-8 cursor-pointer rounded hover:bg-chatBg transition-colors duration-300'>
              <span className='flex items-center justify-center uppercase h-8 min-w-8 rounded bg-mBlue text-white font-bold mr-4 '>
                abc
              </span>
              <span className='uppercase font-bold text-white transition-colors duration-300'>ABC 123</span>
            </li>
          </ul>
        </div>
      </div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className='relative z-50'>
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

        {/* Full-screen container to center the panel */}
        <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
          {/* The actual dialog panel  */}
          <Dialog.Panel className='mx-auto max-w-screen-md rounded bg-[#120F13]'>
            <Dialog.Title>
              <div className='flex-auto'>
                <div className='rounded-lg sm:shadow-sm mx-auto mb-3 py-2 sm:pt-[34px] sm:pb-[22px]'>
                  <div className='pt-0 sm:px-[34px] container'>
                    <form className='space-y-2' noValidate>
                      <p className='uppercase text-[#F2F2F2] font-bold text-[18px] mb-6'>New channel</p>
                      <div className='relative'>
                        <input
                          className='w-[512px] py-3 px-4 rounded-lg text-white bg-mGray3 mb-6'
                          type='text'
                          placeholder='Channel name'
                          name='channel'
                        />
                      </div>
                      <div className='relative'>
                        <textarea
                          className='w-[512px] py-3 px-4 rounded-lg text-white bg-mGray3 mb-4'
                          placeholder='Channel Description'
                          name='channelDescription'
                          rows={3}
                        />
                      </div>
                      <Button
                        type='submit'
                        className='bg-blue-600 px-[30px] py-[7px] text-white rounded-md flex items-start justify-items-end ml-auto'
                      >
                        Save
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </Dialog.Title>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}
