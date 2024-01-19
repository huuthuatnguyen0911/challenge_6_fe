import { Link } from 'react-router-dom'
import SocialFooter from 'src/components/SocialFooter/SocialFooter'
import logo from '../../assets/logo.svg'
import email_icon from '../../assets/icon_email.svg'
import pass_icon from '../../assets/icon_pass.svg'
import FooterModal from 'src/components/FooterModel/FooterModal'
import { useForm } from 'react-hook-form'
import { Schema, schema } from 'src/utils/rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { login } from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Schema

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: FormData) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        // setIsAuthenticated(true)
        // setProfile(data.data.data.user)
        // navigate('/')
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formErrors = error.response?.data.data
          // console.log(formErrors)
          if (formErrors) {
            Object.keys(formErrors).forEach((key) => {
              setError(key as keyof FormData, {
                message: formErrors[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='flex min-h-screen flex-col text-primary sm:py-20'>
      <div className='flex-1'>
        <div className='rounded-lg bg-card text-card-foreground sm:border sm:shadow-sm mx-auto mb-3 w-full max-w-[30rem] py-2 sm:pt-[48px] sm:pb-[58px]'>
          <div className='flex flex-col space-y-1.5 sm:px-[58px] sm:pb-7 container mb-5 gap-5 sm:mb-0'>
            <img src={logo} alt='' className='w-[130px] h-[18px] object-cover' />
            <h3 className='font-semibold tracking-tight text-lg'>Login</h3>
          </div>
          <div className='pt-0 sm:px-[58px] container'>
            <form className='space-y-2' onSubmit={onSubmit} noValidate>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                  <img src={email_icon} alt='' className='w-6 h-6' />
                </div>
                <input
                  type='email'
                  placeholder='Email'
                  {...register('email')}
                  className='flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
                />
              </div>
              <p className='text-sm font-medium text-destructive'>{errors.email?.message}</p>
              <div className='relative'>
                <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5'>
                  <img src={pass_icon} alt='' className='w-6 h-6' />
                </div>
                <input
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password')}
                  className='flex h-12 w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-primary ring-offset-background transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-button focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-12'
                />
              </div>
              <p className='text-sm font-medium text-destructive'>{errors.password?.message}</p>
              <button type='submit' className='w-full h-12 bg-blue-600 text-white rounded-xl'>
                Login
              </button>
            </form>
            <SocialFooter>
              Don’t have an account yet?{' '}
              <Link to='/register' className='text-blue-500 hover:cursor-pointer'>
                Register
              </Link>
            </SocialFooter>
          </div>
        </div>
        <FooterModal />
      </div>
    </div>
  )
}
