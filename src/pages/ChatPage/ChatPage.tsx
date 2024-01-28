import { Fragment, useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import SidebarChannels from 'src/components/ChatComponent/SidebarChannels/SidebarChannels'
import default_user from '../../assets/default_user.png'
import icon_logout from '../../assets/icon_logout.svg'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import Helmet from 'src/components/Helmet/Helmet'
import SidebarUsers from 'src/components/ChatComponent/SidebarUsers/SidebarUsers'
import { useSockets } from 'src/contexts/socket.context'
import { EVENTS } from 'src/config/events'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ChatPage() {
  const { socket, messages, setMessages, currentRoom, currentroomId } = useSockets()
  const newMessageRef = useRef(null)

  const [value, setValue] = useState('')
  const { profile, setIsAuthenticated, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success('Logout successfully', { autoClose: 3000 })
    },
    onError: (err) => {
      console.log(err)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  const showChannelsList = true

  const { name: username, avatar } = profile || {}
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const message = (newMessageRef.current as any).value
    if (!String(message).trim()) {
      return
    }

    if (!currentroomId) return

    socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, { message, roomId: currentroomId, username, avatar })

    const currentDate = new Date()

    setMessages([
      ...messages,
      {
        currentroomId,
        message,
        username: 'You',
        avatar,
        time: `${currentDate.getHours()}h:${currentDate.getMinutes()}p`
      }
    ])

    setValue('')
  }

  const date = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
  console.log(currentRoom)
  return (
    <div className='h-screen w-full flex'>
      <Helmet children='Chat group' />
      <div className='sidebar fixed inset-0 lg:block bg-transparent lg:w-mSidebar lg:relative bg-[#120f13]'>
        <div
          // onClick={closeSidebar}
          className='w-8 h-8 flex justify-center items-center fixed lg:hidden font-bold text-xl bg-mBlue rounded text-white z-50'
          style={{ top: '0', left: '325px' }}
        >
          X
        </div>
        <div className='flex flex-col w-mSidebar h-full overflow-hidden bg-darkBg'>
          {showChannelsList && <SidebarChannels></SidebarChannels>}
          {!showChannelsList && <SidebarUsers></SidebarUsers>}

          {/* Footer hiển thị người dùng hiện tại */}
          <div
            style={{ borderTop: '1px solid #ffffff30' }}
            className='group flex items-center flex-none h-20 bg-[#0b090c] px-4 cursor-pointer hover:bg-gray-400 transition-colors duration-300'
          >
            <img className='w-10 h-10 rounded mr-6 ' src={profile?.avatar || default_user} />
            <div className='flex justify-between items-center w-full'>
              <span className='group-hover:text-[#828282] text-[#828282] font-bold'>{profile?.name || 'username'}</span>

              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <Menu.Button>
                    <ChevronUpIcon className='-mr-1 ml-2 h-5 w-5 text-white' aria-hidden='true' />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='-translate-y-full absolute bottom-[-70px] right-[-5px] w-56 rounded-md shadow-lg bg-[#252329] ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? ' text-gray-900' : 'text-white',
                              'flex rounded-xl py-[5px] px-[11px] text-sm'
                            )}
                          >
                            <div
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                ' flex items-center gap-1 px-4 py-2 w-full rounded-xl'
                              )}
                            >
                              <img src={default_user} alt='' className='w-6 h-6 rounded-full object-cover' />
                              <Link to='/'>My Profile</Link>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                    <div className='py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={classNames(
                              active ? 'bg-gray-100 text-gray-900' : 'text-red-500',
                              'gap-1 flex px-7 py-2 text-sm w-full text-left'
                            )}
                          >
                            <img src={icon_logout} alt='' className='fill-red-500 w-6 h-6 rounded-full object-cover' />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className='flex flex-col bg-chatBg w-full overflow-hidden'>
        {/* Tên channel */}

        <header className='h-16 flex flex-none items-center shadow-lg w-full mb-2'>
          <div className='container mx-auto flex items-center px-4 lg:px-10'>
            <div className='lg:hidden mr-4'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='24px' height='24px'>
                <path d='M0 0h24v24H0z' fill='none' />
                <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
              </svg>
            </div>
            <h2 className='font-bold text-white uppercase'>{currentRoom ? currentRoom : 'WELCOME CHAT'}</h2>
          </div>
        </header>
        {currentRoom && (
          <>
            {/* Hiển thị tin nhắn ở đây */}
            <div className='container mx-auto px-4 lg:px-10 h-auto flex-auto overflow-y-auto'>
              <div className='h-full'>
                {messages.map(({ message, username, avatar, time }, index) => (
                  <ul key={index} className='h-auto'>
                    <h3
                      style={{
                        lineHeight: '0.1em',
                        margin: '10px 0 20px',
                        borderColor: '#ffffff1f'
                      }}
                      className='w-full border-b text-center border-opacity-25'
                    >
                      <span
                        style={{ padding: '0 10px' }}
                        className='bg-chatBg
                '
                      >
                        {date}
                      </span>
                    </h3>
                    <div className={`flex mb-6 `}>
                      <img className='w-10 h-10 rounded' src={avatar || default_user} />
                      <div className='ml-6'>
                        <div className='text-mGray font-bold mb-2'>
                          {/* {message.isSender ? 'You' : 'Khách Thuật'}{' '} */}
                          {username}
                          <span className='font-normal text-xs ml-6'>{time}</span>
                        </div>
                        <div className='text-mWhite font-normal text-sm break-all'>
                          {/* {message.isSender ? message.content : message} */}
                          {message}
                        </div>
                      </div>
                    </div>
                  </ul>
                ))}

                {/* <div ref={messagesContainerRef}></div> */}
              </div>
            </div>

            {/* Input nhập tin nhắn chat */}
            <div className='container mx-auto px-4 lg:px-10 mb-6 mt-4'>
              <form onSubmit={handleSendMessage}>
                <div className='flex items-center bg-mGray3 rounded h-12 p-2'>
                  <input
                    style={{ minWidth: 0 }}
                    className='bg-transparent text-mBlue text-sm font-bold h-full w-full px-2 mr-4'
                    type='text'
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder='Type a message here...'
                    ref={newMessageRef}
                  />
                  <button type='submit' className='flex items-center justify-center bg-mBlue px-2 py-2 rounded'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' width='18px' height='18px'>
                      <path d='M0 0h24v24H0z' fill='none' />
                      <path d='M2.01 21L23 12 2.01 3 2 10l15 2-15 2z' />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
