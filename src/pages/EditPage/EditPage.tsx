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
import { useContext, useEffect, useMemo, useState } from 'react'
import InputNumber from 'src/components/InputNumber/InputNumber'
import { toast } from 'react-toastify'
import { AppContext } from 'src/contexts/app.context'
import { setProfileToLS } from 'src/utils/auth'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import InputFile from 'src/components/InputFile/InputFile'
import Helmet from 'src/components/Helmet/Helmet'

type FormData = Pick<UserSchema, 'name' | 'phone' | 'avatar' | 'bio' | 'newPassword'>

const profileSchema = userSchema.pick(['name', 'phone', 'avatar', 'bio', 'newPassword'])

type ErrorRes = {
  name: {
    msg: string
  }
  phone: {
    msg: string
  }
  avatar: {
    msg: string
  }
  bio: {
    msg: string
  }
  password: {
    msg: string
  }
}

export default function EditPage() {
  const { setProfile } = useContext(AppContext)
  const [file, setFile] = useState<File>()
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : ''
  }, [file])
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
      bio: '',
      newPassword: ''
    },
    resolver: yupResolver(profileSchema)
  })

  const avatar = watch('avatar')
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userApi.getProfile()
  })
  const profile = profileData?.data.data

  const updateProfileMutation = useMutation({
    mutationFn: (body: any) => userApi.updateProfile(body)
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (body: any) => userApi.updatePassword(body)
  })

  const uploadAvtarMutation = useMutation({
    mutationFn: (body: any) => userApi.uploadAvatar(body)
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
    try {
      let avatarName = avatar
      const newPassword = data.newPassword
      if (file) {
        const formData = new FormData()
        formData.append('image', file)
        const uploadRes = await uploadAvtarMutation.mutateAsync(formData)
        avatarName = uploadRes.data.data
        setValue('avatar', avatarName)
      }
      if (newPassword !== '') {
        await updatePasswordMutation.mutateAsync({ password: data.newPassword })
      }
      const res = await updateProfileMutation.mutateAsync({ ...data, avatar: avatarName })
      setProfile(res.data.data)
      setProfileToLS(res.data.data)
      refetch()
      toast.success(res.data.message)
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<ErrorRes>>(error)) {
        const formErrors = error.response?.data
        if (formErrors?.data?.phone) {
          setError('phone', { message: formErrors.data.phone.msg, type: 'Server' })
        }
        if (formErrors?.data?.name) {
          setError('name', { message: formErrors.data.name.msg as string, type: 'Server' })
        }
        if (formErrors?.data?.avatar) {
          setError('avatar', { message: formErrors.data.avatar.msg as string, type: 'Server' })
        }
        if (formErrors?.data?.bio) {
          setError('bio', { message: formErrors.data.bio.msg as string, type: 'Server' })
        }
        if (formErrors?.data?.password) {
          setError('newPassword', { message: formErrors.data.password.msg as string, type: 'Server' })
        }
      }
    }
  })
  const handleChangFile = (file: File) => {
    setFile(file)
  }

  return (
    <main className='sm:p-4 md:mt-8'>
      <Helmet children='Chỉnh sửa thông tin' />
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
                    src={previewImage || avatar || default_user}
                    className='aspect-square h-full w-full object-cover object-center rounded-[8px]'
                    alt='image'
                  />
                </span>
                {!(previewImage || avatar) && (
                  <div className='rounded-[8px] absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 transition-colors hover:bg-black/40'>
                    <img src={icon_camera} alt='' />
                  </div>
                )}
              </div>
              <InputFile onChange={handleChangFile} />
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Email
              </label>
              <Input
                disabled
                type='email'
                value={profile?.email as string}
                classNameInput='flex w-[52%] rounded-md border border-border bg-gray-300 disabled:cursor-not-allowed text-sm text-primary h-14 p-4 sm:max-w-[26rem'
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
                Name
              </label>
              <Input
                classNameInput='flex w-[52%] rounded-md border border-border bg-background text-sm text-primary h-14 p-4 sm:max-w-[26rem]'
                placeholder='Enter your name...'
                name='name'
                type='text'
                register={register}
                errorMessages={errors.name?.message}
              />
            </div>

            <div className='text-icon space-y-2'>
              <label className='text-label text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
                Password
              </label>
              <Input
                classNameInput='flex w-[52%] rounded-md border border-border bg-background text-sm text-primary h-14 p-4 sm:max-w-[26rem]'
                placeholder='Enter your new password...'
                name='newPassword'
                type='password'
                register={register}
                errorMessages={errors.newPassword?.message}
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
