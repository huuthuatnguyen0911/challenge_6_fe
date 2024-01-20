import default_user from '../../assets/default_user.png'
import InputInfor from 'src/components/InputInfoProfile/InputInfor'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'

export default function MainPage() {
  const { data: profileData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data

  return (
    <main>
      <div className='container mb-10 text-center'>
        <h1 className='mb-2 text-2xl sm:text-4xl'>Personal info</h1>
        <p className='text-sm font-light sm:text-lg'>Basic info, like your name and photo</p>
      </div>

      <div className='rounded-lg bg-card text-card-foreground sm:border sm:shadow-sm mx-auto mb-2 w-full max-w-[53rem]'>
        <div className='flex space-y-1.5 sm:p-6 container mb-12 flex-row flex-wrap items-center justify-between gap-4 sm:mb-0'>
          <div className=''>
            <h3 className='font-semibold tracking-tight mb-1 text-2xl'>Profile</h3>
            <p className='text-muted-foreground max-w-48 text-sm sm:max-w-full'>
              Some info may be visible to other people
            </p>
          </div>
          <button className='text-[#828282] text-[16px] px-8 py-2 rounded-lg border-2 border-gray-100 hover:bg-slate-100 bg-white'>
            <Link to='/edit'>Edit</Link>
          </button>
        </div>

        <div className='shrink-0 bg-border h-[1px] w-full hidden sm:block'></div>
        <div className='pt-0 sm:px-6 sm:py-6'>
          <ul className='flex w-full flex-col gap-5'>
            <li className='container flex flex-wrap items-center justify-between gap-2 py-1'>
              <span className='text-sm uppercase text-label sm:w-20'>photo</span>
              <div className='md:w-[30rem]'>
                <span className='relative flex shrink-0 overflow-hidden h-[4.5rem] w-[4.5rem] rounded-lg'>
                  <img
                    src={profile?.avatar ? profile.avatar : default_user}
                    className='aspect-square h-full w-full'
                    alt=''
                  />
                </span>
              </div>
            </li>
            <InputInfor tittle='name' content={profile?.name ? profile.name : 'No value'} />

            <InputInfor tittle='bio' content={profile?.bio ? profile.bio : 'No value'} />

            <InputInfor tittle='Phone' content={profile?.phone ? profile.phone : 'No Value'} />

            <InputInfor tittle='email' content={profile?.email as string} />

            <InputInfor tittle='Password' content='********' />
          </ul>
        </div>
      </div>
    </main>
  )
}
