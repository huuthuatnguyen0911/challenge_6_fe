import { Link, useNavigate } from 'react-router-dom'
import SocialFooter from 'src/components/SocialFooter/SocialFooter'
import logo from '../../assets/logo.svg'
import email_icon from '../../assets/icon_email.svg'
import pass_icon from '../../assets/icon_pass.svg'
import FooterModal from 'src/components/FooterModel/FooterModal'
import Input from 'src/components/Input/Input'
import { Schema, schema } from 'src/utils/rule'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import Button from 'src/components/Button/Button'

type FormData = Schema

type ErrorRes = {
  email: {
    msg: string
  }
  password: {
    msg: string
  }
}

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    registerAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<ErrorRes>>(error)) {
          const formErrors = error.response?.data
          console.log(formErrors)
          if (formErrors?.data?.email) {
            setError('email', { message: formErrors.data.email.msg, type: 'Server' })
          }
          if (formErrors?.data?.password) {
            setError('password', { message: formErrors.data.password.msg, type: 'Server' })
          }
        }
      }
    })
  })
  return (
    <div className='flex min-h-screen flex-col text-primary sm:pt-10'>
      <div className='flex-1'>
        <div className='rounded-lg bg-card text-card-foreground sm:border sm:shadow-sm mx-auto mb-3 w-full max-w-[30rem] py-2 sm:pt-[48px] sm:pb-[58px]'>
          <div className='flex flex-col space-y-1.5 sm:px-[58px] sm:pb-7 container mb-5 gap-3 sm:mb-0'>
            <img src={logo} alt='' className='w-[130px] h-[18px] object-cover' />
            <h3 className='font-semibold tracking-tight text-lg w-[318px]'>
              Join thousands of learners from around the world
            </h3>
            <p className='text-[16px] text-[#333]'>
              Master web development by making real-life projects. There are multiple paths for you to choose
            </p>
          </div>
          <div className='pt-0 sm:px-[58px] container'>
            <form className='space-y-2' onSubmit={onSubmit} noValidate>
              <div className='relative'>
                <img src={email_icon} alt='' className='w-6 h-6 absolute top-3 left-3' />
                <Input
                  type='email'
                  placeholder='Email'
                  register={register}
                  name='email'
                  errorMessages={errors.email?.message}
                />
              </div>
              <div className='relative'>
                <img src={pass_icon} alt='' className='w-6 h-6 absolute top-3 left-3' />
                <Input
                  type='password'
                  placeholder='Password'
                  autoComplete='on'
                  name='password'
                  register={register}
                  errorMessages={errors.password?.message}
                />
              </div>
              <Button
                type='submit'
                className='w-full h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center'
                isLoading={registerAccountMutation.isPending}
                disabled={registerAccountMutation.isPending}
              >
                Start coding now
              </Button>
            </form>
            <SocialFooter>
              Adready a member?{' '}
              <Link to='/login' className='text-blue-500 hover:cursor-pointer'>
                Login
              </Link>
            </SocialFooter>
          </div>
        </div>
        <FooterModal />
      </div>
    </div>
  )
}
