import { Link } from 'react-router-dom'
import default_user from '../../assets/default_user.png'
import icon_camera from '../../assets/icon_camera.svg'
import icon_back from '../../assets/icon_back.svg'
import { UserSchema, userSchema } from 'src/utils/rule'
import { useMutation, useQuery } from '@tanstack/react-query'
import userApi from 'src/apis/user.api'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input/Input'
import Button from 'src/components/Button/Button'
import { useEffect } from 'react'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { toast } from 'react-toastify'

type FormData = Pick<UserSchema, 'name' | 'phone' | 'avatar' | 'bio'>

const profileSchema = userSchema.pick(['name', 'phone', 'avatar', 'bio'])

export default function EditPage() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    setError
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      phone: '',
      avatar: '',
      bio: ''
    },
    resolver: yupResolver(profileSchema)
  })
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => userApi.updateProfile(body)
  })

  useEffect(() => {
    if (profile) {
      setValue('name', profile.name)
      setValue('phone', profile.phone)
      setValue('avatar', profile.avatar)
      setValue('bio', profile.bio)
    }
  }, [profile, setValue])

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    const res = await updateProfileMutation.mutateAsync({ ...data })
    refetch()
    toast.success(res.data.message)
  })
  return (
    <main className='sm:p-4 md:mt-8'>
      <div className='container mx-auto mb-6 flex max-w-[53rem] sm:p-0'>
        <div className='inline-flex items-start justify-start gap-2 py-1 text-[#2D9CDB] hover:underline hover:cursor-pointer focus:underline'>
          <img src={icon_back} className='w-5 h-5' alt='image' />
          <Link to='/'>Back</Link>
        </div>
      </div>
      <div className='rounded-lg bg-card text-card-foreground sm:border sm:shadow-sm mx-auto mb-10 w-full max-w-[53rem]'>
        <div className='flex flex-col space-y-1.5 sm:p-6 container mx-auto mb-6 sm:mb-0 sm:space-y-0'>
          <h3 className='text-2xl leading-none tracking-tight mb-2 font-normal text-primary'>Change Info</h3>
          <p className='text-sm font-medium text-secondary'>Changes will be reflected to every services</p>
        </div>
        <div className='pt-0 sm:px-6 container sm:py-6'>
          <form className='space-y-8' noValidate onSubmit={onSubmit}>
            <div className='text-icon space-y-2 flex items-center gap-5'>
              <div className='relative h-[4.5rem] w-[4.5rem]'>
                <span className='relative flex shrink-0 overflow-hidden h-full w-full'>
                  <img
                    src={default_user}
                    className='aspect-square h-full w-full object-cover object-center'
                    alt='image'
                  />
                </span>
                <div className='rounded-[8px] absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 transition-colors hover:bg-black/40'>
                  <img src={icon_camera} alt='' />
                </div>
              </div>
              <input type='file' className='hidden' accept='.jpg,.jpeg,.png' />
              <button type='button' className='sr-only text-sm uppercase text-secondary sm:not-sr-only'>
                Change photo
              </button>
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Name
              </label>
              <Input
                classNameInput='flex w-[52%] rounded-md border border-border bg-background text-sm text-primary h-14 p-4 sm:max-w-[26rem]'
                placeholder='Enter your name...'
                name='name'
                register={register}
                errorMessages={errors.name?.message}
              />
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Bio
              </label>
              <textarea
                className='flex min-h-[80px] w-full rounded-md border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none border-border sm:max-w-[26rem]'
                placeholder='Enter your bio...'
                {...register('bio')}
              />
              <p className='text-sm mt-2 font-medium text-destructive text-red-600'>{errors.bio?.message}</p>
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Phone
              </label>
              <Controller
                control={control}
                name='phone'
                render={({ field }) => (
                  <InputNumber
                    classNameInput='flex w-[52%] rounded-md border border-border bg-background text-sm text-primary h-14 p-4 sm:max-w-[26rem]'
                    placeholder='Enter your phone...'
                    errorMessages={errors.phone?.message}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Email
              </label>
              <Input
                disabled
                value={profile?.email as string}
                classNameInput='flex w-[52%] rounded-md border border-border bg-gray-300 disabled:cursor-not-allowed text-sm text-primary h-14 p-4 sm:max-w-[26rem'
              />
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Password
              </label>
              <input
                placeholder='Enter your new password...'
                type='email'
                className='flex w-[52%] rounded-md border border-border bg-background text-sm text-primary h-14 p-4 sm:max-w-[26rem'
              />
            </div>

            <Button type='submit' className='text-white text-[16px] px-6 py-2 bg-blue-600 rounded-md hover:bg-blue-400'>
              Save
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
