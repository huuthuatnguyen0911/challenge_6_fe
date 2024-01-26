import { Menu, Transition } from '@headlessui/react'
import { Fragment, useContext } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import logo from '../../assets/logo.svg'
import default_user from '../../assets/default_user.png'
import icon_group from '../../assets/icon_group.svg'
import icon_logout from '../../assets/icon_logout.svg'
import { AppContext } from 'src/contexts/app.context'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      setIsAuthenticated(false)
      setProfile(null)
      toast.success('Logout successfully', { autoClose: 1000 })
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='container px-[76px] py-7 flex justify-between items-center'>
      <img src={logo} alt='' className='w-[130px] h-[18px] object-cover' />

      <ul className='flex items-center'>
        <li className='p-4'>
          <Menu as='div' className='relative inline-block text-left'>
            <div>
              <Menu.Button className='inline-flex justify-center items-center w-full rounded-md gap-[11px] px-4 py-2 text-sm  text-[#333] font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                <img src={profile?.avatar || default_user} alt='' className='w-6 h-6 rounded-full object-cover' />
                {profile?.name ? profile.name : profile?.email}
                <ChevronDownIcon className='-mr-1 ml-2 h-5 w-5' aria-hidden='true' />
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
              <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none'>
                <div className='py-1'>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? ' text-gray-900' : 'text-gray-700',
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
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={classNames(
                          active ? ' text-gray-900' : 'text-gray-700',
                          'flex rounded-xl  px-[11px] text-sm'
                        )}
                      >
                        <div
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            ' flex items-center gap-1 px-4 py-2 w-full rounded-xl'
                          )}
                        >
                          <img src={icon_group} alt='' className='w-6 h-6 rounded-full object-cover' />
                          <Link to='/chat'>Group chat</Link>
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
        </li>
      </ul>
    </div>
  )
}
