import { Menu, Transition } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from 'src/contexts/app.context'
import default_user from '../../assets/default_user.png'
import icon_logout from '../../assets/icon_logout.svg'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileUserChat() {
  const { profile, setIsAuthenticated, setProfile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success('Logout successfully', { autoClose: 2000 })
    },
    onError: (err) => {
      toast.error(err.message, { autoClose: 2000 })
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <>
      <div
        style={{ borderTop: '1px solid #ffffff30' }}
        className='group flex items-center flex-none h-20 bg-[#0b090c] px-4 hover:bg-gray-800 transition-colors duration-300'
      >
        <img className='w-10 h-10 rounded mr-6 ' src={profile?.avatar || default_user} />
        <div className='flex justify-between items-center w-full'>
          <span className='group-hover:text-[#828282] text-[#828282] cursor-default font-bold'>
            {profile?.name || 'username'}
          </span>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button>
                <ChevronUpIcon className='-mr-1 ml-2 h-5 w-5 text-white cursor-pointer' aria-hidden='true' />
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
    </>
  )
}
